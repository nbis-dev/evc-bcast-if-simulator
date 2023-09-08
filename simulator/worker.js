const logger = require('../utils/logger');
const lutil = require('lodash');
const eventEmitter = require('../control/event-emitter');
const process = require('process');
const path = require('path');
const isPackaged = process.env['IS_PACKAGED'];

const { Worker, isMainThread } = require('worker_threads');
const TAG = '[SIM-WORKER]';
const { workerData, parentPort, threadId } = require('worker_threads');
const model = require('../model');
const dgram = require('dgram');
const ms = require('ms');

var mDefaultDevice = -1;
var mSystemName = '';

(async () => {
    try {
        logger.info(TAG, `New Worker started threadId = ${threadId} and workerData = ${JSON.stringify(workerData)}`);

        const systemInfo = await model.getRegisteredSystems(workerData.system, true);
        logger.info(systemInfo);
        if (!systemInfo.success || systemInfo.data.length === 0) {
            parentPort.postMessage({
                cmd: 'START',
                system: workerData.system,
                device: mDefaultDevice,
                name: mSystemName,
                code: 500,
                msg: '시스템 정보를 읽어오지 못했습니다.',
            });
            process.exit();
            return;
        }

        const system = systemInfo.data[0];
        mSystemName = system.name;

        await openServerSockets(system.eis);
        parentPort.postMessage({
            cmd: 'START',
            system: workerData.system,
            device: mDefaultDevice,
            name: mSystemName,
            code: 200,
        });

        sendElementDataPeriodic(system.station_no, system.rbc, system.elements);
    } catch (e) {
        logger.error(TAG, 'exception', e, e.stack);
        parentPort.postMessage({
            cmd: 'START',
            system: workerData.system,
            name: mSystemName,
            code: 500,
            msg: '시뮬레이터를 시작하지 못했습니다',
        });
        process.exit();
    }
})();

const openServerSockets = async (devices) => {
    try {
        if (devices.length === 0) {
            throw new Error('No network defines.');
            return;
        }

        for (const device of devices) {
            if (device.is_default === 0) {
                continue;
            }
            mDefaultDevice = device.id;
            var networks = JSON.parse(device.networks);
            for (let network of networks) {
                await simulateServer(network.ip, network.port);
            }
        }
    } catch (e) {
        throw new Error(e.stack);
    }
};

const simulateServer = async (address, port) => {
    try {
        const server = dgram.createSocket({
            type: 'udp4',
        });

        server.on('listening', () => {
            const address = server.address();
            logger.info(TAG, `Worker ${workerData.system} is listening on ${address.address}:${address.port}`);
        });

        server.on('message', (msg, rinfo) => {
            logger.info(
                TAG,
                `system process ${workerData.system} received msg : ${msg.toString('hex').match(/.{1,2}/g)}`
            );
        });

        server.bind({
            port: port,
            address: address,
            //address: isPackaged === true ? address : 'localhost',
            exclusive: true,
        });
    } catch (e) {
        throw new Error(e.stack);
    }
};

var mSequence = -1;
const sendElementDataPeriodic = async (stationNo, rbcs, elements) => {
    try {
        if (rbcs.length === 0) {
            throw new Error('No rbcs defines.');
            return;
        }
        console.log(JSON.stringify(rbcs), elements.length);

        var data = [];
        for (let element of elements) {
            data.push(element.default_value);
        }
        const dataBuffer = Buffer.from(data);
        // stx, len(2), seq, station no(2),
        var headerBuffer = Buffer.from([0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x61]);
        console.log(dataBuffer.byteLength);
        headerBuffer.writeUInt16BE(dataBuffer.byteLength, 1);
        headerBuffer.writeUInt16BE(stationNo, 4);
        const crcBuffer = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x03]);

        // 2023.08.17
        // RBC는 1계로만 보내기로 한다.
        const rbc = rbcs[0];
        const rbcNeworks = JSON.parse(rbc.networks);

        var client = dgram.createSocket('udp4');
        setInterval(async () => {
            // 1, 2계로 나ㅝ져 있더라도 mSequence는 동일하게 간다.
            mSequence++;
            if (mSequence > 0xff) {
                mSequence = 0x01;
            }
            for (var rbcServer of rbcNeworks) {
                headerBuffer.writeUInt8(mSequence, 3);
                var buffer = Buffer.concat([headerBuffer, dataBuffer], headerBuffer.byteLength + dataBuffer.byteLength);

                crcBuffer.writeInt32BE(calculateCrc32(buffer, buffer.byteLength));
                buffer = Buffer.concat([buffer, crcBuffer], buffer.byteLength + crcBuffer.byteLength);

                // 처음 하나만 보면 된다.
                // if (mSequence % 50 === 0) {
                logger.warn(
                    TAG,
                    rbcServer.port,
                    rbcServer.ip,
                    `Send data(${buffer.byteLength} bytes) =`,
                    buffer.toString('hex').match(/.{1,2}/g)
                );
                // }
                client.send(buffer, rbcServer.port, rbcServer.ip, (err) => {
                    // client.send(buffer, rbcServer.port, isPackaged === true ? rbcServer.address : '172.30.1.14', (err) => {
                    if (!lutil.isEmpty(err)) {
                        logger.error(TAG, 'Client error =', err);
                    }
                });
            }
        }, 490);
        if (rbcNeworks.length === 0) {
            throw new Error('No rbcs defines.');
            return;
        }
    } catch (e) {
        throw new Error(e.stack);
    }
};

var mIsGenerated = false;
const mPoly = 0xedb88320;
var mCrcTab = [];
const checksumCrc32GenTab = () => {
    if (mIsGenerated) {
        return;
    }

    mIsGenerated = !mIsGenerated;
    for (var i = 0; i < 256; i++) {
        var crc = i;
        for (var j = 8; j > 0; j--) {
            if (crc & 1) {
                crc = (crc >> 1) ^ mPoly;
            } else {
                crc >>= 1;
            }
        }
        mCrcTab[i] = crc;
    }
};

const calculateCrc32 = (buffer) => {
    checksumCrc32GenTab();

    crc = 0xffffffff;
    for (i = 0; i < buffer.byteLength; i++) {
        crc = ((crc >> 8) & 0xffffffff) ^ mCrcTab[(crc ^ buffer[i]) & 0xff];
    }

    return crc ^ 0xffffffff;
};

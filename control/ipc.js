/**
 * IPC Module
 * ---------------------
 *   channel 1 : EIS 정보 설정
 */

const { ipcMain } = require("electron");
const logger = require("../utils/logger");
const eventEmitter = require("./event-emitter");
const model = require("../model");
const TAG = "[IPC-MAIN]";

// ipcMain에서의 이벤트 수신
ipcMain.on("eis-config", async (evt, recvPayload) => {
    logger.info(TAG, "Renderer request =", recvPayload);
    var payload = {
        cmd: recvPayload.cmd,
        resCode: 200,
    };
    var res = {};

    switch (recvPayload.cmd) {
        case "GET": {
            res = await model.getRegisteredSystems();
            if (res.success) {
                payload.data = res.data;
            } else {
                payload.resCode = 500;
            }
            break;
        }
        case "DELETE": {
            res = await model.deleteRegisteredSystem(recvPayload.system);
            break;
        }
        case "POST": {
            break;
        }
        case "PUT": {
            if (recvPayload.type === "EIS-DEFAULT") {
                // 진행중인 시뮬레이션 중지 필요
                res = await model.changeDefaultDevice(
                    recvPayload.sys_id,
                    recvPayload.id
                );

                res.data = {
                    type: recvPayload.type,
                    sys_id: recvPayload.sys_id,
                    id: recvPayload.id,
                };
            }
            break;
        }
        default: {
            res = { success: false };
            break;
        }
    }

    if (res.success) {
        payload.data = res.data;
    } else {
        payload.resCode = 500;
    }
    logger.info(TAG, "MainProcess response =", payload);
    evt.reply("eis-config", payload);
});

ipcMain.on("eis-simulator", (evt, payload) => {
    logger.info(TAG, "eis-simulator received =", payload);
    eventEmitter.emit("eis-simulator", payload);
});

ipcMain.on("devtool-control", (evt, payload) => {
    logger.info(TAG, "devtool-control received =", payload);
    eventEmitter.emit("devtool-control", payload);
});

var mainWindow = null;
module.exports.sendToRenderer = function sendToRenderer(channel, payload) {
    if (!mainWindow) {
        return;
    }
    mainWindow.webContents.send(channel, payload);
};

module.exports.setMainWindow = function setMainWindow(win) {
    mainWindow = win;
};

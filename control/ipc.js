/**
 * IPC Module
 * ---------------------
 *   channel 1 : EIS 정보 설정
 */

const { ipcMain } = require("electron");
const logger = require("../utils/logger");
const eventEmitter = require("./event-emitter");
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
            break;
        }
        case "DELETE": {
            break;
        }
        case "POST": {
            break;
        }
        case "PUT": {
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

ipcMain.on("devtool-control", (evt, payload) => {
    logger.info(TAG, "devtool-control received =", payload);
    eventEmitter.emit("devtool-control", payload);
});

var mainWindow = null;
module.exports.sendToRenderer = function sendToRenderer(channel, payload) {
    if (!mainWindow) {
        return;
    }
    try {
        mainWindow.webContents.send(channel, payload);
    } catch (e) {}
};

module.exports.setMainWindow = function setMainWindow(win) {
    mainWindow = win;
};

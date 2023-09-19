const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

const logPath = path.join(app.getPath("userData"), "logs");
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true });
}

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
process.env["LOG_PATH"] = logPath;
process.env["IS_PACKAGED"] = app.isPackaged;

const logger = require("./utils/logger");
const ipc = require("./control/ipc.js");
// for devtool control
const eventEmitter = require("./control/event-emitter");

const TAG = "[APP]";
logger.info(TAG, "\n\n\n\n\n\nAPP Started. isPackaged =", app.isPackaged);

var devTools = null;
var mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: "NBIS EVC Interface Simulator",
        width: 1380,
        height: 755,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, "control", "preload.js"),
            // contextIsolation: true,
            devTools: true, // 다른 브라우저 창으로 띄운다.
        },
        resizable: false,
    });
    ipc.setMainWindow(mainWindow);

    mainWindow.loadFile(path.join(__dirname, "views", "index.html"));
    // win.setMenuBarVisibility(false);
    mainWindow.setMenu(null);
    // main window 종료시에 dev장 종료하고 app도 종료한다.
    mainWindow.on("closed", () => {
        if (devTools) {
            devTools.close();
            devTools = null;
        }
        if (process.platform !== "darwin") {
            app.quit();
            app.exit();
        }
    });

    // Renderer는 dev tool을 기본 로그뷰어로 한다.
    // 다른 창으로 띄워지도록 처리한다.
    openDetachedDevTools();
};

// devtools open-close
function openDetachedDevTools() {
    logger.info(TAG, "openDetachedDevTools() called !!");
    devTools = new BrowserWindow({
        width: 600,
        height: 760,
        show: false,
        minimizable: false,
        resizable: false,
        closable: false,
    });
    mainWindow.webContents.setDevToolsWebContents(devTools.webContents);
    mainWindow.webContents.openDevTools({ mode: "detach" });
    mainWindow.webContents.once("did-finish-load", function () {
        var windowBounds = mainWindow.getBounds();
        devTools.setPosition(
            windowBounds.x + windowBounds.width,
            windowBounds.y
        );
        devTools.setSize(windowBounds.width / 2, windowBounds.height);
        devTools.setMenu(null);

        // 시작시에 안보이게 한다.
        // devTools.show();
        ipc.sendToRenderer("devtool-status", "closed");
    });
    mainWindow.on("move", function () {
        var windowBounds = mainWindow.getBounds();
        devTools.setPosition(
            windowBounds.x + windowBounds.width,
            windowBounds.y
        );
    });

    devTools.on("closed", () => {
        devTools = null;
        ipc.sendToRenderer("devtool-status", "closed");
    });
}

// for devtool control
eventEmitter.on("devtool-control", (evt) => {
    if (evt) {
        if (evt.show) {
            devTools.show();
            ipc.sendToRenderer("devtool-status", "opened");
        } else {
            devTools.hide();
            ipc.sendToRenderer("devtool-status", "opened");
        }
    } else {
        logger.warn(TAG, "devtool-control received unknown control");
    }
});

app.whenReady().then(() => {
    createWindow();
    ipcMain.handle("dialog", (event, method, params) => {
        dialog[method](params);
    });
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (devTools) {
        devTools.close();
    }
    if (process.platform !== "darwin") {
        app.quit();
        app.exit();
    }
});

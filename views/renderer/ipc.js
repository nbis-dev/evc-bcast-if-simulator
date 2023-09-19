/**
 * Renderer main process
 */
const { ipcRenderer } = require("electron");
var eisSystems = [];

const getDeviceList = () => {
    showProcessingPage("연동장치 목록을 불러오는 중입니다.");
    // ipcRenderer에서의 이벤트 송신
    ipcRenderer.send("eis-config", { cmd: "GET" });
};

const setDevice = (payload) => {
    showProcessingPage("연동장치 정보를 설정하는 중입니다.");
    console.log("Renderer send ipc(eis-config) =", payload);
    // ipcRenderer에서의 이벤트 송신
    ipcRenderer.send("eis-config", payload);
};

// eis-config 대한 처리결과 이벤트 수신
ipcRenderer.on("eis-config", (evt, payload) => {
    console.log("Renderer received ipc(eis-config) = ", payload);
    setTimeout(() => {
        stopProcessingPage();
    }, 1000);
    eisSystems = payload.data;
    switch (payload.cmd) {
        case "GET": {
            // get
            deviceListShow(payload.data);
            break;
        }
        case "DELETE": {
            // delete
            deviceListShow(payload.data);
            break;
        }
        case "POST": {
            // add
            break;
        }
        case "PUT": {
            // modify
            break;
        }
        default: {
        }
    }
});

ipcRenderer.on("devtool-status", (evt, payload) => {
    console.log("Renderer received ipc(devtool-status) = ", payload);
    switch (payload) {
        case "opened": {
            // get

            break;
        }
        case "closed": {
            // delete
            break;
        }
        default: {
        }
    }
    //    document.getElementById('text-box').textContent = payload
});

const setDevToolsView = (payload) => {
    ipcRenderer.send("devtool-control", payload);
};

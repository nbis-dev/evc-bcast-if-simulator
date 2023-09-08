const os = require("os");

var msgId = 0;

const getNetworkInterfaces = () => {
    const list = [];
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let i in interfaces[iface]) {
            const f = interfaces[iface][i];
            if (f.family === "IPv4") {
                if (f.internal) {
                    list.unshift({ f, iface });
                } else {
                    list.push({ f, iface });
                }
            }
        }
    }
    return list;
};

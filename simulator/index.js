const logger = require("../utils/logger");
const lutil = require("lodash");
const eventEmitter = require("../control/event-emitter");
const process = require("process");
const ipc = require("../control/ipc");
const path = require("path");

const { Worker, isMainThread } = require("worker_threads");
if (!isMainThread) {
    return;
}
const TAG = "[SIM-MASTER]";
var mWorkers = {};

eventEmitter.on("eis-simulator", async (evt) => {
    if (lutil.isEmpty(evt)) {
        logger.warn(TAG, "Unknown message !!");
        return;
    }

    try {
        var control = lutil.isString(evt.control) ? evt.control : "";
        if (control === "START") {
            // workerData에 기본 설정값을 보내준다.
            const worker = new Worker(path.join(__dirname, "worker.js"), {
                workerData: evt,
            });
            mWorkers["" + evt.system] = {
                worker: worker,
            };

            // Listen for messages from the worker and print them.
            worker.on("message", (msg) => {
                logger.info(TAG, msg);
                if (msg.cmd === "START") {
                    ipc.sendToRenderer("eis-simulator", msg);
                    mWorkers["" + evt.system].name = msg.name;
                }
            });
            worker.on("error", (err) => {
                logger.error(TAG, err);
            });
            worker.on("online", (code) => {
                logger.info(TAG, `Worker online =`, evt.system);
            });
            worker.on("exit", (code) => {
                logger.info(
                    TAG,
                    `Worker exited with systemId=${evt.system} and code ${code}`
                );
                ipc.sendToRenderer("eis-simulator", {
                    cmd: "STOP",
                    system: evt.system,
                    device: evt.device,
                    name: mWorkers["" + evt.system].name,
                });
                delete mWorkers["" + evt.system];
            });
        } else if (control === "STOP") {
            if (!lutil.isEmpty(mWorkers["" + evt.system])) {
                await mWorkers["" + evt.system].worker.terminate();
            }
        }
    } catch (e) {
        logger.error(TAG, "exception =", e, e.stack);
    }
});

/**
    electron에서 better-sqlite3 모듈을 사용할 경우 아래와 같은 문제가 발생하는 경우가 있다.

    node_modules\sqlite3\lib\binding\electron-v4.0-win32-x64\node_sqlite3.node' was compiled against a different Node.js version using NODE_MODULE_VERSION 64. This version of Node.js requires NODE_MODULE_VERSION 69. Please try re-compiling or re-installing the module (for instance, using npm rebuildornpm install).
    위와 같은 문제가 발생했다면 아래와 같이 시도해 보자.

    ----------------------------------------------------------------------------------------------------------------------
    # 1. electron-rebuild 설치
    $ npm i --save-dev electron-rebuild
    # 또는
    $ yarn add -D electron-rebuild

    # electron-rebuild를 이요해서 rebuild
    $ npx electron-rebuild -f -w better-sqlite3
    ----------------------------------------------------------------------------------------------------------------------
*/
"use strict";

const Database = require("better-sqlite3");
// for transaction
Database.prototype.begin = function () {
    this.prepare("BEGIN").run();
};
Database.prototype.commit = function () {
    this.prepare("COMMIT").run();
};
Database.prototype.rollback = function () {
    this.prepare("ROLLBACK").run();
};

const util = require("util");
const path = require("path");
const fs = require("fs");
const { app } = require("electron");
const logger = require("../utils/logger");
const lutil = require("lodash");

const TAG = "[SQLITE3]";
const DBNAME = "db.sqlite3";

process.on("exit", () => db.close());
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));

const dbDir = process.env["DB_PATH"];
const db = new Database(path.join(dbDir, DBNAME), { info: console.log });
const TABLE_NAMES = {
    system: "TB_EIS_SYSTEM",
    eis_device: "TB_DEVICE_EIS",
    rbc_device: "TB_DEVICE_RBC",
    eis_elements: "TB_EIS_ELEMENTS",
};

const TABLE_DEFS = [
    {
        name: TABLE_NAMES.system,
        columns: [
            "\n\tid INTEGER PRIMARY KEY AUTOINCREMENT",
            "\n\tname VARCHAR(20) NOT NULL",
            "\n\tstation_no INTEGER NOT NULL", // station no
            "\n\tdesc VARCHAR(100)",
            "\n\tregdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        ],
        autoincrement: true,
        autoincrement_init: 100000000,
    },
    {
        name: TABLE_NAMES.eis_device,
        columns: [
            "\n\tid INTEGER PRIMARY KEY AUTOINCREMENT",
            "\n\tsys_id INTEGER", // 상위 담당구간 ID
            "\n\tis_default BOOLEAN NOT NULL CHECK (is_default IN (0, 1))",
            "\n\tname VARCHAR(20) NOT NULL",
            "\n\tdev_num INTEGER", // 1/2계 하드웨어 순서
            "\n\tnetworks TEXT", // 1/2계 네트워크 설정, Json으로 저장
            "\n\tdesc VARCHAR(100)",
            "\n\tregdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        ],
        constraint:
            ",\n\tCONSTRAINT fk_eis_system" +
            "\n\t\tFOREIGN KEY (sys_id)" +
            "\n\t\tREFERENCES TB_EIS_SYSTEM(id)" +
            "\n\t\tON UPDATE CASCADE" +
            "\n\t\tON DELETE CASCADE",
        autoincrement: true,
        autoincrement_init: 100000000,
    },
    {
        name: TABLE_NAMES.rbc_device,
        columns: [
            "\n\tid INTEGER PRIMARY KEY AUTOINCREMENT",
            "\n\tsys_id INTEGER", // 상위 담당구간 ID
            "\n\tname VARCHAR(20) NOT NULL",
            "\n\tdev_num INTEGER", // 1/2계 하드웨어 순서
            "\n\tdesc VARCHAR(100)",
            "\n\tnetworks TEXT", // 1/2계 네트워크 설정, Json으로 저장
            "\n\tregdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        ],
        constraint:
            ",\n\tCONSTRAINT fk_eis_system" +
            "\n\t\tFOREIGN KEY (sys_id)" +
            "\n\t\tREFERENCES TB_EIS_SYSTEM(id)" +
            "\n\t\tON UPDATE CASCADE" +
            "\n\t\tON DELETE CASCADE",
        autoincrement: true,
        autoincrement_init: 100000000,
    },
    {
        name: TABLE_NAMES.eis_elements,
        columns: [
            "\n\tid INTEGER PRIMARY KEY AUTOINCREMENT", // just index
            "\n\tsys_id INTEGER", // 상위 담당구간 ID
            "\n\ttype VARCHAR(20) NOT NULL", // element type
            "\n\tname VARCHAR(20)", // element name
            "\n\tpriority INTEGER NOT NULL", // 배열 순서
            "\n\tdefault_value INTEGER",
        ],
        constraint:
            ",\n\tCONSTRAINT fk_eis_system" +
            "\n\t\tFOREIGN KEY (sys_id)" +
            "\n\t\tREFERENCES TB_EIS_SYSTEM(id)" +
            "\n\t\tON UPDATE CASCADE" +
            "\n\t\tON DELETE CASCADE",
        autoincrement: true,
        autoincrement_init: 100000000,
    },
];
var CREATE_TABLE_STMT = "CREATE TABLE IF NOT EXISTS %s (%s %s)";
const AUTOINCREMENT_SETTIG_STMT =
    "INSERT INTO sqlite_sequence (name, seq) VALUES (?, ?)";

async function isTableExist(name) {
    const stmt = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";
    var result = await db.prepare(stmt).all(name);
    return result.length > 0;
}

// 테이블 생성 - 초기화 과정
(async () => {
    try {
        // array for ... of
        await db.begin();
        for (const table of TABLE_DEFS) {
            if (await isTableExist(table.name)) {
                logger.debug(TAG, "Init Database : already exist", table.name);
                continue;
            }
            logger.info(TAG, "Create Table name =", table.name);

            var sql = util.format(
                CREATE_TABLE_STMT,
                table.name,
                table.columns.join(", "),
                Boolean(table.constraint) ? table.constraint : ""
            );

            var stmt = db.prepare(sql);
            await stmt.run();

            // when set autoincrement value
            if (
                table.autoincrement === true &&
                lutil.isNumber(table.autoincrement_init) &&
                table.autoincrement_init > 1
            ) {
                logger.info(
                    TAG,
                    "\t- AutoIncrement value set =",
                    table.autoincrement_init
                );

                await db
                    .prepare(AUTOINCREMENT_SETTIG_STMT)
                    .run(table.name, table.autoincrement_init);
            }
            await presetKtcs3(table.name);
        }

        await db.commit();
    } catch (e) {
        await db.rollback();
        logger.error(e, e.stack);
        app.exit();
    }
})();

// 호남고속선은 미리 만들어 둔다.
// 다른데 사용할때는 이 코드를 지우고 사용한다.}
const presetKtcs3 = async (name) => {
    try {
        if (name === TABLE_NAMES.system) {
            // insert system - 호남고속선은 2개의 구역으로 나누어 연동장치가 담당한다.
            var sql = util.format(
                "INSERT INTO %s (name, station_no, desc) values (?, ?, ?)",
                TABLE_NAMES.system
            );
            const system = [
                ["KTCS-3 호남고속선 1구역", 1, "호남선 출발기준 EIS 1번"],
                ["KTCS-3 호남고속선 2구역", 2, "호남선 출발기준 EIS 2번"],
            ];
            var stmt = db.prepare(sql);
            for (const row of system) {
                await stmt.run(...row); // spread each sub-array to pass the individual elements
            }
        } else if (name === TABLE_NAMES.eis_device) {
            const systems = await db
                .prepare(
                    "SELECT * FROM " + TABLE_NAMES.system + " ORDER BY name ASC"
                )
                .all();

            // insert system - 호남고속선은 2개의 구역으로 나누어 연동장치가 담당한다.
            var sql = util.format(
                "INSERT INTO %s (sys_id, name, is_default, dev_num, networks, desc) values (?, ?, ?, ?, ?, ?)",
                TABLE_NAMES.eis_device
            );
            const rbcDevices = [
                [
                    systems[0].id,
                    "호남-1 EIS 1계",
                    1,
                    1,
                    JSON.stringify([{ ip: "192.168.10.101", port: 40001 }]),
                    "호남선 출발기준 1권역 EIS 1계",
                ],
                [
                    systems[1].id,
                    "호남-2 EIS 1계",
                    1,
                    1,
                    JSON.stringify([{ ip: "192.168.10.111", port: 40001 }]),
                    "호남선 출발기준 2권역 EIS 1계",
                ],
            ];
            var stmt = db.prepare(sql);
            for (const row of rbcDevices) {
                await stmt.run(...row); // spread each sub-array to pass the individual elements
            }
        } else if (name === TABLE_NAMES.rbc_device) {
            const systems = await db
                .prepare(
                    "SELECT * FROM " + TABLE_NAMES.system + " ORDER BY name ASC"
                )
                .all();
            // insert system - 호남고속선은 2개의 구역으로 나누어 연동장치가 담당한다.
            var sql = util.format(
                "INSERT INTO %s (sys_id, name, dev_num, networks, desc) values (?, ?, ?, ?, ?)",
                TABLE_NAMES.rbc_device
            );
            const rbcDevices = [
                [
                    systems[0].id,
                    "호남-1 RBC 1계",
                    1,
                    JSON.stringify([
                        { ip: "192.168.10.15", port: 5111 },
                        { ip: "192.168.11.16", port: 5111 },
                    ]),
                    "호남선 출발기준 EIS 1번의 RBC 1계",
                ],
                [
                    systems[1].id,
                    "호남-2 RBC 1계",
                    1,
                    JSON.stringify([
                        { ip: "192.168.10.13", port: 5111 },
                        { ip: "192.168.11.14", port: 5111 },
                    ]),
                    "호남선 출발기준 EIS 1번의 RBC 1계",
                ],
            ];
            var stmt = db.prepare(sql);
            for (const row of rbcDevices) {
                await stmt.run(...row); // spread each sub-array to pass the individual elements
            }
        } else if (name === TABLE_NAMES.eis_elements) {
            const systems = await db
                .prepare(
                    "SELECT * FROM " + TABLE_NAMES.system + " ORDER BY name ASC"
                )
                .all();
            // insert system - 호남고속선은 2개의 구역으로 나누어 연동장치가 담당한다.
            var sql = util.format(
                "INSERT INTO %s (sys_id, type, name, priority, default_value) values (?, ?, ?, ?, ?)",
                TABLE_NAMES.eis_elements
            );
            // 호남고속선용은 기본 두개이다.
            const elementsList = [
                // 연동장치 1구역
                [
                    // eis-id, 엘리먼트 종류, 엘리먼트 이름, index, 엘리먼트 값
                    [systems[0].id, "ST_MODE", "ST_MODE", 0x00, 0x02],
                    [systems[0].id, "ST_OTHER", "PW_POWER", 0x01, 0x0e],
                    [systems[0].id, "ST_MODE", "EIS_STAT", 0x02, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC5357A", 0x03, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC5357B", 0x04, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC5902A", 0x05, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC5902B", 0x06, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5903ABT", 0x07, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5906ABT", 0x08, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5907ABT", 0x09, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5912ABT", 0x0a, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5913ABT", 0x0b, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5916ABT", 0x0c, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5917ABT", 0x0d, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5922ABT", 0x0e, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5923ABT", 0x0f, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC5926A", 0x10, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC5926B", 0x11, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6102A", 0x12, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6102B", 0x13, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "5927ABT", 0x14, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "6103ABCDT", 0x15, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "6156T", 0x16, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "6157ABT", 0x17, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6502A", 0x18, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6502B", 0x19, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "6503ABT", 0x1a, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6506A", 0x1b, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6506B", 0x1c, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "6503ABT", 0x1d, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6512A", 0x1e, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6512B", 0x1f, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "6513ABT", 0x20, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6516A", 0x21, 0x01],
                    [systems[0].id, "TRACK_BLOCK", "VTC6516B", 0x22, 0x01],
                ],
                // 연동장치 2구역
                [
                    // eis-id, 엘리먼트 종류, 엘리먼트 이름, index, 엘리먼트 값
                    [systems[1].id, "ST_MODE", "ST_MODE", 0x00, 0x02],
                    [systems[1].id, "ST_OTHER", "PW_POWER", 0x01, 0x0e],
                    [systems[1].id, "ST_MODE", "EIS_STAT", 0x02, 0x01],
                    [systems[1].id, "POINT_SINGLE", "07", 0x03, 0x15],
                    [systems[1].id, "POINT_SINGLE", "08", 0x04, 0x15],
                    [systems[1].id, "POINT_SINGLE", "09", 0x05, 0x15],
                    [systems[1].id, "POINT_SINGLE", "10", 0x06, 0x15],
                    [systems[1].id, "POINT_SINGLE", "15", 0x07, 0x15],
                    [systems[1].id, "POINT_SINGLE", "11", 0x08, 0x15],
                    [systems[1].id, "POINT_SINGLE", "13", 0x09, 0x15],
                    [systems[1].id, "POINT_SINGLE", "59", 0x0a, 0x15],
                    [systems[1].id, "POINT_SINGLE", "60", 0x0b, 0x15],
                    [systems[1].id, "POINT_SINGLE", "57", 0x0c, 0x15],
                    [systems[1].id, "POINT_SINGLE", "58", 0x0d, 0x15],
                    [systems[1].id, "POINT_SINGLE", "54", 0x0e, 0x15],
                    [systems[1].id, "POINT_SINGLE", "50", 0x0f, 0x15],
                    [systems[1].id, "POINT_SINGLE", "48", 0x10, 0x15],
                    [systems[1].id, "POINT_SINGLE", "26", 0x11, 0x15],
                    [systems[1].id, "SIGNAL_MAIN", "01", 0x12, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "03", 0x13, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "28", 0x14, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "29", 0x15, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "30", 0x16, 0x01],
                    [systems[1].id, "SIGNAL_MAIN", "31", 0x17, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "32", 0x18, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "33", 0x19, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "34", 0x1a, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "35", 0x1b, 0x00],
                    [systems[1].id, "SIGNAL_MAIN", "56", 0x1c, 0x01],
                    [systems[1].id, "SIGNAL_MAIN", "58", 0x1d, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "01-03HDN", 0x1e, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "01-03FDN", 0x1f, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "01-56EDN", 0x20, 0x80],
                    [systems[1].id, "ROUTE_MAIN", "01-07", 0x21, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "01-56GDN", 0x22, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "03-03HDN", 0x23, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "03-03FDN", 0x24, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "03-56EDN", 0x25, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "03-07", 0x26, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "03-56GDN", 0x27, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "28-10", 0x28, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "28-58", 0x29, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "28-56", 0x2a, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "29-03", 0x2b, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "29-01", 0x2c, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "30-58", 0x2d, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "30-56", 0x2e, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "31-03", 0x2f, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "31-01", 0x30, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "32-58", 0x31, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "32-56", 0x32, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "33-03", 0x33, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "33-01", 0x34, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "34-58", 0x35, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "34-56", 0x36, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "35-03", 0x37, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "35-01", 0x38, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "56-03HUP", 0x39, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "56-03FUP", 0x3a, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "56-56H", 0x3b, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "56-56EUP", 0x3c, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "56-56GUP", 0x3d, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "58-03HUP", 0x3e, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "58-03FUP", 0x3f, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "58-56H", 0x40, 0x00],
                    [systems[1].id, "ROUTE_MAIN", "58-56EUP", 0x41, 0x80],
                    [systems[1].id, "ROUTE_MAIN", "58-56GUP", 0x42, 0x00],
                    [systems[1].id, "TRACK_PREMIS", "6703AT", 0x43, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6703BT", 0x44, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6703CT", 0x45, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6703DT", 0x46, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6703ET", 0x47, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6703FT", 0x48, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6703GT", 0x49, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6703HT", 0x4a, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6728AT", 0x4b, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6730AT", 0x4c, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6730BT", 0x4d, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6730CT", 0x4e, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6730DET", 0x4f, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6733AT", 0x50, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6733BT", 0x51, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6733CT", 0x52, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6733DT", 0x53, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6733ET", 0x54, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6735T", 0x55, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6756AT", 0x56, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6756BT", 0x57, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6756CT", 0x58, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6756DT", 0x59, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6756ET", 0x5a, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6756FT", 0x5b, 0x01],
                    [systems[1].id, "TRACK_PREMIS", "6756GT", 0x5c, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "6517ABT", 0x5d, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "VTC6522A", 0x5e, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "VTC6522B", 0x5f, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "6523ABT", 0x60, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "VTC6526A", 0x61, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "VTC6526B", 0x62, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "6527ABT", 0x63, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "VTC6702A", 0x64, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "VTC6702B", 0x65, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "6757ABT", 0x66, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7103ABT", 0x67, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7102ABT", 0x68, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7106ABT", 0x69, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7107ABT", 0x6a, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7113ABT", 0x6b, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7117ABT", 0x6c, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7123ABT", 0x6d, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7112ABT", 0x6e, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7116ABT", 0x6f, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7122ABT", 0x70, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7126ABT", 0x71, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7127ABT", 0x72, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7133ABT", 0x73, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7137ABT", 0x74, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7303AT", 0x75, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7132ABT", 0x76, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7136ABT", 0x77, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7302ABT", 0x78, 0x01],
                    [systems[1].id, "TRACK_BLOCK", "7356CDT", 0x79, 0x01],
                ],
            ];
            var stmt = db.prepare(sql);
            for (const rows of elementsList) {
                for (const row of rows) {
                    console.log(sql, row);
                    await stmt.run(...row); // spread each sub-array to pass the individual elements
                }
            }
        }
    } catch (e) {
        logger.error(TAG, e, e.stack);
        throw new Error(e.message);
    }
};

const getSystems = async (sysId) => {
    try {
        var stmt = null;
        var systems = [];
        if (lutil.isNumber(sysId) || lutil.isString(sysId)) {
            stmt = await db.prepare(
                "SELECT * FROM " +
                    TABLE_NAMES.system +
                    " WHERE id = ? ORDER BY name ASC"
            );
            // get은 objec로 반환해서 배열로 감싼다.
            systems = [await stmt.get(sysId)];
        } else {
            stmt = await db.prepare(
                "SELECT * FROM " + TABLE_NAMES.system + " ORDER BY name ASC"
            );
            systems = await stmt.all();
        }

        for (let system of systems) {
            const eis = await db
                .prepare(
                    "SELECT * FROM " +
                        TABLE_NAMES.eis_device +
                        " WHERE sys_id=? ORDER BY dev_num ASC"
                )
                .all(system.id);

            system.eis = eis;
            const rbc = await db
                .prepare(
                    "SELECT * FROM " +
                        TABLE_NAMES.rbc_device +
                        " WHERE sys_id=? ORDER BY dev_num ASC"
                )
                .all(system.id);
            system.rbc = rbc;
        }

        return { success: true, data: systems };
    } catch (e) {
        logger.error(TAG, e, e.stack);
        return { success: false };
    }
};

module.exports.getRegisteredSystems = async (
    sysId,
    withElementList = false
) => {
    try {
        var res = await getSystems(sysId);
        if (!res.success || !withElementList) {
            return res;
        }
        var data = res.data;

        for (var system of data) {
            const elements = await db
                .prepare(
                    "SELECT * FROM " +
                        TABLE_NAMES.eis_elements +
                        " WHERE sys_id=? ORDER BY priority ASC"
                )
                .all(system.id);
            system.elements = elements;
        }
        return { success: true, data: data };
    } catch (e) {
        logger.error(TAG, e, e.stack);
        return { success: false };
    }
};

module.exports.deleteRegisteredSystem = async (data) => {
    try {
        var sql = "DELETE FROM " + TABLE_NAMES.system + " WHERE id=?";
        var stmt = db.prepare(sql);
        if (lutil.isArray(data)) {
            for (const row of data) {
                await stmt.run(...row); // spread each sub-array to pass the individual elements
            }
        } else {
            var res = await stmt.run(data);
            logger.info(TAG, "DLLETE system result =", res);
        }

        return await getSystems();
    } catch (e) {
        logger.error(TAG, e, e.stack);
        return { success: false };
    }
};

module.exports.changeDefaultDevice = async (sysId, eisId) => {
    try {
        // 1인것 0으로 바꾸고 . eisId를 1로 한다.
        var sql =
            "UPDATE " +
            TABLE_NAMES.eis_device +
            " SET is_default=0 WHERE sys_id=? AND is_default=1";
        var stmt = db.prepare(sql);
        await stmt.run(sysId);

        sql =
            "UPDATE " + TABLE_NAMES.eis_device + " SET is_default=1 WHERE id=?";
        var stmt = db.prepare(sql);
        await stmt.run(eisId);
        return { success: true };
    } catch (e) {
        logger.error(TAG, e, e.stack);
        return { success: false };
    }
};

"use strict";
// const electron = require("electron");
const lutil = require("lodash");

jQuery(document).ready(async function () {
    $(".selectpicker").select2({
        minimumResultsForSearch: -1,
        placeholder: "아이템이 없습니다",
    });

    showProcessingPage("통신장치 목록을 불러오는 중입니다.");
    var ports = await getAvalableSerialPorts();
    console.log(ports);
    // show
    createComportSelectbox(ports);
    setTimeout(() => {
        stopProcessingPage();
    }, 500);
    createCommandSelectbox();
    setInterval(() => {
        scrollSmoothlyToBottom("log_view_div");
    }, 500);
});

$("#send_command_button").on("click", () => {
    var selectedVal = $("#select_command").val();
    var command = mCommands[selectedVal];
    console.log(command);

    if (isNullObject(mSerialPort)) {
        showProcessingPage("장치 연결을 하시거나 장치 상태를 확인해 주세요.");
        setTimeout(() => {
            stopProcessingPage();
        }, 500);
        return;
    }

    var msgLen = 12 + command.data.length;
    var msg = Buffer.alloc(msgLen);
    msg[0] = 0x02; // stx
    msg[msgLen - 1] = 0x03; // etx
    msg[1] = command.code;
    msg[2] = command.type;

    if (mSendSeq === 0xffff) {
        mSendSeq = 0x00;
    }
    msg.writeInt16BE(mSendSeq++, 3);
    msg.writeInt16BE(command.data.length, 5);
    let pos = 7;
    for (var i = 0; i < command.data.length - 1; i++) {
        msg[pos + i] = command.data[i];
    }
    mSerialPort.write(msg);
    var row = '<tr class="tr-send"> \
                    <td class="td-center">%s</td> \
                    <td class="td-center">%s</td>\
                    <td class="td-center">%s</td>\
                    <td class="td-center">%s</td>   \
                    <td class="td-center">%s</td>   \
                    <td class="td-left">%s</td>     \
                </tr>'.format(
        "ME",
        msg[1],
        msg[2],
        msg.readInt16BE(3),
        command.data.length,
        command.data.length === 0
            ? ""
            : msg.toString("hex", 7, 7 + command.data.length).match(/.{1,2}/g)
    );

    $("#log_view_table tbody").append(row);
});

var mSendSeq = 0x00;
const mCommands = [
    {
        name: "초기연결 (0x10)",
        code: 0x10,
        type: 0x01,
        data: [0x0001, 0x012c, 0x0000, 0x0005],
    },
    {
        name: "충전시작버튼 (0x11)",
        code: 0x10,
        type: 0x01,
        data: [],
    },
    {
        name: "충전종료버튼 (0x12)",
        code: 0x10,
        type: 0x01,
        data: [],
    },
];
const createCommandSelectbox = (options) => {
    $("#select_command").empty();
    $("#select_command").val(null); // clearing selections

    for (var i = 0; i < mCommands.length; i++) {
        var newOption = new Option(
            mCommands[i].name,
            i,
            i === 0 ? true : false,
            i === 0 ? true : false
        );

        if (i === 0) {
            $("#select_command").append(newOption).trigger("change");
        } else {
            $("#select_command").append(newOption);
        }
    }
};

const createComportSelectbox = (options) => {
    $("#select_com_port").empty();
    $("#select_com_port").val(null); // clearing selections
    for (var i = 0; i < options.length; i++) {
        var newOption = new Option(
            options[i].path,
            options[i].path,
            i === 0 ? true : false,
            i === 0 ? true : false
        );

        if (i === 0) {
            $("#select_com_port").append(newOption).trigger("change");
        } else {
            $("#select_com_port").append(newOption);
        }
    }

    if (options.length > 0) {
        $("#select_com_port").prop("disabled", false);
        // connect button enable
        $("#connect_comport_button").removeClass("btn-dark");
        $("#connect_comport_button").addClass("btn-primary");
        $("#connect_comport_button").prop("disabled", true);
    } else {
        $("#select_com_port").prop("disabled", true);
        // connect button disable
        $("#connect_comport_button").removeClass("btn-danger");
        $("#connect_comport_button").removeClass("btn-primary");
        $("#connect_comport_button").addClass("btn-dark");
        $("#connect_comport_button").prop("disabled", true);
    }
};

/// devtools check box
$('input:checkbox[name="devtool_checkbox"]').on("click", (e) => {
    console.log(
        "change devtool view = ",
        $('input:checkbox[name="devtool_checkbox"]').is(":checked")
    );
    setDevToolsView({
        show: $('input:checkbox[name="devtool_checkbox"]').is(":checked"),
    });
});

var mSelectedComport = null;
var mSerialPort = null;
/// devtools check box
$("#select_com_port").on("change", (e) => {
    // 동일한 옵션이 선택되면 이벤트 발생하지 않는다.
    var selectedVal = $("#select_com_port").val();
    console.log("select_com_port =", $("#select_com_port").val());
    if (selectedVal === mSelectedComport) {
        // do not anything
        return;
    }

    mSelectedComport = selectedVal;

    // connect 된 상태에서는 selectbox를 disable 시킬거니 여기서는 신경쓰지 않음
    $("#connect_comport_button").removeClass("btn-dark");
    $("#connect_comport_button").addClass("btn-primary");
});

$("#connect_comport_button").on("click", (e) => {
    console.log("connect_comport_button clicked comport =", mSelectedComport);

    if (mSerialPort === null || mSerialPort === undefined) {
        showProcessingPage(mSelectedComport + " 장치에 연결 중입니다.");
        console.log("Open Serial port = ", mSelectedComport);

        // case connect
        mSerialPort = new SerialPort({
            path: mSelectedComport,
            baudRate: 115200,
        });

        mSerialPort.on("open", () => {
            console.log("Serial port open:!!!");
            setComportBox(false);
            setTimeout(() => {
                stopProcessingPage();
            }, 500);

            // enable command
            setCommandBox(true);
        });
        mSerialPort.on("data", (data) => {
            const buf = Buffer.from(data);
            console.log("Serial port data received =", buf);
            if (buf[0] === 0x02) {
                const msgSeq = buf.readInt16BE(3, 2);
                const dataLen = buf.readInt16BE(5, 2);

                var row = '<tr class="tr-receive"> \
                    <td class="td-center">%s</td> \
                    <td class="td-center">%s</td>\
                    <td class="td-center">%s</td>\
                    <td class="td-center">%s</td>   \
                    <td class="td-center">%s</td>   \
                    <td class="td-left">%s</td>     \
                </tr>'.format(
                    mSelectedComport,
                    buf[1],
                    buf[2],
                    msgSeq,
                    dataLen,
                    buf.toString("hex", 7, 7 + dataLen).match(/.{1,2}/g)
                );
            } else {
                var row = '<tr class="tr-receive"> \
                    <td class="td-center">%s</td> \
                    <td class="td-center">%s</td>\
                    <td class="td-center">%s</td>\
                    <td class="td-center">%s</td>   \
                    <td class="td-center">%s</td>   \
                    <td class="td-left">%s</td>     \
                </tr>'.format(
                    mSelectedComport,
                    "-",
                    "-",
                    "-",
                    "-",
                    buf.toString("utf8")
                );
            }

            $("#log_view_table tbody").append(row);
        });
        mSerialPort.on("close", (err) => {
            console.log("port closed", err);
            setComportBox(true);

            // usb 강제로 뽑으면 close만 올라옴
            mSerialPort = null;
            if (!isNullObject(err) && !isNullObject(err.message)) {
                stopProcessingPage();
                showProcessingPage(err.message);
                setTimeout(() => {
                    stopProcessingPage();
                }, 1500);
            }

            // disable command
            setCommandBox(false);
        });
        mSerialPort.on("error", (err) => {
            console.log("Error: ", err.message);
            mSerialPort = null;
            stopProcessingPage();
            showProcessingPage(err.message);
            setTimeout(() => {
                stopProcessingPage();
            }, 1500);

            // disable command
            setCommandBox(false);
        });
    } else {
        // case unconnect
        swal({
            title: "연결을 종료 하시겠습니까?",
            html: "장치와의 연결을 종료합니다.",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "종료하기",
            cancelButtonText: "취소",
        }).then(function (e) {
            if (
                !isNullObject(e) &&
                !isNullObject(e.dismiss) &&
                (e.dismiss === "cancel" || e.dismiss === "overlay")
            ) {
                return;
            }
            if (mSerialPort) {
                mSerialPort.close();
            }
            mSerialPort = null;
        });
    }

    $("#clear_log_button").on("click", () => {
        $("#log_view_table tbody").empty();
    });
});

const setComportBox = (connectable) => {
    if (connectable) {
        $("#select_com_port").prop("disabled", false);
        $("#connect_comport_button").text("연결하기");
        $("#connect_comport_button").removeClass("btn-dark");
        $("#connect_comport_button").removeClass("btn-danger");
        $("#connect_comport_button").addClass("btn-primary");
    } else {
        $("#select_com_port").prop("disabled", true);
        $("#connect_comport_button").text("연결끊기");
        $("#connect_comport_button").removeClass("btn-dark");
        $("#connect_comport_button").removeClass("btn-primary");
        $("#connect_comport_button").addClass("btn-danger");
    }
};
const setCommandBox = (enable) => {
    if (enable) {
        $("#select_command").prop("disabled", false);
        $("#send_command_button").prop("disabled", false);
        $("#send_command_button").removeClass("btn-dark");
        $("#send_command_button").addClass("btn-primary");
    } else {
        $("#select_command").prop("disabled", true);
        $("#send_command_button").prop("disabled", true);
        $("#send_command_button").removeClass("btn-primary");
        $("#send_command_button").addClass("btn-dark");
    }
};

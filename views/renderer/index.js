'use strict';
// const electron = require("electron");
const lutil = require('lodash');

var deviceListTemplate = `<div class="card bg-{2} device-select" id="id_system_{0}">
            <div class="card-header d-flex justify-content-between align-items-center pr-2">
              <a href="javascript:showSystemPanel({0})">
                <h4 class="card-title white">{1}</h4>
              </a>
              <ul class="list-inline mb-0">
                <li>
                  <a href="javascript:systemModify({0})">
                    <i class="bx bx-edit white font-medium-3 align-middle cursor-pointer"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:systemDelete({0})">
                    <i class="bx bx-trash white font-medium-3 align-middle cursor-pointer"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>`;

// {0} system id, {1} eis id, {2} device name
var eisControlPanelTemplate = `<div class="{4}" style="height: 400px;"><div class="card mb-0">
<div class="card-header bg-secondary rounded-0" id="eis_title_{1}">
    <h4 class="font-medium-4 text-center white" name="eis_name">{2}</h4>
</div>
<div class="card-content">
    <div class="card-body">
        <div class="row">
            <div class="col p-2">
                <div class="radio radio-primary">
                    <input type="radio" id="eis_use_{1}" name="eis_use_{0}" value="{1}">
                    <label for=""eis_use_{1}">이 장치 사용</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <img src="images/eis_server.png" style="height: 100px;">
            </div>
            <div class="col-9">
                <table class="table text-bold-600 font-medium-1">
                    <tbody>
                        <tr>
                            <td colspan="2"><b>통신망 설정</b></td>
                        </tr>
                        {3}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="card-footer border-top text-center">
    <button type="button" class="btn btn-success" onclick="startSimulator({0}, {1})" id="btn_start_sim_{0}_{1}">
        <span>시작</span>
    </button>
    <button type="button" class="btn btn-danger" onclick="stopSimulator({0}, {1})" style="display: none;" id="btn_stop_sim_{0}_{1}">
        <span>중지</span>
    </button>
</div>
</div>
</div>`;

var rbcControlPanelTemplate = `<div class="{2}"><div class="card mb-0">
<div class="card-content">
    <div class="card-body">
        <div class="row">
            <div class="col-3">
                <img src="images/rbc_server.png" style="height: 100px;"><br><p class="text-center text-bold-600 mb-1 mt-2">{0}</p>
            </div>
            <div class="col-9">
                <table class="table text-bold-600 font-medium-1">
                    <tbody>
                        <tr>
                            <td colspan="2"><b>통신망 설정</b></td>
                        </tr>
                        {1}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</div>
</div>`;

// 왼쪽 리스트에서 디바이스별 색깔 구분
var colorStyle = ['info', 'warning', 'success', 'danger'];

// 왼쪽 리스트에 표시
function deviceListShow(data) {
    var htmlDeviceList = '';
    var selectedSystemId = mSelectedSystem.id;
    var foundSelected = false;

    var i = 0;
    for (let system of data) {
        console.log(system);
        htmlDeviceList += String.format(
            deviceListTemplate,
            system.id,
            system.name,
            colorStyle[i++ % colorStyle.length]
        );

        if (selectedSystemId === system.id) {
            foundSelected = true;
        }

        setTimeout(() => {
            startSimulator(system.id, system.eis[0].id, true);
        }, 2500);
    }
    if (data.length === 0) {
        $('#device_list').html('등록된 연동장치가 없습니다.');
        showSystemPanel(0);
    } else {
        $('#device_list').html(htmlDeviceList);
        if (!foundSelected) {
            // 첫번째 아이템
            showSystemPanel(data[0].id);
        } else {
            showSystemPanel(selectedSystemId);
        }
    }
}

// 왼쪽 리스트에서 디바이스 삭제
function systemDelete(id) {
    swal({
        title: '연동장치를 삭제하시겠습니까?',
        html: '장치를 삭제하면 다시 등록하셔야 합니다.',
        type: 'warning',
        confirmButtonClass: 'btn btn-warning',
        showCancelButton: true,
        confirmButtonText: '삭제하기',
        cancelButtonText: '아니오',
    }).then(function (e) {
        if (!isNullObject(e) && !isNullObject(e.dismiss) && (e.dismiss === 'cancel' || e.dismiss === 'overlay')) {
            return;
        }
        setDevice({ cmd: 'DELETE', system: id });
    });
}

// 왼쪽 리스트에서 디바이스 삭제
function systemModify(id) {
    swal({
        title: '연동장치를 수정하시겠습니까?',
        html: '장치를 수정하면 동작중인 서비스가 중지되어 다시 시작하셔야 합니다.',
        type: 'warning',
        confirmButtonClass: 'btn btn-warning',
        showCancelButton: true,
        confirmButtonText: '수정하기',
        cancelButtonText: '아니오',
    }).then(function (e) {
        if (!isNullObject(e) && !isNullObject(e.dismiss) && (e.dismiss === 'cancel' || e.dismiss === 'overlay')) {
            return;
        }
        // setDevice({ cmd: "PUT", system: id });
    });
}

var mSelectedSystem = { id: 0 };
function showSystemPanel(sysId) {
    var system = null;

    if (sysId === 0) {
        mSelectedSystem = { id: 0 };
        $('#div_eis_info').html('');
        $('#div_rbc_info').html('');
        return;
    }

    for (let obj of eisSystems) {
        console.log(obj.id, sysId);
        if (obj.id == sysId) {
            system = obj;
            break;
        }
    }

    $('#div_eis_info').html('');
    $('#div_rbc_info').html(
        '<div class="col-lg-12 bg-dark">' +
            '   <div' +
            '       class="font-medium-4 text-center white mt-2 mb-2">' +
            '        <b>연동하는 RBC 정보</b>' +
            '    </div>' +
            '</div>'
    );

    if (mSelectedSystem.id > 0) {
        $('#id_system_' + mSelectedSystem.id).removeClass('bg-dark');
        $('#id_system_' + mSelectedSystem.id).addClass(mSelectedSystem.bgClass);
    }
    mSelectedSystem.id = sysId;
    var classList = $('#id_system_' + sysId)
        .attr('class')
        .split(/\s+/);
    for (let className of classList) {
        const split = className.split('-');
        if (split.length != 2) {
            continue;
        }
        if (colorStyle.indexOf(split[1]) !== -1) {
            mSelectedSystem.bgClass = className;
        }
    }
    $('#id_system_' + sysId).addClass('bg-dark');
    $('#id_system_' + sysId).removeClass(mSelectedSystem.bgClass);

    if (lutil.isEmpty(system)) {
        showProcessingPage('연동장치 정보를 찾을 수 없습니다.');
        setTimeout(() => {
            stopProcessingPage();
        }, 1000);

        $('#div_eis_info').html(
            '<div class="col-lg-12 bg-white" id="div_eis_empty" style="height: 100%">' +
                '  <div class="font-medium-4 bg-white text-center white mt-2 mb-2 text-dark">' +
                '    <b class="text-dark">' +
                '        연동장치 정보가 없습니다<br />정보를 입력해야' +
                '        사용이 가능합니다.' +
                '    </b>' +
                '</div>' +
                '</div>'
        );
        return;
    }

    if (lutil.isEmpty(system.eis)) {
        showProcessingPage('연동장치 하드웨어 정보를 추가해 주세요.');
        setTimeout(() => {
            stopProcessingPage();
        }, 1000);
        $('#div_eis_info').html(
            '<div class="col-lg-12 bg-white" id="div_eis_empty" style="height: 100%">' +
                '  <div class="font-medium-4 bg-white text-center white mt-2 mb-2 text-dark">' +
                '    <b class="text-dark">' +
                '        연동장치 정보가 없습니다<br />정보를 입력해야' +
                '        사용이 가능합니다.' +
                '    </b>' +
                '</div>' +
                '</div>'
        );
        return;
    }

    showProcessingPage('연동장치 상세정보를 표시합니다');
    setTimeout(() => {
        stopProcessingPage();
    }, 1000);

    // 연동장치 하드웨어는 2개까지만
    var eisPanelHtml = '';
    for (var i = 0; i < system.eis.length; i++) {
        let eis = system.eis[i];
        let networks = [];
        try {
            networks = JSON.parse(eis.networks);
        } catch (e) {
            console.error('EIS 장치의 네트워크 정보 읽기 실패 !!!!');
        }
        // networks 정보가 없을때 처리 필요
        var netHtml = '';
        for (let net of networks) {
            netHtml += `<tr>
                        <td width="70%">${net.ip}</td>
                        <td width="70%">${net.port}</td>
                    </tr>`;
        }

        var eisPanelHtml = String.format(
            eisControlPanelTemplate,
            eis.sys_id,
            eis.id,
            eis.name,
            netHtml,
            system.eis.length === 1 ? 'col-lg-12' : 'col-lg-6'
        );
        $('#div_eis_info').append(eisPanelHtml);

        $(`#div_eis_info`).on('click', '.radio', function () {
            var checked = $(`input[name="eis_use_${mSelectedSystem.id}"]:checked`).val();
            var clicked = $(this).find('input:first').attr('value');
            if (checked !== clicked) {
                swal({
                    title: '연동장치 시뮬레이션 장비를 변경하시겠습니까?',
                    html: '진행중인 시뮬레이션이 있다면 진행이 종료됩니다.',
                    type: 'warning',
                    confirmButtonClass: 'btn btn-warning',
                    showCancelButton: true,
                    confirmButtonText: '변경하기',
                    cancelButtonText: '아니오',
                }).then(function (e) {
                    if (
                        !isNullObject(e) &&
                        !isNullObject(e.dismiss) &&
                        (e.dismiss === 'cancel' || e.dismiss === 'overlay')
                    ) {
                        return;
                    }
                    $(`#eis_use_${checked}`).prop('checked', false);
                    $(`#eis_use_${clicked}`).prop('checked', true);

                    // is_default가 변경된다.
                    // 진행중인 시뮬레이션이 있다면 중지한다.
                    showProcessingPage('연동장치 상세정보를 표시합니다');
                    setDevice({
                        cmd: 'PUT',
                        type: 'EIS-DEFAULT',
                        sys_id: mSelectedSystem.id,
                        id: lutil.toNumber(clicked),
                    });
                });
            }
        });
        if (eis.is_default === 1) {
            $('#eis_title_' + eis.id).removeClass('bg-secondary');
            $('#eis_title_' + eis.id).addClass('bg-success');
            $('#btn_start_sim_' + eis.id).attr('disabled', false);
            $(`#eis_use_${eis.id}`).prop('checked', true);
        } else {
            $('#eis_title_' + eis.id).removeClass('bg-success');
            $('#eis_title_' + eis.id).addClass('bg-secondary');
            $('#btn_start_sim_' + eis.id).attr('disabled', true);
            $(`#eis_use_${eis.id}`).prop('checked', false);
        }

        if (mRunningSystem.indexOf(sysId) !== -1) {
            $(`#btn_start_sim_${sysId}_${eis.id}`).hide();
            $(`#btn_stop_sim_${sysId}_${eis.id}`).show();
        } else {
            $(`#btn_start_sim_${sysId}_${eis.id}`).show();
            $(`#btn_stop_sim_${sysId}_${eis.id}`).hide();
        }
    }
    // $("input[name='eis_use']:radio").onclick = function () {
    //     //라디오 버튼 값을 가져온다.
    //     console.log("xxxxxx");
    //     var noticeCat = this.value;
    //     alert(noticeCat);
    // };

    let rbc = !lutil.isEmpty(system.rbc) && system.rbc.length > 0 ? system.rbc : [];
    let rbcNetCount = 0;
    for (let obj of rbc) {
        try {
            var networks = JSON.parse(obj.networks);
            rbcNetCount += networks.length;

            var netHtml = '';
            for (let net of networks) {
                netHtml += `<tr>
                        <td width="70%">${net.ip}</td>
                        <td width="70%">${net.port}</td>
                    </tr>`;
            }
            var rbcPanelHtml = String.format(
                rbcControlPanelTemplate,
                obj.name,
                netHtml,
                rbc.length === 1 ? 'col-lg-12' : 'col-lg-6'
            );
            $('#div_rbc_info').append(rbcPanelHtml);
        } catch (e) {
            console.error('EIS 장치의 네트워크 정보 읽기 실패 !!!!');
        }
    }
    if (rbcNetCount === 0) {
        $('#div_rbc_info').append(
            '<div class="col-lg-12 bg-white" id="div_rbc_empty" style="height: 100%">' +
                '  <div class="font-medium-4 bg-white text-center white mt-2 mb-2 text-dark">' +
                '    <b class="text-dark">' +
                '        연동장치 정보가 없습니다<br />정보를 입력해야' +
                '        사용이 가능합니다.' +
                '    </b>' +
                '</div>' +
                '</div>'
        );
        return;
    }
}

var mRunningSystem = [];
function startSimulator(sysId, eisId, auto = false) {
    if (auto) {
        showProcessingPage('연동장치 시뮬레이터를 시작하고 있습니다.');
        controlSimulator({ system: sysId, device: eisId, control: 'START' });
    } else {
        swal({
            title: '시뮬레이터를 시작하겠습니까?',
            html: '시뮬레이터는 지정된 정보에 따라 RBC와 통신합니다.',
            type: 'warning',
            confirmButtonClass: 'btn btn-warning',
            showCancelButton: true,
            confirmButtonText: '시작하기',
            cancelButtonText: '아니오',
        }).then(function (e) {
            if (!isNullObject(e) && !isNullObject(e.dismiss) && (e.dismiss === 'cancel' || e.dismiss === 'overlay')) {
                return;
            }
            showProcessingPage('연동장치 시뮬레이터를 시작하고 있습니다.');
            controlSimulator({ system: sysId, device: eisId, control: 'START' });
        });
    }
}

function stopSimulator(sysId, eisId) {
    swal({
        title: '시뮬레이터를 중지하겠습니까?',
        html: '시뮬레이터가 종료되며, 다시 시작하려면 시작버튼을 눌러주세요.',
        type: 'warning',
        confirmButtonClass: 'btn btn-warning',
        showCancelButton: true,
        confirmButtonText: '중지하기',
        cancelButtonText: '아니오',
    }).then(function (e) {
        if (!isNullObject(e) && !isNullObject(e.dismiss) && (e.dismiss === 'cancel' || e.dismiss === 'overlay')) {
            return;
        }
        showProcessingPage('연동장치 시뮬레이터를 중지하고 있습니다.');
        controlSimulator({ system: sysId, device: eisId, control: 'STOP' });
    });
}

jQuery(document).ready(function () {
    $('#btn_modal_submit').on('click', function () {
        $('#p_modal_add').modal('hide');
    });

    $('#btn_modal_cancel, #btn_close_x').on('click', function () {
        $('#p_modal_add').modal('hide');
    });
    // 클릭상태 해제가 안되어서 넣는다. 그래도 안되는 것 같음
    $('#p_modal_add').on('hidden.bs.modal', (e) => {
        // reset modal and button
        $('#p_add_form').each(function () {
            this.reset();
        });
        $('#id_eis_add_btn').off('click');
        console.log('xxx');
    });

    if ($('#device_list').length > 0) {
        var widget_chat_scroll = new PerfectScrollbar('#device_list', {
            wheelPropagation: false,
        });
    }

    $('#eis_list_div').css('height', window.innerHeight + 'px');
    getDeviceList();

    // var interfaces = getNetworkInterfaces();
    // console.log(interfaces);
});

/// devtools check box
$('input:checkbox[name="devtool_checkbox"]').on('click', (e) => {
    console.log('change devtool view = ', $('input:checkbox[name="devtool_checkbox"]').is(':checked'));
    setDevToolsView({
        show: $('input:checkbox[name="devtool_checkbox"]').is(':checked'),
    });
});

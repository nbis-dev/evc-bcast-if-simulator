'use strict'

var defaultUserPicImage = '/images/core/default_user_pic.jpg'
var defaultNoImage = '/images/core/no_image.png'
var defaultNoFile = '/images/core/no_file.png'

var defaultCorpImages = [
    '/images/default_circle/logo_secondary.png',
    '/images/default_circle/logo_brand.png',
    '/images/default_circle/logo_danger.png',
    '/images/default_circle/logo_success.png',
    '/images/default_circle/logo_warning.png'
]

var certificatesGradeImages = [
    "/images/grade/first_grade.png",
    "/images/grade/second_grade.png",
    "/images/grade/third_grade.png",
    "/images/grade/full_grade.png"
]

var defaultBannerImages = [
    '/images/banner/banner_1.jpg',
    '/images/banner/banner_2.jpg',
    '/images/banner/banner_3.jpg',
    '/images/banner/banner_4.jpg',
    '/images/banner/banner_5.jpg',
    '/images/banner/banner_6.jpg',
    '/images/banner/banner_7.jpg',
    '/images/banner/banner_8.jpg',
    '/images/banner/banner_9.jpg',
    '/images/banner/banner_10.jpg',
    '/images/banner/banner_11.jpg',
    '/images/banner/banner_12.jpg',
    '/images/banner/banner_13.jpg',
    '/images/banner/banner_14.jpg',
    '/images/banner/banner_15.jpg',
    '/images/banner/banner_16.jpg',
    '/images/banner/banner_17.jpg',
    '/images/banner/banner_18.jpg',
    '/images/banner/banner_19.jpg',
    '/images/banner/banner_20.jpg'
]

var mPageTypeParam = getUrlParameter('type');
var mPageStatusParam = getUrlParameter('status');
var mPageIssueNoParam = parseInt(getUrlParameter('issue_no'));
var mPageTurnParam = getUrlParameter('myturn');
if (isNaN(mPageIssueNoParam)) {
    mPageIssueNoParam = undefined;
}

var contentPages = {
    dashboard: {
        isGroup: false,
        content: '/index.html'
    },
    board: {
        isGroup: true,
        board_list: {
            menu_item: 'board_list',
            content: '/pages/board_list.html'
        },
        board_write: {
            menu_item: 'board_write',
            content: '/pages/board_write.html'
        },
        board_detail: {
            menu_item: 'board_detail',
            content: '/pages/board_detail.html'
        },
        board_edit: {
            menu_item: 'board_edit',
            content: '/pages/board_edit.html'
        },
        board_regulation: {
            menu_item: 'board_regulation',
            content: '/pages/board_regulation.html'
        }
    },
    approval_new: {
        isGroup: true,
        choice: {
            menu_item: 'choice',
            content: '/approval/choice.html'
        },
        pexpense: {
            menu_item: 'approval_add',
            content: '/approval/pexpense.html'
        },
        bizcard: {
            menu_item: 'approval_add',
            content: '/approval/bizcard.html'
        },
        biz_trip: {
            menu_item: 'approval_add',
            content: '/approval/biz_trip.html'
        },
        leave: {
            menu_item: 'approval_add',
            content: '/approval/leave.html'
        },
        leave_report: {
            menu_item: 'approval_add',
            content: '/approval/leave_report.html'
        },
        worktime: {
            menu_item: 'approval_add',
            content: '/approval/worktime.html'
        },
        certificate: {
            menu_item: 'approval_add',
            content: '/approval/certificate.html'
        },
        life_relief: {
            menu_item: 'approval_add',
            content: '/approval/life_relief.html'
        },
        house: {
            menu_item: 'approval_add',
            content: '/approval/house.html'
        },
        family_event: {
            menu_item: 'approval_add',
            content: '/approval/family_event.html'
        },
        training: {
            menu_item: 'approval_add',
            content: '/approval/training.html'
        },
        training_report: {
            menu_item: 'approval_add',
            content: '/approval/training_report.html'
        },
        draft: {
            menu_item: 'approval_add',
            content: '/approval/draft.html'
        },
        approval_add: {
            menu_item: 'approval_add',
            content: '/approval/add.html'
        },
        school_expenses: { // 학자금
            menu_item: 'approval_add',
            content: '/approval/school_expenses.html'
        },
        external_document_receipt: { // 대외문서접수
            menu_item: 'approval_add',
            content: '/approval/external_document_receipt.html'
        },
        purchase_request: { // 구매요청서
            menu_item: 'approval_add',
            content: '/approval/purchase_request.html'
        },
        purchase_materials: { // 자재구입결의서
            menu_item: 'approval_add',
            content: '/approval/purchase_materials.html'
        },
        purchase_spend: { // 구매지출결의서
            menu_item: 'approval_add',
            content: '/approval/purchase_spend.html'
        },
        purchase_order: { // 발주서
            menu_item: 'approval_add',
            content: '/approval/purchase_order.html'
        },
        work_report: { // 작업일보
            menu_item: 'approval_add',
            content: '/approval/work_report.html'
        },
        club_register: { // 동호회 등록 신청서
            menu_item: 'approval_add',
            content: '/approval/club_register.html'
        },
        club_result_report: { // 동호회 행사 결과 보고서
            menu_item: 'approval_add',
            content: '/approval/club_result_report.html'
        },
        ojt_plan: { // OJT 계획서
            menu_item: 'approval_add',
            content: '/approval/ojt_plan.html'
        },
        ojt_report: { // OJT 보고서
            menu_item: 'approval_add',
            content: '/approval/ojt_report.html'
        },
        client_gift: { // 외부고객 선물지급 신청서
            menu_item: 'approval_add',
            content: '/approval/client_gift.html'
        },
    },
    approval_dashboard: {
        isGroup: false,
        content: '/approval/approval_dashboard.html'
    },
    approval_req: {
        isGroup: true,
        list: {
            content: '/approval/list.html'
        },
    },
    approval_view: {
        isGroup: false,
        content: '/approval/view.html'
    },
    approval_recv: {
        isGroup: true,
        list: {
            content: '/approval/list.html'
        },
    },
    approval_reference: {
        isGroup: false,
        content: '/approval/list.html'
    },
    approval_circular: {
        isGroup: false,
        content: '/approval/list.html'
    },
    approval_exec: {
        isGroup: true,
        list: {
            content: '/approval/list.html'
        },
    },
    approval_project_req: {
        isGroup: true,
        approval_project_list: {
            content: '/approval/approval_project_list.html'
        },
    },
    approval_project_recv: {
        isGroup: true,
        approval_project_list: {
            content: '/approval/approval_project_list.html'
        },
    },
    approval_project_reference: {
        isGroup: false,
        content: '/approval/approval_project_list.html'
    },
    approval_project_exec: {
        isGroup: true,
        approval_project_list: {
            content: '/approval/approval_project_list.html'
        },
    },
    grant_req: {
        isGroup: true,
        list: {
            content: '/pages/grant_list.html'
        },
    },
    grant_recv: {
        isGroup: true,
        list: {
            content: '/pages/grant_list.html'
        },
    },
    grant_reference: {
        isGroup: false,
        content: '/pages/grant_list.html'
    },
    // holiday_list: {
    //     isGroup: false,
    //     content: '/pages/holiday_list.html'
    // },
    leave: {
        isGroup: true,
        // leave_request: {
        //     menu_item: 'leave_request',
        //     content: '/pages/leave_request.html'
        // },
        leave_list: {
            menu_item: 'leave_list',
            content: '/pages/leave_list.html'
        },
        leave_calc: {
            menu_item: 'leave_calc',
            content: '/pages/leave_calc.html'
        },
        leave_plan: {
            menu_item: 'leave_plan',
            content: '/pages/leave_plan.html'
        },
        leave_plan_team: {
            menu_item: 'leave_plan_team',
            content: '/pages/leave_plan_team.html'
        },
        // leave_report: {
        //     menu_item: 'leave_report',
        //     content: '/pages/leave_report.html'
        // },
        leave_calendar: {
            menu_item: 'leave_calendar',
            content: '/pages/leave_calendar.html'
        }
    },
    biz_card: { // 법인카드
        isGroup: true,
        biz_card_list: {
            menu_item: 'biz_card_list',
            content: '/pages/biz_card_list.html'
        },
        biz_card_detail: {
            menu_item: 'biz_card_detail',
            content: '/pages/biz_card_detail.html'
        }
    },
    pexpense: { // 개인비용
        isGroup: true,
        pexpense_list: {
            menu_item: 'pexpense_list',
            content: '/pages/pexpense_list.html'
        },
        pexpense_detail: {
            menu_item: 'pexpense_detail',
            content: '/pages/pexpense_detail.html'
        }
    },
    texpense: { // 출장일비
        isGroup: false,
        content: '/pages/texpense.html'
    },
    project_list: {
        isGroup: false,
        content: '/pages/project_list.html'
    },
    project_work_time: {
        isGroup: false,
        content: '/pages/project_work_time.html'
    },
    project: {
        isGroup: true,
        project_basic: {
            menu_item: 'project_basic',
            content: '/pages/project_basic.html'
        },
        project_account: {
            menu_item: 'project_account',
            content: '/pages/project_account.html'
        },
        project_cost: {
            menu_item: 'project_cost',
            content: '/pages/project_cost.html'
        },
        project_team: {
            menu_item: 'project_team',
            content: '/pages/project_team.html'
        },
        project_dailyworker: {
            menu_item: 'project_dailyworker',
            content: '/pages/project_dailyworker.html'
        },
        project_plan: {
            menu_item: 'project_plan',
            content: '/pages/project_plan.html'
        },
        project_files: {
            menu_item: 'project_files',
            content: '/pages/project_files.html'
        },
    },
    work_report: {
        isGroup: true,
        work_report_list: {
            menu_item: 'work_report_list',
            content: '/pages/work_report_list.html'
        },
    },
    // team: {
    //     isGroup: false,
    //     content: '/pages/team.html'
    // },
    department: {
        isGroup: true,
        organization: {
            menu_item: 'organization',
            content: '/pages/organization.html'
        },
        team: {
            menu_item: 'team',
            content: '/pages/team.html'
        },
        team_info: {
            menu_item: 'team_info',
            content: '/pages/team_info.html'
        }
    },
    salary: {
        isGroup: true,
        salary_contract: {
            menu_item: 'salary_contract',
            content: '/pages/salary_contract.html'
        },
        pay_slip: {
            menu_item: 'pay_slip',
            content: '/pages/pay_slip.html'
        }
    },
    certi_list: {
        isGroup: false,
        content: '/pages/certi_list.html'
    },
    conference: {
        isGroup: true,
        conference_room: {
            menu_item: 'conference_room',
            content: '/pages/conference_room.html'
        },
        conference_reserve: {
            menu_item: 'conference_reserve',
            content: '/pages/conference_reserve.html'
        }
    },
    time_report: { // 타임리포트
        isGroup: false,
        content: '/pages/time_report2.html'
    },
    certificates: { // 증명서
        isGroup: false,
        content: '/pages/certificates.html'
    },
    purchase_order: {
        isGroup: true,
        purchase_order_issue: {
            menu_item: 'purchase_order_issue',
            content: '/pages/purchase_order_issue.html'
        },
        purchase_order_list: {
            menu_item: 'purchase_order_list',
            content: '/pages/purchase_order_list.html'
        }
    },
    training: { // 교육/훈련
        isGroup: false,
        content: '/pages/training.html'
    },
    // staggered_hours: { // 시차출퇴근
    //     isGroup: false,
    //     content: '/pages/staggered_hours.html'
    // },
    ojt: {
        isGroup: true,
        ojt_plan_list: {
            menu_item: 'ojt_plan_list',
            content: '/pages/ojt_plan_list.html'
        },
        ojt_report_list: {
            menu_item: 'ojt_report_list',
            content: '/pages/ojt_report_list.html'
        },
    },
    commute: {
        isGroup: true,
        staggered_hours: { // 시차출퇴근
            menu_item: 'staggered_hours',
            content: '/pages/staggered_hours.html'
        },
        commute_record: { // 출퇴근 기록
            menu_item: 'commute_record',
            content: '/pages/commute_record.html'
        },
        commute_record_team: { // 출퇴근 기록 팀원
            menu_item: 'commute_record_team',
            content: '/pages/commute_record_team.html'
        }
    },
    user: {
        isGroup: true,
        user_profile: {
            menu_item: 'user_profile',
            content: '/pages/user_profile.html'
        },
        user_password: {
            menu_item: 'user_password',
            content: '/pages/user_password.html'
        },
        personal_info_edit: {
            menu_item: 'personal_info_edit',
            content: '/pages/personal_info_edit.html'
        },
        employee_info_edit: {
            menu_item: 'employee_info_edit',
            content: '/pages/employee_info_edit.html'
        },
        career_info_edit: {
            menu_item: 'career_info_edit',
            content: '/pages/career_info_edit.html'
        },
        qualifi_info_edit: {
            menu_item: 'qualifi_info_edit',
            content: '/pages/qualifi_info_edit.html'
        },
        document_info_edit: {
            menu_item: 'document_info_edit',
            content: '/pages/document_info_edit.html'
        },
        user_info_personal_edit: {
            menu_item: 'user_info_personal_edit',
            content: '/pages/user_info_personal_edit.html'
        },
        user_info_employee_edit: {
            menu_item: 'user_info_employee_edit',
            content: '/pages/user_info_employee_edit.html'
        },
        user_info_career_edit: {
            menu_item: 'user_info_career_edit',
            content: '/pages/user_info_career_edit.html'
        },
        user_info_qualification_edit: {
            menu_item: 'user_info_qualification_edit',
            content: '/pages/user_info_qualification_edit.html'
        },
        user_info_document_edit: {
            menu_item: 'user_info_document_edit',
            content: '/pages/user_info_document_edit.html'
        },
    },
    assets: {
        isGroup: true,
        assets_tangible: {
            menu_item: 'assets_tangible',
            content: '/pages/assets_tangible.html'
        },
        assets_software: {
            menu_item: 'assets_software',
            content: '/pages/assets_software.html'
        }
    },
}

function isNullObject(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return true
    }

    if (typeof(obj) === 'string' && obj.length === 0) {
        return true
    }
    return false
}

function cloneObject(src) {
    return JSON.parse(JSON.stringify(src));
}

function isEmptyObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function makeQueryObject(data, type, use) {
    var query = cloneObject(data)
    var order = query.order
    var columns = query.columns

    if (order && order.length > 0) {
        for (var i = order.length - 1; i >= 0; i--) {
            if (!order[i] || !order[i].column) {
                if (!order[i] || !order[i].column_name) {
                    order.splice(i, 1);
                }
                continue;
            }

            var columnValue = order[i].column;
            var column = columns[columnValue];
            if (isNullObject(column)) {
                // return error codes
                order.splice(i, 1);
            } else {
                delete order[i]['column'];
                order[i].column_name = column.data;
            }
        }
    }

    if (!isEmptyObject(mCustomTableSearchValues)) {
        query.search = Object.assign({}, mCustomTableSearchValues);
    }

    delete query['columns']
    return query
}

function setCommaInputBoxes(isBindKeyUp) {
    if (isNullObject(isBindKeyUp)) {
        isBindKeyUp = false;
    }
    $('input[data-type="comma"]').on('keyup', function(e) { // run anytime the value changes
        var code = e.keyCode;

        // TODO : firefox development edition에서는 동작하지 않는다.
        //        브라우저별 특성 적용시 확인 필요
        var position = this.selectionStart;
        var allowed = false;

        // 숫자
        if ((code > 47 && code < 58) || code === 37 || code === 39 ||
            (code > 95 && code < 106) || code === 8 || code === 46 || code === 9 || code === 110 || code === 190 ||
            (code === 189 && position === 0)) {
            allowed = true;
        }

        if (allowed) {
            var value = commaStringToInteger($(this).val());
            $(this).val(numberWithCommas(value));
            return true;
        } else {
            //e.stopPropagation()
            e.preventDefault();
            return false;
        }
    });

    if (isBindKeyUp) {
        $('input[data-type="comma"]').on('keyup', function(e) { // run anytime the value changes
            var value = $(this).val();
            if (value === '-0' || value === '-' || value === '--') {
                // -만 입력된 경우
                $(this).val('-');
            } else {
                value = commaStringToInteger(value);
                $(this).val(numberWithCommas(value));
            }
        });
    }
}

String.format = function() {
    for (var t = arguments[0], e = 1; e < arguments.length; e++) t = t.replace(RegExp("\\{" + (e - 1) + "\\}", "gm"), arguments[e]);
    return t
}

if (!isNullObject(mUserInfo.entry_date)) {
    mUserInfo.entry_date = moment(moment.utc(mUserInfo.entry_date).toDate()).format('YYYY-MM-DD');
}

function gotoLoginPage() {
    window.location.href = window.location.protocol + '//tech.namboo.kr';
}

function signOut() {
    //With jqXHR callbacks .done() and .fail()
    $.post("/api/member/signout", {}).done(function(data, textStatus, jqXHR) {
        if (data.code === 401) {
            swal({
                title: "세션 만료",
                html: "세션이 만료되었습니다. 다시 로그인 하셔야 합니다.",
                type: "error",
                confirmButtonClass: "btn btn-danger",
            }).then(function(e) {
                gotoLoginPage();
            });
            return;
        }
        if (!isNullObject(data.code) && !isNullObject(data.code) && data.code > 299) {
            console.error('/api/member/signout error..... 에러 =', response);
            swal({
                title: "로그아웃 실패",
                html: '(코드 : ' + response.code + ')' + response.msg,
                type: "error",
                confirmButtonClass: "btn btn-danger"
            });
        } else {
            gotoLoginPage();
        }
    }).fail(function(xhr, textStatus, errorThrown) {
        var response = xhr.responseText
        try {
            if (typeof response === 'string') {
                response = JSON.parse(response)
            }
        } catch (e) {
            response = xhr.responseText
        }
        console.info('signout error =', response)

        if (typeof response === 'object' && !isNullObject(response.code)) {
            switch (response.code) {
                case 401: {
                    window.location.href = window.location.protocol + '//' + window.location.host
                    return
                }
                default: {
                    console.log('get contractor error. unknown response code.')
                    break
                }
            }
            swal({
                title: "로그아웃 실패",
                html: '(코드 : ' + response.code + ')' + response.msg,
                type: "error",
                confirmButtonClass: "btn btn-secondary"
            }).then(function(e) {
                gotoLoginPage();
            });
        } else {
            swal({
                title: "로그아웃 실패",
                html: '(코드 : ' + response.code + ')' + response.msg,
                type: "error",
                confirmButtonClass: "btn btn-danger"
            }).then(function(e) {
                gotoLoginPage();
            });
        }
    });
}

var mCustomTableSearchValues = {}

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function numberWithCommas(x) {
    if (isNullObject(x)) {
        return '0'
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function floatWithCommas(x) {
    var str = "";
    if (isNullObject(x)) {
        return '0'
    }

    var temp = x.toString().split(".");
    str += temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (temp.length > 1) {
        str += ".";
        str += temp[1];
    }
    return str;
}

function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function commaStringToInteger(x) {
    if (isNullObject(x)) {
        return 0
    }

    if (typeof x === 'number') {
        return x;
    }
    var value = parseInt(x.replace(/,/g, ''));
    return isNaN(value) ? 0 : value;
}

function commaStringToFloat(x) {
    if (isNullObject(x)) {
        return 0
    }

    if (typeof x === 'number') {
        return x;
    }
    var value = parseFloat(x.replace(/,/g, ''));
    return isNaN(value) ? 0 : value;
}

var mDataTableId = undefined

function setDataTableId(id) {
    mDataTableId = id
}

function setMenuViews(menus) {
    if (isNullObject(menus)) {
        menus = contentPages
    }
    var keys = Object.keys(menus)
    // 메뉴는 최대 3단계 까지만 가능하다.
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] === 'isGroup' || keys[i] === 'use') {
            continue
        }

        var item = menus[keys[i]]

        if (!isNullObject(item.use) && !item.use) {
            if (item.isGroup) {
                $('#menu_group_' + keys[i]).hide() //.addClass('m--hide')
            } else {
                $('#menu_item_' + keys[i]).addClass('hide')
            }
        } else {
            if (item.isGroup) {
                var subKeys = Object.keys(item)
                delete subKeys['isGroup']
                delete subKeys['use']
                if (subKeys.length > 0) {
                    setMenuViews(item)
                }
            }
        }
    }
}

function setSelectedMenuItem() {
    var pageName = location.href.split("/").slice(-1)[0];
    var pageCategory = location.href.split("/").slice(-2)[0];
    pageName = pageName.split('.')[0];
    if (isNullObject(pageName) || pageName === 'index') {
        pageName = 'dashboard'
    }

    // 협력업체 추가 등과 같이 add, edit 시에 menu_item 사용이 관련한 경우
    var pageParams = getUrlParameter('menu');
    if (!isNullObject(pageParams)) {
        pageName = pageParams;
    }

    var menuCategory = Object.keys(contentPages);
    var group = getUrlParameter('grp');
    var subGroup = getUrlParameter('sgrp');
    var found = false;

    if (pageCategory === 'approval') {
        if (pageName === 'add' || pageName === 'view') {
            pageName = 'approval_' + pageName;
        } else if (pageName === 'list') {
            var status = getUrlParameter('status');

            if (mPageTypeParam === 'execute') {
                pageName = 'approval_exec';
                if (status === 'W') {
                    pageName += '_waiting';
                } else if (status === 'C') {
                    pageName += '_completed';
                }
            } else if (mPageTypeParam === 'receive') {
                pageName = 'approval_recv';
                if (status === 'P') {
                    if (mPageTurnParam === '1') {
                        pageName += '_processing_myturn';
                    } else {
                        pageName += '_processing';
                    }
                } else if (status === 'A') {
                    pageName += '_approved';
                } else if (status === 'R') {
                    pageName += '_returned';
                }
            } else if (mPageTypeParam === 'request') {
                pageName = 'approval_req';
                if (status === 'P') {
                    pageName += '_processing';
                } else if (status === 'A') {
                    pageName += '_approved';
                } else if (status === 'R') {
                    pageName += '_returned';
                } else if (status === 'T') {
                    pageName += '_temp';
                }
            } else if (mPageTypeParam === 'reference') {
                pageName = 'approval_' + mPageTypeParam;
            } else if (mPageTypeParam === 'circular') {
                pageName = 'approval_' + mPageTypeParam;
            }
        } else if (pageName === 'approval_project_list' || pageName === 'approval_project_view') {
            var status = getUrlParameter('status');

            if (mPageTypeParam === 'execute') {
                pageName = 'approval_project_exec';
                if (status === 'W') {
                    pageName += '_waiting';
                } else if (status === 'C') {
                    pageName += '_completed';
                }
            } else if (mPageTypeParam === 'receive') {
                pageName = 'approval_project_recv';
                if (status === 'P') {
                    if (mPageTurnParam === '1') {
                        pageName += '_processing_myturn';
                    } else {
                        pageName += '_processing';
                    }
                } else if (status === 'A') {
                    pageName += '_approved';
                } else if (status === 'R') {
                    pageName += '_returned';
                }
            } else if (mPageTypeParam === 'request') {
                pageName = 'approval_project_req';
                if (status === 'P') {
                    pageName += '_processing';
                } else if (status === 'A') {
                    pageName += '_approved';
                } else if (status === 'R') {
                    pageName += '_returned';
                } else if (status === 'T') {
                    pageName += '_temp';
                }
            } else if (mPageTypeParam === 'reference') {
                pageName = 'approval_project_' + mPageTypeParam;
            }
        }
    } else if (pageCategory === 'pages') {
        if (pageName === 'grant_list') {
            var status = getUrlParameter('status');

            if (mPageTypeParam === 'receive') {
                pageName = 'grant_recv';
                if (status === '0') {
                    if (mPageTurnParam === '1') {
                        pageName += '_processing_myturn';
                    } else {
                        pageName += '_processing';
                    }
                } else if (status === '1') {
                    pageName += '_approved';
                } else if (status === '2') {
                    pageName += '_returned';
                }
            } else if (mPageTypeParam === 'request') {
                pageName = 'grant_req';
                if (status === '0') {
                    pageName += '_processing';
                } else if (status === '1') {
                    pageName += '_approved';
                } else if (status === '2') {
                    pageName += '_returned';
                }
            } else if (mPageTypeParam === 'reference') {
                pageName = 'grant_' + mPageTypeParam;
            }
        }
    }

    if (!isNullObject(group)) {
        var groupPages = contentPages[group];
        if (isNullObject(groupPages)) {
            console.error('main-menu >> Can not found group =', group);
            return;
        }

        if (!groupPages.isGroup) {
            $('#menu_item_' + pageName).addClass('active');
        } else {
            $('#menu_group_' + group).addClass('open');

            if (!isNullObject(subGroup)) {
                var sub = groupPages[subGroup];
                if (isNullObject(sub)) {
                    console.error('aside-menu >> Can not found sub-group =', subGroup);
                    return;
                }
                $('#menu_group_' + subGroup).addClass('open');

                var pageContents = sub[pageName];
                var subName = undefined;

                if (pageName.startsWith('approval_') && pageName !== 'approval_add' && pageName !== 'approval_reference' && pageName !== 'approval_circular' && pageName !== 'approval_view') {
                    subName = pageName;
                } else {
                    subName = pageContents.menu_item;
                }

                var type = getUrlParameter('type');

                if (!isNullObject(subName)) {
                    $('#menu_item_' + subName).addClass('active')
                } else {
                    $('#menu_item_' + pageName).addClass('active')
                }
            } else {
                var pageContents = groupPages[pageName];
                // var subName = pageContents.menu_item;
                if (pageName.startsWith('approval_') && pageName !== 'approval_add' && pageName !== 'approval_reference' && pageName !== 'approval_circular' && pageName !== 'approval_view') {
                    subName = pageName;
                } else if (pageName.startsWith('grant_')) {
                    subName = pageName;
                } else {
                    subName = pageContents.menu_item;
                }

                var type = getUrlParameter('type');

                if (!isNullObject(subName)) {
                    $('#menu_item_' + subName).addClass('active')
                } else {
                    $('#menu_item_' + pageName).addClass('active')
                }
            }
        }
    } else {
        for (var i = 0; i < menuCategory.length; i++) {
            if (!contentPages[menuCategory[i]].isGroup) {
                if (pageName === menuCategory[i]) {
                    $('#menu_item_' + pageName).addClass('active')
                    break
                }

                continue;
            }

            if (!isNullObject(group) && menuCategory[i] !== group) {
                continue;
            }

            var categoryPages = Object.keys(contentPages[menuCategory[i]]);
            for (var j = 0; j < categoryPages.length; j++) {
                if (categoryPages[j] === 'isGroup') {
                    continue;
                }
                var submenu = contentPages[menuCategory[i]][categoryPages[j]];

                if (!isNullObject(submenu.isGroup) && submenu.isGroup) {
                    if (!isNullObject(submenu[pageName])) {
                        found = true;
                        submenu = submenu[pageName];
                        $('#menu_group_' + menuCategory[i]).addClass('open')
                        $('#menu_group_' + categoryPages[j]).addClass('open')

                        var subName = undefined;
                        subName = submenu.menu_item;

                        var type = getUrlParameter('type');

                        if (!isNullObject(subName)) {
                            $('#menu_item_' + subName).addClass('active')
                        } else {
                            $('#menu_item_' + pageName).addClass('active')
                        }
                    }
                } else {
                    var subName = undefined;
                    if (pageName.startsWith('approval_') && pageName !== 'approval_add') {
                        subName = pageName;
                    } else {
                        subName = submenu.menu_item;
                    }

                    if (pageName === categoryPages[j]) {
                        found = true
                        $('#menu_group_' + menuCategory[i]).addClass('open');

                        var type = getUrlParameter('type');

                        if (!isNullObject(subName)) {
                            $('#menu_item_' + subName).addClass('active')
                        } else {
                            $('#menu_item_' + pageName).addClass('active')
                        }
                        break
                    }
                }
            }
            if (found) {
                break
            }
        }
    }
}

function getPageContents(group, subGroup, pageName, params) {
    var hasSubGroup = !isNullObject(subGroup);
    var page = undefined;
    if (isNullObject(contentPages[group])) {
        console.warn('>> isNullObject(contentPages[group]');
        return;
    }

    var currPageName = location.href.split("/").slice(-1)[0];
    currPageName = currPageName.split('.')[0];
    if (isNullObject(currPageName) || currPageName === 'index') {
        currPageName = 'dashboard'
    }
    if (isNullObject(contentPages[group])) {
        console.error('** Menu click group [', group, '] not found !!!');
        return;
    }

    try {
        if (contentPages[group].isGroup) {
            if (!isNullObject(subGroup) && !isNullObject(contentPages[group][subGroup])) {
                var subInfo = contentPages[group][subGroup]
                if (isNullObject(subInfo.isGroup) || subInfo.isGroup === false) {
                    // something wrong
                } else {
                    if (!isNullObject(contentPages[group][subGroup][pageName])) {
                        page = contentPages[group][subGroup][pageName].content
                    }
                }
            } else {
                if (!isNullObject(contentPages[group][pageName])) {
                    page = contentPages[group][pageName].content
                }
            }
        } else {
            page = contentPages[group].content
        }
    } catch (e) {}

    if (isNullObject(page)) {
        console.warn('>> page.. is null')
        return
    }

    page = window.location.protocol + '//' + window.location.host + page;
    page += '?grp=' + group;
    if (!isNullObject(subGroup)) {
        page += '&sgrp=' + subGroup;
    }

    if (!isNullObject(params)) {
        // page += '?'
        var keys = Object.keys(params)
        for (var i = 0; i < keys.length; i++) {
            page += '&'
            page += keys[i] + '=' + (!isNullObject(params[keys[i]]) ? params[keys[i]] : '')
        }
    }
    window.location.href = page
}

var sideMenu = {};
setPreSideMenuToggle(); // 사이드메뉴 토글 - 추가 이한 210929

function setPreSideMenuToggle() {
    var preSetToggleState = undefined;
    var navbarHeaderToggler = $('#menu_toggler');

    if (isSupportLocalStorage()) {
        try {
            preSetToggleState = JSON.parse(localStorage.getItem('list_pdefopt_toggler'));
        } catch (e) {
            console.error(e);
            preSetToggleState = undefined;
        }
    }

    // 추후 작업하자 - 이한 210930
    // if (!isNullObject(preSetToggleState) && preSetToggleState.toggleState) {
    //     console.log('$.app.menu', $.app.menu)
    //     $.app.menu.collapse();
    // }
}

var mCurrentPaymentMonth = undefined;

function getCurrentPaymentMonth(paymentDate) {
    var todayMoment = moment();

    var obj = {
        day: todayMoment.date(),
        month: todayMoment.month() + 1,
        year: todayMoment.year(),
        endOfMonth: todayMoment.endOf('month'),
    };

    // TODO : 법인별로 다른 경우 payment_date_type을 비교해서
    //      각 법인볊로 처리해야 한다.
    if (isNullObject(paymentDate) || paymentDate > obj.endOfMonth) {
        paymentDate = obj.endOfMonth;
    }

    if (paymentDate < 20) {
        if (obj.day <= paymentDate) {
            // 이전 달에 대해서 생성
            if (obj.month === 1) {
                obj.month = 12;
                obj.year -= 1;
            } else {
                obj.month -= 1;
            }
        }
    } else {
        if (obj.day > paymentDate) {
            // 이전 달에 대해서 생성
            if (obj.month === 12) {
                obj.month = 1;
                obj.year += 1;
            } else {
                obj.month += 1;
            }
        }
    }
    obj.paymentMonth = obj.year + '-' + (obj.month < 10 ? '0' : '') + obj.month;

    return obj.paymentMonth;
    // return obj;
}

function gotoPexpenseDetailPage(month) {
    getPageContents('pexpense', null, 'pexpense_detail', {
        month: month
    });
}

function gotoBizCardDetailPage(month) {
    getPageContents('biz_card', null, 'biz_card_detail', {
        month: month
    });
}

function uploadFiles(url, data, successHandler, errorHandler) {
    var ajaxOption = {
        url: url,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        data: data, // Setting the data attribute of ajax with file_data
        type: 'post',
        success: function(response, textStatus, xhr) {
            console.log(response)
            if (response.code === 401) {
                swal({
                    title: "세션 만료",
                    html: "세션이 만료되었습니다. 다시 로그인 하셔야 합니다.",
                    type: "error",
                    confirmButtonClass: "btn btn-danger",
                }).then(function(e) {
                    gotoLoginPage();
                });
                return;
            }

            if (response.code === 200) {
                swal({
                    title: "파일업로드 성공",
                    html: '파일이 성공적으로 업로드 되었습니다.',
                    type: "success",
                    confirmButtonClass: "btn btn-success"
                });
            } else {
                swal({
                    title: "파일업로드 실패",
                    html: '코드(' + response.code + ')' + response.msg,
                    type: "error",
                    confirmButtonClass: "btn btn-danger"
                });
            }
        },
        error: function(xhr, error, thrown) {
            swal({
                title: "파일업로드 실패",
                html: '오류 메시지: ' + xhr.responseText,
                type: "error",
                confirmButtonClass: "btn btn-danger"
            });
        }
    };

    if (!isNullObject(successHandler) && typeof successHandler === 'function') {
        ajaxOption.success = successHandler;
    }
    if (!isNullObject(errorHandler) && typeof errorHandler === 'function') {
        ajaxOption.error = errorHandler;
    }

    $.ajax(ajaxOption);
}

function getPdfjsFileView(file_path) {
    var pdfViewTemplate = '<iframe frameborder="0" src="/libs/pdf.js/web/viewer.html?file={0}" style="display:block; width:100%; height:600px;"></iframe>';

    var path = /*window.location.protocol + '//' + window.location.host +*/ file_path;
    return String.format(pdfViewTemplate, path);
}

/**
 * Validate를 대체하기 위한 내용들
 * @type {Object}
 */
// var defaultClass = {
//     errorClass: "input-error",
//     pendingClass: "input-pending",
//     validClass: "input-valid",
//     errorElement: "input-label",
// };

var defaultClass = {
    errorClass: "is-invalid",
    validClass: "is-valid",
};

function highlightFormElement(element, errorClass, validClass) {
    if (isNullObject(errorClass)) {
        errorClass = defaultClass.errorClass;
    }
    if (isNullObject(validClass)) {
        validClass = defaultClass.validClass;
    }
    if (element.type === "radio") {
        this.findByName(element.name).addClass(errorClass).removeClass(validClass);
    } else {
        $(element).addClass(errorClass).removeClass(validClass);
    }
}

function unhighlightFormElement(element, errorClass, validClass) {
    if (isNullObject(errorClass)) {
        errorClass = defaultClass.errorClass;
    }
    if (isNullObject(validClass)) {
        validClass = defaultClass.validClass;
    }
    if (element.type === "radio") {
        this.findByName(element.name).removeClass(errorClass).addClass(validClass);
    } else {
        $(element).removeClass(errorClass).addClass(validClass);
    }
}

function nonehighlightFormElement(element, errorClass, validClass) { // 아무것도 표시되지 않는 상태 - 추가 이한 211005
    if (isNullObject(errorClass)) {
        errorClass = defaultClass.errorClass;
    }
    if (isNullObject(validClass)) {
        validClass = defaultClass.validClass;
    }
    if (element.type === "radio") {
        this.findByName(element.name).removeClass(errorClass).removeClass(validClass);
    } else {
        $(element).removeClass(errorClass).removeClass(validClass).removeClass('select-error').removeClass('select-valid');
    }
}

function checkValidateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

function checkValidateMobileNumber(phonenum) {
    var regPhone = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g;
    return regPhone.test(phonenum)
}

function checkValidatePassword(str, min, max) {
    if (min === null || typeof min === 'undefined') {
        min = 6
    }
    if (max === null || typeof max === 'undefined') {
        max = 16
    }

    var regexp = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{' + min + ',' + max + '}$'
    var check = new RegExp(regexp)

    // 한글 포함시.
    for (var i = 0; i < str.length; i++) {
        if (((str.charCodeAt(i) > 0x3130 && str.charCodeAt(i) < 0x318F) || (str.charCodeAt(i) >= 0xAC00 && str.charCodeAt(i) <= 0xD7A3))) {
            return false; // 한글 포함이면 false 반환
        }
    }

    if (!check.test(str)) {
        return false;
    }

    return true;
}

function getWorkerNames(cb, bizNo, query) {
    var url = '/api/member/names';
    if (!isNullObject(bizNo)) {
        url += '/' + bizNo;
    }
    $.ajax({
        url: url,
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        data: query,
        success: function(response, textStatus, xhr) {
            if (response.code === 401) {
                swal({
                    title: "세션 만료",
                    html: "세션이 만료되었습니다. 다시 로그인 하셔야 합니다.",
                    type: "error",
                    confirmButtonClass: "btn btn-danger",
                }).then(function(e) {
                    gotoLoginPage();
                });
                return;
            }
            if (!isNullObject(response.code) && response.code !== 200) {
                response.data = []
            }

            if (!isNullObject(cb)) {
                cb(response.data, response.code, response.msg)
            }
        },
        error: function(xhr, error, thrown) {
            var response = xhr.responseText
            console.info('getBankNames() error =', response)
            cb([], xhr.status, response)
        }
    })
}

// 페이지 전환시 체크한다.

getApprovalInitalIndex();
getApprovalNewIndex();


var alarmmessage = $('.alarm-message.hidden');
var activeAlim = $('.alarm-active.hidden');
var disactiveAlime = $('.alarm-disactive');
activeAlim.hide();
disactiveAlime.hide();

var varpreviusdataformessage = 0;
var varpreviusdatafromessageproject = 0;
var varpreviusdatafromessagerec = 0;
var varpreviusdataforalarm = localStorage.getItem('currentvalforalirm');


if (varpreviusdataforalarm === null) {
    varpreviusdataforalarm = 0;
}


//실시간으로 데이터 처리
setInterval(function() {
    getApprovalNewIndex();
}, 1000)

function getApprovalInitalIndex(cb, workerNo) {
    // varpreviusdataforalarm = localStorage.getItem('currentvalforalirm');
    if (isNullObject(workerNo)) {
        workerNo = mUserInfo.worker_no;
    }
    var url = '/api/approval/new/' + workerNo

    $.ajax({
        url: url,
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function(response, textStatus, xhr) {
            if (response.code === 401) {
                swal({
                    title: "세션 만료",
                    html: "세션이 만료되었습니다. 다시 로그인 하셔야 합니다.",
                    type: "error",
                    confirmButtonClass: "btn btn-danger",
                }).then(function(e) {
                    gotoLoginPage();
                });
                return;
            }
            if (!isNullObject(response.code) && response.code !== 200) {
                response.data = []
            }

            if (!isNullObject(cb)) {
                cb(response.data, response.code, response.msg);
            }


            var countData = response.data
            var countNoReq = countData.requestCount
            var countNoRec = countData.receiveCount
            var countNoExc = countData.executeCount
            var countNoGrant = countData.grantCount

            varpreviusdatafromessageproject = countNoExc;
            varpreviusdatafromessagerec = countNoRec;
            varpreviusdataformessage = countNoGrant;

            if (countNoReq > 0) { // 결재상신함 진행
                $('#getidsss').show();
                $('#count_badge_approval_req').show();
                $('#count_badge_approval_req_num').html(countNoReq).show();
                $('#count_badge_approval_req2').show();
                $('#count_badge_approval_req_num2').html(countNoReq).show();
            } else {
                $('#getidsss').hide();
                $('#count_badge_approval_req').hide();
                $('#count_badge_approval_req_num').hide();
                $('#count_badge_approval_req2').hide();
                $('#count_badge_approval_req_num2').hide();
            }

            if (countNoRec > 0) { // 결재수신함 진행
                $('#getidsss').show();
                $('#count_badge_approval_rec').show();
                $('#count_badge_approval_rec_num').html(countNoRec).show();
                $('#count_badge_approval_rec2').show();
                $('#count_badge_approval_rec_num2').html(countNoRec).show();
            } else {
                $('#getidsss').hide();
                $('#count_badge_approval_rec').hide();
                $('#count_badge_approval_rec_num').hide();
                $('#count_badge_approval_rec2').hide();
                $('#count_badge_approval_rec_num2').hide();
            }

            if (countNoExc > 0) { // 시행함 대기
                $('#getidsss').show();
                $('#count_badge_approval_exc').show();
                $('#count_badge_approval_exc_num').html(countNoExc).show();
                $('#count_badge_approval_exc2').show();
                $('#count_badge_approval_exc_num2').html(countNoExc).show();
            } else {
                $('#getidsss').hide();
                $('#count_badge_approval_exc').hide();
                $('#count_badge_approval_exc_num').hide();
                $('#count_badge_approval_exc2').hide();
                $('#count_badge_approval_exc_num2').hide();
            }

            if (countNoGrant > 0) { // 신청수신 대기
                $('#count_badge_grant').show();
                $('#getidsss').show();
                $('#count_badge_grant_num').html(countNoGrant).show();
                $('#count_badge_grant2').show();
                $('#count_badge_grant_num2').html(countNoGrant).show();
            } else {
                $('#getidsss').hide();
                $('#count_badge_grant').hide();
                $('#count_badge_grant_num').hide();
                $('#count_badge_grant2').hide();
                $('#count_badge_grant_num2').hide();
            }

        },
        error: function(xhr, error, thrown) {
            var response = xhr.responseText
            console.info('getApprovalNewIndex() error =', response)
            cb([], xhr.status, response)
        }
    })
}

var alldatas = 0;


function getApprovalNewIndex(cb, workerNo) {
    varpreviusdataforalarm = localStorage.getItem('currentvalforalirm');

    if (isNullObject(workerNo)) {
        workerNo = mUserInfo.worker_no;
    }
    var url = '/api/approval/new/' + workerNo

    $.ajax({
        url: url,
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function(response, textStatus, xhr) {
            if (response.code === 401) {
                swal({
                    title: "세션 만료",
                    html: "세션이 만료되었습니다. 다시 로그인 하셔야 합니다.",
                    type: "error",
                    confirmButtonClass: "btn btn-danger",
                }).then(function(e) {
                    gotoLoginPage();
                });
                return;
            }
            if (!isNullObject(response.code) && response.code !== 200) {
                response.data = []
            }

            if (!isNullObject(cb)) {
                cb(response.data, response.code, response.msg);
            }




            var countData = response.data
            var countNoReq = countData.requestCount
            var countNoRec = countData.receiveCount
            var countNoExc = countData.executeCount
            var countNoGrant = countData.grantCount

            // 유가이 추가  2023-06-13
            if (countNoRec === 0) {
                $('#receivecnt').text('');
            } else {
                $('#receivecnt').text(countNoRec);
            }

            if (countNoGrant === 0) {
                $('#grantcount').text('');
            } else {
                $('#grantcount').text(countNoGrant);
            }

            if (countNoExc === 0) {
                $('#executecnt').text('');
            } else {
                $('#executecnt').text(countNoExc);
            }

            alldatas = countNoGrant + countNoExc + countNoRec;
            activeAlim.removeClass('hidden');

            if (countNoGrant === 0 && countNoRec === 0 && countNoExc === 0) {
                localStorage.setItem('currentvalforalirm', 0);
            }

            if (countNoGrant === 0 && countNoRec === 0 && countNoExc === 0) {
                $('.count-alarm').text('');
            } else {
                $('.count-alarm').text(alldatas);
            }

            //5초 동안 알람이 나타나고 사라짐
            if (countNoGrant > varpreviusdataformessage || countNoExc > varpreviusdatafromessageproject || countNoRec > varpreviusdatafromessagerec) {
                alarmmessage.removeClass('hidden');
                setTimeout(function() {
                    alarmmessage.addClass('hidden');
                    varpreviusdataformessage = countNoGrant;
                    varpreviusdatafromessagerec = countNoRec;
                    varpreviusdatafromessageproject = countNoExc;
                }, 5000);
            }

            //값이 증가할 때 알림을 표시
            if (alldatas > varpreviusdataforalarm) {
                activeAlim.removeClass('hidden').show();
                disactiveAlime.hide();
            } else {
                activeAlim.hide().addClass('hidden');
                disactiveAlime.show();
            }


            //사용자가 알림을 클릭했을 때 알림을 멈추도록 수정
            function updateLocalStorage() {
                localStorage.setItem('currentvalforalirm', alldatas);
            }

            disactiveAlime.click(updateLocalStorage);
            activeAlim.click(updateLocalStorage);






            if (countNoReq > 0) { // 결재상신함 진행
                $('#getidsss').show();
                $('#count_badge_approval_req').show();
                $('#count_badge_approval_req_num').html(countNoReq).show();
                $('#count_badge_approval_req2').show();
                $('#count_badge_approval_req_num2').html(countNoReq).show();
            } else {
                $('#getidsss').hide();
                $('#count_badge_approval_req').hide();
                $('#count_badge_approval_req_num').hide();
                $('#count_badge_approval_req2').hide();
                $('#count_badge_approval_req_num2').hide();
            }

            if (countNoRec > 0) { // 결재수신함 진행
                $('#getidsss').show();
                $('#count_badge_approval_rec').show();
                $('#count_badge_approval_rec_num').html(countNoRec).show();
                $('#count_badge_approval_rec2').show();
                $('#count_badge_approval_rec_num2').html(countNoRec).show();
            } else {
                $('#getidsss').hide();
                $('#count_badge_approval_rec').hide();
                $('#count_badge_approval_rec_num').hide();
                $('#count_badge_approval_rec2').hide();
                $('#count_badge_approval_rec_num2').hide();
            }

            if (countNoExc > 0) { // 시행함 대기
                $('#getidsss').show();
                $('#count_badge_approval_exc').show();
                $('#count_badge_approval_exc_num').html(countNoExc).show();
                $('#count_badge_approval_exc2').show();
                $('#count_badge_approval_exc_num2').html(countNoExc).show();
            } else {
                $('#getidsss').hide();
                $('#count_badge_approval_exc').hide();
                $('#count_badge_approval_exc_num').hide();
                $('#count_badge_approval_exc2').hide();
                $('#count_badge_approval_exc_num2').hide();
            }

            if (countNoGrant > 0) { // 신청수신 대기
                $('#count_badge_grant').show();
                $('#getidsss').show();
                $('#count_badge_grant_num').html(countNoGrant).show();
                $('#count_badge_grant2').show();
                $('#count_badge_grant_num2').html(countNoGrant).show();
            } else {
                $('#getidsss').hide();
                $('#count_badge_grant').hide();
                $('#count_badge_grant_num').hide();
                $('#count_badge_grant2').hide();
                $('#count_badge_grant_num2').hide();
            }
        },
        error: function(xhr, error, thrown) {
            var response = xhr.responseText
            console.info('getApprovalNewIndex() error =', response)
            cb([], xhr.status, response)
        }
    })
}

// 페이지 전환시 체크한다.
getApprovalProjectNewIndex();

function getApprovalProjectNewIndex(cb, workerNo) {
    if (isNullObject(workerNo)) {
        workerNo = mUserInfo.worker_no;
    }
    var url = '/api/approval/approval_project_list/new/' + workerNo

    $.ajax({
        url: url,
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function(response, textStatus, xhr) {
            if (response.code === 401) {
                swal({
                    title: "세션 만료",
                    html: "세션이 만료되었습니다. 다시 로그인 하셔야 합니다.",
                    type: "error",
                    confirmButtonClass: "btn btn-danger",
                }).then(function(e) {
                    gotoLoginPage();
                });
                return;
            }
            if (!isNullObject(response.code) && response.code !== 200) {
                response.data = []
            }

            if (!isNullObject(cb)) {
                cb(response.data, response.code, response.msg);
            }

            var countData = response.data
            var countNoReq = countData.requestCount
            var countNoRec = countData.receiveCount
            var countNoExc = countData.executeCount

            // var countNoGrant = countData.grantCount

            if (countNoReq > 0) { // 결재상신함 진행
                $('#count_badge_approval_project_req').show();
                $('#count_badge_approval_project_req_num').html(countNoReq).show();
                $('#count_badge_approval_project_req2').show();
                $('#count_badge_approval_project_req_num2').html(countNoReq).show();
            } else {
                $('#count_badge_approval_project_req').hide();
                $('#count_badge_approval_project_req_num').hide();
                $('#count_badge_approval_project_req2').hide();
                $('#count_badge_approval_project_req_num2').hide();
            }

            if (countNoRec > 0) { // 결재수신함 진행
                $('#count_badge_approval_project_rec').show();
                $('#count_badge_approval_project_rec_num').html(countNoRec).show();
                $('#count_badge_approval_project_rec2').show();
                $('#count_badge_approval_project_rec_num2').html(countNoRec).show();
            } else {
                $('#count_badge_approval_project_rec').hide();
                $('#count_badge_approval_project_rec_num').hide();
                $('#count_badge_approval_project_rec2').hide();
                $('#count_badge_approval_project_rec_num2').hide();
            }

            if (countNoExc > 0) { // 시행함 대기
                $('#count_badge_approval_project_exc').show();
                $('#count_badge_approval_project_exc_num').html(countNoExc).show();
                $('#count_badge_approval_project_exc2').show();
                $('#count_badge_approval_project_exc_num2').html(countNoExc).show();
            } else {
                $('#count_badge_approval_project_exc').hide();
                $('#count_badge_approval_project_exc_num').hide();
                $('#count_badge_approval_project_exc2').hide();
                $('#count_badge_approval_project_exc_num2').hide();
            }

            // if (countNoGrant > 0) { // 신청수신 대기
            //     $('#count_badge_grant').show();
            //     $('#count_badge_grant_num').html(countNoGrant).show();
            // } else {
            //     $('#count_badge_grant').hide();
            //     $('#count_badge_grant_num').hide();
            // }
        },
        error: function(xhr, error, thrown) {
            var response = xhr.responseText
            console.info('getApprovalProjectNewIndex() error =', response)
            cb([], xhr.status, response)
        }
    })
}

/**
 * MIS 페이지 공통
 * @param  {[type]} window [description]
 * @return {[type]}        [description]
 */
if (window.location.pathname.startsWith('/pages/') || window.location.pathname.startsWith('/')) {
    setMenuViews();
    setSelectedMenuItem();
}

function showDashboard(workerNo) {
    getPageContents('dashboard', null, null);
}

function showMyProject() {
    getPageContents('project_list', null, null);
}

function userPasswordEdit() {
    getPageContents('user', null, 'user_password');
}

function userProfileEdit(workerNo) {
    getPageContents('user', null, 'user_profile');
}

function userSalaryContract(workerNo) {
    getPageContents('salary', null, 'salary_contract');
}

function userCertiCareer(workerNo) {
    getPageContents('certi_list', null, null);
}

// 기본으로 설정 가능
// $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

function showProcessingPage(msg) {
    $.blockUI({
        message: isNullObject(msg) ? '<div class="spinner-border text-primary mr-1" role="status"><span class="sr-only">Loading...</span></div> 데이터를 불러 오는 중입니다' : msg,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    })
}

function stopProcessingPage() {
    $.unblockUI();
}

function setDisableFormInput(name, type) {
    if (isNullObject(type)) {
        type = 'input';
    }
    if (type === 'radio') {
        $(name + ':not(:checked)').attr('disabled', 'true');
    } else if (type === 'select') {
        $(name + ':not(:selected)').attr('disabled', 'true');
    } else {
        $(name).attr('disabled', 'true');
    }
    mDisabledFormInputs[name] = type;
}

function setEnableFormInput(name, type, isRealRemove) {
    if (isNullObject(type)) {
        type = 'input';
    }
    if (isNullObject(isRealRemove)) {
        isRealRemove = false;
    }
    if (type === 'radio') {
        $(name + ':not(:checked)').removeAttr('disabled');
    } else if (type === 'select') {
        $(name + ':not(:selected)').removeAttr('disabled');
    } else {
        $(name).removeAttr('disabled');
    }

    if (isRealRemove) {
        delete mDisabledFormInputs[name];
    }
}

function goBack() {
    var from = document.referrer;
    var prevName = from.split('?')[0];
    prevName = prevName.split("/").slice(-1)[0];
    prevName = prevName.split('.')[0];

    if (!prevName || prevName === 'index') {
        getPageContents('dashboard', null, null);
    } else {
        window.history.back();
    }
}

function isExplorerBrowser() {
    var word;
    var agent = navigator.userAgent.toLowerCase();

    // IE old version ( IE 10 or Lower )
    if (navigator.appName == "Microsoft Internet Explorer") {
        word = "msie ";
    }

    // IE 11
    else if (agent.search("trident") > -1) {
        word = "trident/.*rv:";
    }

    // Microsoft Edge
    else if (agent.search("edge/") > -1) {
        word = "edge/";
    }

    // 그외, IE가 아니라면 ( If it's not IE or Edge )
    else {
        return -1;
    }

    var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
    if (reg.exec(agent) != null) {
        return parseFloat(RegExp.$1 + RegExp.$2);
    }

    return -1;
}

function makeCorpName(name, corp_type, corp_type_pos) {
    if (isNullObject(name)) {
        throw new Error('No corp name!!!');
    }
    // corp_name 다시 만들기
    var type = '';
    switch (corp_type) {
        case '0':
            type = '(주)';
            break;
        case '1':
            type = '(유)';
            break;
        case '2':
            type = '유한책임회사';
            break;
        case '3':
            type = '합자회사';
            break;
        case '4':
            type = '합명회사';
            break;
        case '5':
            type = '개인';
            break;
        case '6':
            type = '외국인';
            break;
        case '7':
            type = '(사)';
            break;
        case '8':
            type = '(재)';
            break;
        case '9':
            type = '특수법인';
            break;
            // '남부이엔지 주식회사 진도지점' 처럼 중간에 주식회사가 들어가는 경우 - '없음'으로 처리 - case 10 추가
        case '10':
            type = '';
            break;
    }

    if (corp_type_pos === '1') {
        if (type.length > 0) {
            name += ' ' + type;
        }
    } else {
        if (type.length > 0) {
            name = type + ' ' + name;
        }
    }

    return name;
}

// 엑셀 출력시 사용하는 함수들
function getTextLength(str) {
    var len = 0;
    if (!str) {
        return 0;
    }
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
            len++;
        }
        len++;
    }
    return len;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

/**
 * main, middle, small_class로 구분된 expense type에 공통으로 사용된다.
 * @param {[type]} response [description]
 */
var mCommonExpenseTypes = {
    sales: {
        main_class: [],
        middle_class: [],
        small_class: []
    },
    purchase: {
        main_class: [],
        middle_class: [],
        small_class: []
    },
    sgexpense: {
        main_class: [],
        middle_class: [],
        small_class: []
    },
    sgincome: {
        main_class: [],
        middle_class: [],
        small_class: []
    }
};

var mSelectedExpenseTypes = {};
var mAccountingEtaxItemEditMode = false;

/**
 * Accounting 정보(sales, expense, purchase)를 추가 또는 수정할때 필요한 select box 그룹
 * mDetailItem 이 있는지에 따라 초기 선택값이 변화한다.
 * @param {[type]} response        [description]
 * @param {[type]} code            [description]
 * @param {[type]} msg             [description]
 * @param {Number} [enableClass=0] [description]
 * @param {Boolean} isRefresh      [expensTypes를 초기화 할 것인지 - 보통 페이지 불릴때 호출]
 */
function setDefaultExpenseTypes(response, code, msg, enableClass, isRefresh, selectedType, formId) {
    if (!formId) {
        formId = '';
    } else {
        formId = formId.trim() + ' ';
    }
    if (isNullObject(enableClass)) {
        enableClass = 0;
    }
    if (code !== 200) {
        swal({
            title: "항목 검색 실패",
            html: "매출 및 매입의 항목 검색에 실패했습니다. <br>관리자에게 문의하세요.",
            type: "error",
            confirmButtonClass: "btn btn-danger"
        }).then(function(e) {
            goBack();
        })
        return;
    }

    var pageName = location.href.split("/").slice(-1)[0];
    pageName = pageName.split('.')[0];

    if (isRefresh) {
        mCommonExpenseTypes = response;
        if (mPageTypeParam === 'sales') {
            mSelectedExpenseTypes = cloneObject(mCommonExpenseTypes.sales);
        } else if (mPageTypeParam === 'sgexpense' && !selectedType) {
            mSelectedExpenseTypes = cloneObject(mCommonExpenseTypes.sgexpense);
        } else if (mPageTypeParam === 'sgincome') {
            mSelectedExpenseTypes = cloneObject(mCommonExpenseTypes.sgincome);
            // 전도금 이월은 제거한다.
            for (var i = mSelectedExpenseTypes.middle_class.length - 1; i >= 0; i--) {
                if (mSelectedExpenseTypes.middle_class[i].code === 4100000003) {
                    mSelectedExpenseTypes.middle_class.splice(i, 1);
                }
            }
        } else {
            // 매입과 경비는 서로 변동될 수 있다.
            // main_class에 매입과 경비가 모두 포함된다.
            var purchases = cloneObject(mCommonExpenseTypes.purchase);

            if (mAccountingEtaxItemEditMode) {
                mSelectedExpenseTypes = {};
                if (mCommonExpenseTypes.sgexpense.main_class &&
                    Array.isArray(mCommonExpenseTypes.sgexpense.main_class)) {
                    mSelectedExpenseTypes.main_class = purchases.main_class.concat(mCommonExpenseTypes.sgexpense.main_class);
                }
                if (mCommonExpenseTypes.sgexpense.middle_class &&
                    Array.isArray(mCommonExpenseTypes.sgexpense.middle_class)) {
                    mSelectedExpenseTypes.middle_class = purchases.middle_class.concat(mCommonExpenseTypes.sgexpense.middle_class);
                }
                if (mCommonExpenseTypes.sgexpense.small_class &&
                    Array.isArray(mCommonExpenseTypes.sgexpense.small_class)) {
                    mSelectedExpenseTypes.small_class = purchases.small_class.concat(mCommonExpenseTypes.sgexpense.small_class);
                }
            } else {
                mSelectedExpenseTypes = purchases;
            }
        }
    }
    if (selectedType) {
        mCommonExpenseTypes.selected = selectedType;
    }

    // set main class
    if (enableClass === 0) {
        var mainClass = mSelectedExpenseTypes.main_class;
        if (mainClass.length < 1) {
            setDisableFormInput(formId + 'select[name="main_class"]', 'select');
            setDisableFormInput(formId + 'select[name="middle_class"]', 'select');
            setDisableFormInput(formId + 'select[name="small_class"]', 'select');
        } else if (mainClass.length === 1) {
            $(formId + 'select[name="main_class"]').find('option').remove();
            $(formId + 'select[name="main_class"]').append('<option selected="selected" value="' + mainClass[0].code + '">' + mainClass[0].name + '</option>');
            setDisableFormInput(formId + 'select[name="main_class"]');

            enableClass = 1;
        } else {
            setEnableFormInput(formId + 'select[name="main_class"]', 'select', true);
            setDisableFormInput(formId + 'select[name="middle_class"]', 'select');
            setDisableFormInput(formId + 'select[name="small_class"]', 'select');
            $(formId + 'select[name="main_class"]').find('option').remove();

            var detailClass = undefined;
            try {
                if (mDetailItem) {
                    detailClass = mDetailItem.main_class;
                } else {
                    if (mCommonExpenseTypes.selected === 'purchase') {
                        if (mPageTypeParam === 'purchase') {
                            detailClass = 2000000000;
                        } else if (mPageTypeParam === 'expense') {
                            detailClass = 3000000000;
                        } else {
                            detailClass = 3000000000;
                        }
                    }
                }
            } catch (e) {
                // mDetailItem 은 각 페이지들에서 정의된다. 정의되지 않은 경우 exception이
                // 발생하므로 여기에서 한번 더 처리한다.
                if (mCommonExpenseTypes.selected === 'purchase') {
                    if (mPageTypeParam === 'purchase') {
                        detailClass = 2000000000;
                    } else if (mPageTypeParam === 'expense') {
                        detailClass = 3000000000;
                    } else {
                        detailClass = 3000000000;
                    }
                }
            };

            var selected = false;
            for (var i = 0; i < mainClass.length; i++) {
                if (detailClass && detailClass === mainClass[i].code) {
                    $(formId + 'select[name="main_class"]').append('<option selected="selected" value="' + mainClass[i].code + '">' + mainClass[i].name + '</option>');

                    selected = true;
                    enableClass = 1;
                } else {
                    $(formId + 'select[name="main_class"]').append('<option value="' + mainClass[i].code + '">' + mainClass[i].name + '</option>');
                }
            }
            if (selected) {
                $(formId + 'select[name="main_class"]').prepend('<option value="">대분류선택</option>')
            } else {
                $(formId + 'select[name="main_class"]').prepend('<option selected="selected" value="">대분류선택</option>')
            }
        }
        // init highlight
        unhighlightFormElement($('#main_class_select'), 'select-error', 'select-valid');
        unhighlightFormElement($('#middle_class_select'), 'select-error', 'select-valid');
        unhighlightFormElement($('#small_class_select'), 'select-error', 'select-valid');
    }

    if (enableClass === 1) {
        var selectedParentClass = parseInt($(formId + 'select[name="main_class"]').val());
        setDisableFormInput(formId + 'select[name="middle_class"]', 'select');
        setEnableFormInput(formId + 'select[name="small_class"]', 'select', true);

        if (mPageTypeParam === 'sales') {
            mSelectedExpenseTypes.middle_class = cloneObject(mCommonExpenseTypes.sales.middle_class);
        } else if (mPageTypeParam === 'sgexpense' && !selectedType) {
            mSelectedExpenseTypes.middle_class = cloneObject(mCommonExpenseTypes.sgexpense.middle_class);
        } else if (mPageTypeParam === 'sgincome') {
            mSelectedExpenseTypes.middle_class = cloneObject(mCommonExpenseTypes.sgincome.middle_class);
        } else {
            // 매입이나 경비는 non-parent 제거가 있기 때문에 다시 계산해야 한다.
            mSelectedExpenseTypes.middle_class = cloneObject(mCommonExpenseTypes.purchase.middle_class);
            if (mAccountingEtaxItemEditMode) {
                mSelectedExpenseTypes.middle_class = mSelectedExpenseTypes.middle_class.concat(mCommonExpenseTypes.sgexpense.middle_class);
            }
        }

        var middleClass = mSelectedExpenseTypes.middle_class;

        // remove non-parent
        for (var i = middleClass.length - 1; i >= 0; i--) {
            var item = middleClass[i];
            if (item.parent_code !== selectedParentClass) {
                middleClass.splice(i, 1);
            }
        }

        if (middleClass.length < 1) {
            // reset.
            if (!isNullObject($(formId + 'select[name="middle_class"] option:selected').val())) {
                $(formId + 'select[name="middle_class"]').find('option').remove()
                $(formId + 'select[name="middle_class"]').append('<option selected="selected" value="">중분류선택</option>');
            }
            // reset.
            if (!isNullObject($(formId + 'select[name="small_class"] option:selected').val())) {
                $(formId + 'select[name="small_class"]').find('option').remove()
                $(formId + 'select[name="small_class"]').append('<option selected="selected" value="">중분류선택</option>');
            }
            setDisableFormInput(formId + 'select[name="middle_class"]', 'select');
            setDisableFormInput(formId + 'select[name="small_class"]', 'select');
        } else if (middleClass.length === 1) {
            $(formId + 'select[name="middle_class"]').find('option').remove();
            $(formId + 'select[name="middle_class"]').append('<option selected="selected" value="' + middleClass[0].code + '">' + middleClass[0].name + '</option>');
            setDisableFormInput(formId + 'select[name="middle_class"]', 'select');
            unhighlightFormElement($('#main_class_select'), 'select-error', 'select-valid');

            enableClass = 2;
        } else {
            setEnableFormInput(formId + 'select[name="middle_class"]', 'select', true);
            setDisableFormInput(formId + 'select[name="small_class"]', 'select');
            $(formId + 'select[name="middle_class"]').find('option').remove();

            var detailClass = undefined;
            try {
                if (mDetailItem) {
                    detailClass = mDetailItem.middle_class;
                }
            } catch (e) {};

            var selected = false;
            var disabledClass = 1000000007;
            if (selectedParentClass === 2000000000) {
                //disabledClass = 2000000003;
            } else if (selectedParentClass === 3000000000) {
                //disabledClass = 2000000003;
            }
            for (var i = 0; i < middleClass.length; i++) {
                if (detailClass && detailClass === middleClass[i].code) {
                    if (middleClass[i].code === disabledClass) {
                        $(formId + 'select[name="middle_class"]').append('<option selected="selected" disabled value="' + middleClass[i].code + '">' + middleClass[i].name + '</option>');
                    } else {
                        $(formId + 'select[name="middle_class"]').append('<option selected="selected" value="' + middleClass[i].code + '">' + middleClass[i].name + '</option>');
                    }

                    selected = true;
                    enableClass = 2;
                } else {
                    if (middleClass[i].code === disabledClass) {
                        $(formId + 'select[name="middle_class"]').append('<option disabled value="' + middleClass[i].code + '">' + middleClass[i].name + '</option>');
                    } else {
                        $(formId + 'select[name="middle_class"]').append('<option value="' + middleClass[i].code + '">' + middleClass[i].name + '</option>');
                    }
                }
            }
            if (selected) {
                $(formId + 'select[name="middle_class"]').prepend('<option value="">중분류선택</option>')
            } else {
                $(formId + 'select[name="middle_class"]').prepend('<option selected="selected" value="">중분류선택</option>')
            }
        }
        // init highlight
        unhighlightFormElement($(formId + '#middle_class_select'), 'select-error', 'select-valid');
        unhighlightFormElement($(formId + '#small_class_select'), 'select-error', 'select-valid');
    }

    if (enableClass === 2) {
        var selectedParentClass = parseInt($(formId + 'select[name="middle_class"]').val());
        $(formId + 'select[name="small_class"]').removeAttr('disabled');

        if (mPageTypeParam === 'sales') {
            mSelectedExpenseTypes.small_class = cloneObject(mCommonExpenseTypes.sales.small_class);
        } else if (mPageTypeParam === 'sgexpense' && !selectedType) {
            mSelectedExpenseTypes.small_class = cloneObject(mCommonExpenseTypes.sgexpense.small_class);
        } else if (mPageTypeParam === 'sgincome') {
            mSelectedExpenseTypes.small_class = cloneObject(mCommonExpenseTypes.sgincome.small_class);
        } else {
            // 매입이나 경비는 non-parent 제거가 있기 때문에 다시 계산해야 한다.
            mSelectedExpenseTypes.small_class = cloneObject(mCommonExpenseTypes.purchase.small_class);
            if (mAccountingEtaxItemEditMode) {
                mSelectedExpenseTypes.small_class = mSelectedExpenseTypes.small_class.concat(mCommonExpenseTypes.sgexpense.small_class);
            }
        }

        var smallClass = mSelectedExpenseTypes.small_class;
        // remove non-parent
        for (var i = smallClass.length - 1; i >= 0; i--) {
            var item = smallClass[i];
            if (item.parent_code !== selectedParentClass) {
                smallClass.splice(i, 1);
            }
        }

        if (smallClass.length < 1) {
            setDisableFormInput(formId + 'select[name="small_class"]', 'select');
            // reset.
            if (!isNullObject($(formId + 'select[name="small_class"] option:selected').val())) {
                $(formId + 'select[name="small_class"]').find('option').remove()
                $(formId + 'select[name="small_class"]').append('<option selected="selected" value="">선택</option>');
            }
            unhighlightFormElement($('#small_class_select'), 'select-error', 'select-valid');
        } else if (smallClass.length === 1) {
            $(formId + 'select[name="small_class"]').find('option').remove()
            $(formId + 'select[name="small_class"]').append('<option readonly selected="selected" value="' + smallClass[0].code + '">' + smallClass[0].name + '</option>');
            setDisableFormInput(formId + 'select[name="small_class"]', 'select');
            unhighlightFormElement($(formId + '#small_class_select'), 'select-error', 'select-valid');
        } else {
            setEnableFormInput(formId + 'select[name="small_class"]', 'select', true);
            $(formId + 'select[name="small_class"]').find('option').remove()

            var detailClass = undefined;
            try {
                if (mDetailItem) {
                    detailClass = mDetailItem.small_class;
                }
            } catch (e) {};

            var selected = false;
            for (var i = 0; i < smallClass.length; i++) {
                if (!isNullObject(detailClass) && detailClass === smallClass[i].code) {
                    $(formId + 'select[name="small_class"]').append('<option selected="selected" value="' + smallClass[i].code + '">' + smallClass[i].name + '</option>');
                    selected = true;
                } else {
                    $(formId + 'select[name="small_class"]').append('<option value="' + smallClass[i].code + '">' + smallClass[i].name + '</option>');
                }
            }
            if (selected) {
                $(formId + 'select[name="small_class"]').prepend('<option value="">소분류선택</option>')
            } else {
                $(formId + 'select[name="small_class"]').prepend('<option selected="selected" value="">소분류선택</option>')
            }
        }
        // init highlight
        unhighlightFormElement($('#small_class_select'), 'select-error', 'select-valid');
    }

    if (isRefresh) {
        $(formId + 'select[name="main_class"]').on('change', function() {
            // 매입 또는 경비 페이지 타이틀을 설정한다.
            if (mCommonExpenseTypes.selected === 'purchase') {
                var text = $(formId + 'select[name="main_class"] option:selected').text();
                text = (text === '대분류선택') ? '매입 및 경비' : text;

                var pageName = location.href.split("/").slice(-1)[0];
                pageName = pageName.split('.')[0];

                $('#page_title').html(text);

                if (pageName.endsWith('_add')) {
                    $('#page_sub_title').html(text + '입력');
                } else {
                    $('#page_sub_title').html(text + '수정');
                }
            }

            setDefaultExpenseTypes(null, 200, null, 1, false, selectedType, formId);
        });
        $(formId + 'select[name="middle_class"]').on('change', function() {
            setDefaultExpenseTypes(null, 200, null, 2, false, selectedType, formId);
        });
    }

    // $(formId + 'select[name="main_class"]').selectpicker('refresh');
    // $(formId + 'select[name="middle_class"]').selectpicker('refresh');
    // $(formId + 'select[name="small_class"]').selectpicker('refresh');
}

function setRepeaterDefaultExpenseTypes(response, code, msg, enableClass, isRefresh, selectedType, formId, repeaterName) {
    if (!formId) {
        formId = '';
    } else {
        formId = formId.trim() + ' ';
    }
    if (isNullObject(enableClass)) {
        enableClass = 0;
    }

    var namesArray = repeaterName.split('[');
    for (var i = 0; i < namesArray.length; i++) {
        namesArray[i] = namesArray[i].replaceAll(']', '');
    }

    if (code !== 200) {
        swal({
            title: "항목 검색 실패",
            html: "매출 및 매입의 항목 검색에 실패했습니다. <br>관리자에게 문의하세요.",
            type: "error",
            confirmButtonClass: "btn btn-danger"
        }).then(function(e) {
            goBack();
        })
        return;
    }

    var pageName = location.href.split("/").slice(-1)[0];
    pageName = pageName.split('.')[0];

    if (isRefresh) {
        mCommonExpenseTypes = response;
        if (mPageTypeParam === 'sales') {
            mSelectedExpenseTypes = cloneObject(mCommonExpenseTypes.sales);
        } else if (mPageTypeParam === 'sgexpense' && !selectedType) {
            mSelectedExpenseTypes = cloneObject(mCommonExpenseTypes.sgexpense);
        } else if (mPageTypeParam === 'sgincome') {
            mSelectedExpenseTypes = cloneObject(mCommonExpenseTypes.sgincome);
            // 전도금 이월은 제거한다.
            for (var i = mSelectedExpenseTypes.middle_class.length - 1; i >= 0; i--) {
                if (mSelectedExpenseTypes.middle_class[i].code === 4100000003) {
                    mSelectedExpenseTypes.middle_class.splice(i, 1);
                }
            }
        } else {
            // 매입과 경비는 서로 변동될 수 있다.
            // main_class에 매입과 경비가 모두 포함된다.
            var purchases = cloneObject(mCommonExpenseTypes.purchase);

            if (mAccountingEtaxItemEditMode) {
                mSelectedExpenseTypes = {};
                if (mCommonExpenseTypes.sgexpense.main_class &&
                    Array.isArray(mCommonExpenseTypes.sgexpense.main_class)) {
                    mSelectedExpenseTypes.main_class = purchases.main_class.concat(mCommonExpenseTypes.sgexpense.main_class);
                }
                if (mCommonExpenseTypes.sgexpense.middle_class &&
                    Array.isArray(mCommonExpenseTypes.sgexpense.middle_class)) {
                    mSelectedExpenseTypes.middle_class = purchases.middle_class.concat(mCommonExpenseTypes.sgexpense.middle_class);
                }
                if (mCommonExpenseTypes.sgexpense.small_class &&
                    Array.isArray(mCommonExpenseTypes.sgexpense.small_class)) {
                    mSelectedExpenseTypes.small_class = purchases.small_class.concat(mCommonExpenseTypes.sgexpense.small_class);
                }
            } else {
                mSelectedExpenseTypes = purchases;
            }
        }
    }
    if (selectedType) {
        mCommonExpenseTypes.selected = selectedType;
    }

    // set main class
    if (enableClass === 0) {
        var mainClass = mSelectedExpenseTypes.main_class;
        if (mainClass.length < 1) {
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]', 'select');
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]', 'select');
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]', 'select');
        } else if (mainClass.length === 1) {
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').find('option').remove();
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').append('<option selected="selected" value="' + mainClass[0].code + '">' + mainClass[0].name + '</option>');
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]');

            enableClass = 1;
        } else {
            setEnableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]', 'select', true);
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]', 'select');
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]', 'select');
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').find('option').remove();

            var detailClass = undefined;
            try {
                if (mDetailItem) {
                    detailClass = mDetailItem.main_class;
                } else {
                    if (mCommonExpenseTypes.selected === 'purchase') {
                        if (mPageTypeParam === 'purchase') {
                            detailClass = 2000000000;
                        } else if (mPageTypeParam === 'expense') {
                            detailClass = 3000000000;
                        } else {
                            detailClass = 3000000000;
                        }
                    }
                }
            } catch (e) {
                // mDetailItem 은 각 페이지들에서 정의된다. 정의되지 않은 경우 exception이
                // 발생하므로 여기에서 한번 더 처리한다.
                if (mCommonExpenseTypes.selected === 'purchase') {
                    if (mPageTypeParam === 'purchase') {
                        detailClass = 2000000000;
                    } else if (mPageTypeParam === 'expense') {
                        detailClass = 3000000000;
                    } else {
                        detailClass = 3000000000;
                    }
                }
            };

            var selected = false;
            for (var i = 0; i < mainClass.length; i++) {
                if (detailClass && detailClass === mainClass[i].code) {
                    $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').append('<option selected="selected" value="' + mainClass[i].code + '">' + mainClass[i].name + '</option>');

                    selected = true;
                    enableClass = 1;
                } else {
                    $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').append('<option value="' + mainClass[i].code + '">' + mainClass[i].name + '</option>');
                }
            }
            if (selected) {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').prepend('<option value="">대분류 선택</option>')
            } else {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').prepend('<option selected="selected" value="">대분류 선택</option>')
            }
        }
        // init highlight
        unhighlightFormElement($('#main_class_select'), 'select-error', 'select-valid');
        unhighlightFormElement($('#middle_class_select'), 'select-error', 'select-valid');
        unhighlightFormElement($('#small_class_select'), 'select-error', 'select-valid');
    }

    if (enableClass === 1) {
        var selectedParentClass = parseInt($(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').val());
        setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]', 'select');
        setEnableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]', 'select', true);

        if (mPageTypeParam === 'sales') {
            mSelectedExpenseTypes.middle_class = cloneObject(mCommonExpenseTypes.sales.middle_class);
        } else if (mPageTypeParam === 'sgexpense' && !selectedType) {
            mSelectedExpenseTypes.middle_class = cloneObject(mCommonExpenseTypes.sgexpense.middle_class);
        } else if (mPageTypeParam === 'sgincome') {
            mSelectedExpenseTypes.middle_class = cloneObject(mCommonExpenseTypes.sgincome.middle_class);
        } else {
            // 매입이나 경비는 non-parent 제거가 있기 때문에 다시 계산해야 한다.
            mSelectedExpenseTypes.middle_class = cloneObject(mCommonExpenseTypes.purchase.middle_class);
            if (mAccountingEtaxItemEditMode) {
                mSelectedExpenseTypes.middle_class = mSelectedExpenseTypes.middle_class.concat(mCommonExpenseTypes.sgexpense.middle_class);
            }
        }

        var middleClass = mSelectedExpenseTypes.middle_class;

        // remove non-parent
        for (var i = middleClass.length - 1; i >= 0; i--) {
            var item = middleClass[i];
            if (item.parent_code !== selectedParentClass) {
                middleClass.splice(i, 1);
            }
        }

        if (middleClass.length < 1) {
            // reset.
            if (!isNullObject($(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class] option:selected').val())) {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').find('option').remove()
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').append('<option selected="selected" value="">중분류 선택</option>');
            }
            // reset.
            if (!isNullObject($(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class] option:selected').val())) {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').find('option').remove()
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').append('<option selected="selected" value="">중분류 선택</option>');
            }
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]', 'select');
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]', 'select');
        } else if (middleClass.length === 1) {
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').find('option').remove();
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').append('<option selected="selected" value="' + middleClass[0].code + '">' + middleClass[0].name + '</option>');
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]', 'select');
            unhighlightFormElement($('#main_class_select'), 'select-error', 'select-valid');

            enableClass = 2;
        } else {
            setEnableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]', 'select', true);
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]', 'select');
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').find('option').remove();

            var detailClass = undefined;
            try {
                if (mDetailItem) {
                    detailClass = mDetailItem.middle_class;
                }
            } catch (e) {};

            var selected = false;
            var disabledClass = 1000000007;
            if (selectedParentClass === 2000000000) {
                //disabledClass = 2000000003;
            } else if (selectedParentClass === 3000000000) {
                //disabledClass = 2000000003;
            }
            for (var i = 0; i < middleClass.length; i++) {
                if (detailClass && detailClass === middleClass[i].code) {
                    if (middleClass[i].code === disabledClass) {
                        $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').append('<option selected="selected" disabled value="' + middleClass[i].code + '">' + middleClass[i].name + '</option>');
                    } else {
                        $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').append('<option selected="selected" value="' + middleClass[i].code + '">' + middleClass[i].name + '</option>');
                    }

                    selected = true;
                    enableClass = 2;
                } else {
                    if (middleClass[i].code === disabledClass) {
                        $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').append('<option disabled value="' + middleClass[i].code + '">' + middleClass[i].name + '</option>');
                    } else {
                        $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').append('<option value="' + middleClass[i].code + '">' + middleClass[i].name + '</option>');
                    }
                }
            }
            if (selected) {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').prepend('<option value="">중분류 선택</option>')
            } else {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').prepend('<option selected="selected" value="">중분류 선택</option>')
            }
        }
        // init highlight
        unhighlightFormElement($(formId + '#middle_class_select'), 'select-error', 'select-valid');
        unhighlightFormElement($(formId + '#small_class_select'), 'select-error', 'select-valid');
    }

    if (enableClass === 2) {
        var selectedParentClass = parseInt($(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').val());
        $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').removeAttr('disabled');

        if (mPageTypeParam === 'sales') {
            mSelectedExpenseTypes.small_class = cloneObject(mCommonExpenseTypes.sales.small_class);
        } else if (mPageTypeParam === 'sgexpense' && !selectedType) {
            mSelectedExpenseTypes.small_class = cloneObject(mCommonExpenseTypes.sgexpense.small_class);
        } else if (mPageTypeParam === 'sgincome') {
            mSelectedExpenseTypes.small_class = cloneObject(mCommonExpenseTypes.sgincome.small_class);
        } else {
            // 매입이나 경비는 non-parent 제거가 있기 때문에 다시 계산해야 한다.
            mSelectedExpenseTypes.small_class = cloneObject(mCommonExpenseTypes.purchase.small_class);
            if (mAccountingEtaxItemEditMode) {
                mSelectedExpenseTypes.small_class = mSelectedExpenseTypes.small_class.concat(mCommonExpenseTypes.sgexpense.small_class);
            }
        }

        var smallClass = mSelectedExpenseTypes.small_class;
        // remove non-parent
        for (var i = smallClass.length - 1; i >= 0; i--) {
            var item = smallClass[i];
            if (item.parent_code !== selectedParentClass) {
                smallClass.splice(i, 1);
            }
        }

        if (smallClass.length < 1) {
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]', 'select');
            // reset.
            if (!isNullObject($(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class] option:selected').val())) {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').find('option').remove()
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').append('<option selected="selected" value="">선택</option>');
            }
            unhighlightFormElement($('#small_class_select'), 'select-error', 'select-valid');
        } else if (smallClass.length === 1) {
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').find('option').remove()
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').append('<option readonly selected="selected" value="' + smallClass[0].code + '">' + smallClass[0].name + '</option>');
            setDisableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]', 'select');
            unhighlightFormElement($(formId + '#small_class_select'), 'select-error', 'select-valid');
        } else {
            setEnableFormInput(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]', 'select', true);
            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').find('option').remove()

            var detailClass = undefined;
            try {
                if (mDetailItem) {
                    detailClass = mDetailItem.small_class;
                }
            } catch (e) {};

            var selected = false;
            for (var i = 0; i < smallClass.length; i++) {
                if (!isNullObject(detailClass) && detailClass === smallClass[i].code) {
                    $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').append('<option selected="selected" value="' + smallClass[i].code + '">' + smallClass[i].name + '</option>');
                    selected = true;
                } else {
                    $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').append('<option value="' + smallClass[i].code + '">' + smallClass[i].name + '</option>');
                }
            }
            if (selected) {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').prepend('<option value="">소분류 선택</option>')
            } else {
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').prepend('<option selected="selected" value="">소분류 선택</option>')
            }
        }
        // init highlight
        unhighlightFormElement($('#small_class_select'), 'select-error', 'select-valid');
    }

    if (isRefresh) {
        $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class]').on('change', function() {
            var val = $(this).val();
            var text = $(':selected', this).text();
            unhighlightFormElement($('#main_class'), 'select-error', 'select-valid');

            $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').val('');

            if (val === '2000000000' || val === '3000000000') { // 매입과 경비는 프로젝트 선택
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][project_no]').removeAttr('disabled');
            } else {
                $(formId + 'input[name="' + namesArray[0] + '[' + namesArray[1] + '][project_name]').val('');
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][project_no]').val(0).prop('selected', true);
                $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][project_no]').attr('disabled', 'true');
            }
            setRepeaterDefaultExpenseTypes(null, 200, null, 1, false, selectedType, formId, repeaterName);
            $(formId + 'input[name="' + namesArray[0] + '[' + namesArray[1] + '][main_class_name]').val(text);
        });
        $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class]').on('change', function() {
            var text = $(':selected', this).text();
            setRepeaterDefaultExpenseTypes(null, 200, null, 2, false, selectedType, formId, repeaterName);
            $(formId + 'input[name="' + namesArray[0] + '[' + namesArray[1] + '][middle_class_name]').val(text);
            $(formId + 'input[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class_name]').val(text);
        });
        $(formId + 'select[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class]').on('change', function() {
            var text = $(':selected', this).text();
            $(formId + 'input[name="' + namesArray[0] + '[' + namesArray[1] + '][small_class_name]').val(text);
        });
    }
}

function getCorpInfo(cb, bizNo) {
    var url = '/api/accounting/corp_info'
    if (!isNullObject(bizNo)) {
        url += '/' + bizNo
    }
    $.ajax({
        url: url,
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function(response, textStatus, xhr) {
            if (response.code === 401) {
                swal({
                    title: "세션 만료",
                    html: "세션이 만료되었습니다. 다시 로그인 하셔야 합니다.",
                    type: "error",
                    confirmButtonClass: "btn btn-danger",
                }).then(function(e) {
                    gotoLoginPage();
                });
                return;
            }
            if (!isNullObject(response.code) && response.code !== 200) {
                response.data = []
            }

            if (!isNullObject(cb)) {
                cb(response.data, response.code, response.msg)
            }
        },
        error: function(xhr, error, thrown) {
            var response = xhr.responseText
            console.info('getCorpInfo() error =', response)
            cb([], xhr.status, response)
        }
    })
}

function showDocRegulViewModal() {
    var path = '/upload_files/approvalattachments/2022/05/04/638874f67cf944ef891e33fbaeda091d'
    if (mUserInfo.biz_no === '123-81-64140') {
        path = '/upload_files/approvalattachments/2023/06/20/5b8eae0d36728e55845c8c6e73944e9a';
    } else if (mUserInfo.biz_no === '399-81-01591') {
        path = '/upload_files/corporations/2022/11/21/11b999ab7a04b1f3d64c25f5f1b85e45';
    }
    $('#attached_file_regulation').html(getPdfjsFileView(path));
    $('#p_modal_regulation_view').modal('show');
}

function currencySymbolSelect(symbol) {
    if (symbol === '0') {
        return ''
    } else if (symbol === '1') {
        return '$'
    } else if (symbol === '2') {
        return '€'
    } else if (symbol === '3') {
        return '￥'
    } else {
        return ' '
    }
}

function formatDecimalOrInteger(data) {
    var formattedNumber = data.toFixed(1); // 숫자를 소수점 이하 한 자리로 표시
    if (formattedNumber.endsWith('.0')) {
        formattedNumber = parseInt(data); // 소수점 이하 값이 0이면 정수로 변환
    }
    return floatWithCommas(formattedNumber)
}
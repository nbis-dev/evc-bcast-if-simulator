'use strict'

/*
 * 메뉴 네비게이션, 상단 메뉴 바, 사용자 정보 등을 담당한다.
 */
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}



if (!Number.isInteger) {
    Number.isInteger = function isInteger(nVal) {
        return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
    };
}

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

function cloneObject(src) {
    return JSON.parse(JSON.stringify(src));
}

function isNullObject(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return true
    }

    // if (typeof(obj) === 'string' && obj.trim().length === 0) {
    //     return true
    // }
    if (typeof(obj) === 'string' && obj.length === 0) {
        return true
    }
    return false
}

function isEmptyObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// function isEmptyString(obj) {
//     if (obj === null || typeof obj === 'undefined') {
//         return true
//     }
//
//     if (typeof(obj) === 'string' && obj.trim().length === 0) {
//         return true
//     }
//     return false
// }

// 사업자번호 체크
// 2015-04-24 박용서 작성
function checkValidateBizNumber(bizNo) {
    // bizNo는 숫자만 10자리로 해서 문자열로 넘긴다.
    bizNo = bizNo.replaceAll('-', '')
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var tmpbizNo, i, chkSum = 0,
        c2, remander;
    var result;

    bizNo = bizNo.replace(/-/gi, '')

    for (i = 0; i <= 7; i++) {
        chkSum += checkID[i] * bizNo.charAt(i)
    }

    c2 = "0" + (checkID[8] * bizNo.charAt(8))
    c2 = c2.substring(c2.length - 2, c2.length)
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1))
    remander = (10 - (chkSum % 10)) % 10

    if (Math.floor(bizNo.charAt(9)) == remander) {
        result = true // OK!

    } else {
        result = false
    }

    return result
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    }
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;

        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    }
}

if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}

/*
 * string startsWith
 */
if (!String.prototype.startsWith) {
    (function() {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function() {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch (error) {}
            return result;
        }());
        var toString = {}.toString;
        var startsWith = function(search) {
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            if (search && toString.call(search) == '[object RegExp]') {
                throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var position = arguments.length > 1 ? arguments[1] : undefined;
            // `ToInteger`
            var pos = position ? Number(position) : 0;
            if (pos != pos) { // better `isNaN`
                pos = 0;
            }
            var start = Math.min(Math.max(pos, 0), stringLength);
            // Avoid the `indexOf` call if no match is possible
            if (searchLength + start > stringLength) {
                return false;
            }
            var index = -1;
            while (++index < searchLength) {
                if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                    return false;
                }
            }
            return true;
        };
        if (defineProperty) {
            defineProperty(String.prototype, 'startsWith', {
                'value': startsWith,
                'configurable': true,
                'writable': true
            });
        } else {
            String.prototype.startsWith = startsWith;
        }
    }());
}

if (!String.prototype.endsWith) {
    (function() {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function() {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch (error) {}
            return result;
        }());
        var toString = {}.toString;
        var endsWith = function(search) {
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            if (search && toString.call(search) == '[object RegExp]') {
                throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var pos = stringLength;
            if (arguments.length > 1) {
                var position = arguments[1];
                if (position !== undefined) {
                    // `ToInteger`
                    pos = position ? Number(position) : 0;
                    if (pos != pos) { // better `isNaN`
                        pos = 0;
                    }
                }
            }
            var end = Math.min(Math.max(pos, 0), stringLength);
            var start = end - searchLength;
            if (start < 0) {
                return false;
            }
            var index = -1;
            while (++index < searchLength) {
                if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                    return false;
                }
            }
            return true;
        };
        if (defineProperty) {
            defineProperty(String.prototype, 'endsWith', {
                'value': endsWith,
                'configurable': true,
                'writable': true
            });
        } else {
            String.prototype.endsWith = endsWith;
        }
    }());
}

function objectCompare() {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof(x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true; //Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}

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

function checkValidateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
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

function getCurrentFileName() {
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function getAllUrlParameter() {
    var sPageURL = window.location.search.substring(1)
    return sPageURL.split('&')
}

function isSupportLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null
    } catch (e) {
        return false;
    }
}

function clearLocalStorage() {
    if (isSupportLocalStorage()) {
        localStorage.clear()
    }
}

/*
 * 넘겨 받은 날짜로부터 얼마나 지났는지를 계산한다.
 */
function calcTimesPast(date) {
    var currDate = new Date()
    var afterDate = undefined
    var beforeDate = undefined
    // const day = 1000 * 60 * 60 * 24
    // const month = day * 30
    // const year = month * 12

    var result = {
        isPast: true,
        pastYears: 0,
        pastMonths: 0,
        pastDays: 0
    }

    // 1970년 이전 데이터를 비교할때는. 문제일수 있지만 그렇게 쓸 일이 없다.
    if (currDate.getTime() < date.getTime()) {
        result.isPast = false
        afterDate = date
        beforeDate = currDate
    } else {
        afterDate = currDate
        beforeDate = date
    }

    var tempDate = new Date(afterDate)
    // set past years
    result.pastYears = tempDate.getFullYear() - beforeDate.getFullYear()
    tempDate.setFullYear(tempDate.getFullYear() - result.pastYears)
    // set past months
    if (tempDate.getMonth() > beforeDate.getMonth()) {
        result.pastMonths = tempDate.getMonth() - beforeDate.getMonth()
        tempDate.setMonth(tempDate.getMonth() - result.pastMonths)
    } else {
        // 같은 달인 경우다.
        if (tempDate.getMonth() < beforeDate.getMonth()) {
            result.pastYears--
            tempDate.setFullYear(tempDate.getFullYear() + 1)
            result.pastMonths = tempDate.getMonth() + (12 - beforeDate.getMonth())
        } else {
            result.pastMonths = 0
        }
    }
    result.pastDays = tempDate.getDate() - beforeDate.getDate()

    return result
}

// 현재까지는 물론 과거의 그 당시까지의 시간을 계산 (급여명세서에 사용) - 추가 이한 201029
function calcTimesPastTillThen(startDate, endDate) {
    var afterDate = undefined
    var beforeDate = undefined

    var result = {
        isPast: true,
        pastYears: 0,
        pastMonths: 0,
        pastDays: 0
    }

    // 1970년 이전 데이터를 비교할때는. 문제일수 있지만 그렇게 쓸 일이 없다.
    if (endDate.getTime() < startDate.getTime()) {
        result.isPast = false
        afterDate = startDate
        beforeDate = endDate
    } else {
        afterDate = endDate
        beforeDate = startDate
    }

    var tempDate = new Date(afterDate)
    // set past years
    result.pastYears = tempDate.getFullYear() - beforeDate.getFullYear()
    tempDate.setFullYear(tempDate.getFullYear() - result.pastYears)
    // set past months
    if (tempDate.getMonth() > beforeDate.getMonth()) {
        result.pastMonths = tempDate.getMonth() - beforeDate.getMonth()
        tempDate.setMonth(tempDate.getMonth() - result.pastMonths)
    } else {
        // 같은 달인 경우다.
        if (tempDate.getMonth() < beforeDate.getMonth()) {
            result.pastYears--
            tempDate.setFullYear(tempDate.getFullYear() + 1)
            result.pastMonths = tempDate.getMonth() + (12 - beforeDate.getMonth())
        } else {
            result.pastMonths = 0
        }
    }
    result.pastDays = tempDate.getDate() - beforeDate.getDate()

    return result
}

// 두 날짜 사이의 완전히 지난 개월 수 계산
function calcTimesPastMonth(startDate, endDate) {
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    var diffMonth = moment(endDate).diff(moment(startDate), 'months')

    return diffMonth
}


// 두 날짜 사이의 완전히 지난 년수 계산
function calcTimesPastYear(startDate, endDate) {
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    var diffMonth = moment(endDate).diff(moment(startDate), 'years')

    return diffMonth
}

// function calcTimesPastYear(startDate, endDate) {
//     startDate = moment(startDate).format('YYYY-MM-DD');
//     endDate = moment(endDate).format('YYYY-MM-DD');
//     var ar1 = startDate.split('-');
//     var ar2 = endDate.split('-');
//     var da1 = new Date(ar1[0], ar1[1], ar1[2]);
//     var da2 = new Date(ar2[0], ar2[1], ar2[2]);
//     var dif = da2 - da1;
//     var cDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
//     var cMonth = cDay * 30; // 월 만듬
//     var cYear = cMonth * 12; // 년 만듬
//
//     var diffYear = parseInt(dif / cYear)
//
//     return diffYear
// }

// 두 날짜 사이의 일 수 계산
function calcTimesPastDay(startDate, endDate) {
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    var diffMonth = moment(endDate).diff(moment(startDate), 'days')

    return diffMonth
}

// function calcTimesPastDay(startDate, endDate) {
//     startDate = moment(startDate).format('YYYY-MM-DD');
//     endDate = moment(endDate).format('YYYY-MM-DD');
//     var ar1 = startDate.split('-');
//     var ar2 = endDate.split('-');
//     var da1 = new Date(ar1[0], ar1[1], ar1[2]);
//     var da2 = new Date(ar2[0], ar2[1], ar2[2]);
//     var dif = da2 - da1;
//     var cDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
//     var cMonth = cDay * 30; // 월 만듬
//     var cYear = cMonth * 12; // 년 만듬
//
//     var diffDay = parseInt(dif / cDay)
//
//     return diffDay
// }

function calcAge(date) { // 한국식 나이 계산 추가 이한 191227
    var currDate = new Date()
    var birth_year = date

    var k_age = currDate.getFullYear() - birth_year.getFullYear() + 1

    return k_age
}

function processedDays(previous, current) {
    return Math.ceil((current - previous + 1) / 86400000)
}

function calcMyAnnualLeaveTechville(entryDate, retireDate, usedDays) {
    if (isNullObject(usedDays)) {
        usedDays = 0;
    }
    var nowYear = parseInt(moment().format('YYYY')); // 올해년도
    var lastDate = new Date();
    var lastDateF = moment(lastDate).format('YYYY-MM-DD');
    if (!isNullObject(retireDate)) {
        nowYear = parseInt(moment(retireDate).format('YYYY'));
        lastDate = new Date(retireDate); // 퇴직자는 퇴직일 기준으로 재직월수를 계산
    }
    var entryYear = parseInt(moment(entryDate).format('YYYY')); // 입사년도
    var entryMonth = parseInt(moment(entryDate).format('MM')); // 입사월
    var entryDay = parseInt(moment(entryDate).format('DD')); // 입사일
    var entryDateF = moment(entryDate).format('YYYY-MM-DD');
    var entryNum = (entryMonth * 100) + entryDay;
    var fiscalYearMonth = 1; // 회계년도 월
    var fiscalYearday = 1; // 회계년도 일
    var fiscalYearNum = fiscalYearMonth * 100 + fiscalYearday;
    var entryFirstBase = 0; // 회계일, 입사일 기준
    if (entryNum === fiscalYearNum) {
        entryFirstBase = 1
    } else if (entryNum < fiscalYearNum) {
        entryFirstBase = 2
    }

    var fiscalYears = nowYear - (entryYear + 1); // 회계연수
    var firstFiscalyearYear = entryYear + 1; //첫회계년
    var secondFiscalyearYear = entryYear + 2; //두번째회계년
    var nowFiscalyearDiff = nowYear - firstFiscalyearYear;
    var firstFiscalyear = firstFiscalyearYear + '-01-01'; // 첫회계일
    var secondFiscalyear = secondFiscalyearYear + '-01-01';

    var firstYearMonth = calcTimesPastMonth(entryDate, firstFiscalyear) - (entryDay === fiscalYearday ? 1 : 0) // 초년월수
    var employmentMonth = calcTimesPastMonth(entryDate, lastDateF) // 재직월수

    // 차감
    var minusBaseDay1 = '2017-05-30';
    var minusBaseDay2 = '2018-05-29';

    //소멸
    var extinctBaseDay1 = '2019-05-01';
    var extinctBaseDay2 = '2020-03-01';

    var myFirstGivenLeave = 0; // 첫휴가발생일수
    var mySecondGivenLeave = 0;
    var myThiredGivenLeave = 0;
    var myFirstUsedDays = 0; // 첫휴가 사용일수
    var mySecondUsedDays = 0; // 두번째 연도 휴가 사용일수
    var myThirdUsedDays = 0;
    var givenLeave = 0;

    if (lastDateF < firstFiscalyear) { // 1년차 (첫회계년도 전까지)
        if (firstFiscalyear > lastDateF) {
            givenLeave = employmentMonth;
        } else {
            givenLeave = firstYearMonth;
        }
        myFirstGivenLeave = givenLeave > 11 ? 11 : givenLeave; // 첫휴가발생일수는 최대 11일
        givenLeave = myFirstGivenLeave;
    } else if (nowFiscalyearDiff >= 0 && nowFiscalyearDiff < 1) { // 2년차 (첫회계년도 이후 부터)
        // 1년차(월차 )
        if (firstFiscalyear > lastDateF) {
            givenLeave = employmentMonth;
        } else {
            givenLeave = firstYearMonth;
        }
        myFirstGivenLeave = givenLeave > 11 ? 11 : givenLeave; // 첫휴가발생일수는 최대 11일

        // 2년간의 휴가 사용일 수를 분배한다.
        // 입사년도에 먼저 분배
        myFirstUsedDays = (usedDays >= myFirstGivenLeave) ? myFirstGivenLeave : usedDays;

        // 2년차
        mySecondGivenLeave = Math.round(((15 * calcTimesPastDay(entryDateF, firstFiscalyear) / 365) - ((entryDateF >= minusBaseDay1) && (lastDateF >= minusBaseDay2) ? 0 : myFirstUsedDays)) * 10) / 10;

        // 2년차(월차)
        myThiredGivenLeave = (secondFiscalyear > lastDateF) ? (employmentMonth > 11 ? 11 : employmentMonth) - myFirstGivenLeave : 11 - firstYearMonth;

        givenLeave = myFirstGivenLeave + mySecondGivenLeave + myThiredGivenLeave;
    } else if (nowFiscalyearDiff >= 1 && nowFiscalyearDiff < 2) { // 3년차
        // 1년차(월차 )
        if (firstFiscalyear > lastDateF) {
            myFirstGivenLeave = employmentMonth;
        } else {
            myFirstGivenLeave = firstYearMonth;
        }
        myFirstGivenLeave = givenLeave > 11 ? 11 : givenLeave; // 첫휴가발생일수는 최대 11일

        // 2년차
        mySecondGivenLeave = Math.round(((15 * calcTimesPastDay(entryDateF, firstFiscalyear) / 365) - ((entryDateF >= minusBaseDay1) && (lastDateF >= minusBaseDay2) ? 0 : myFirstUsedDays)) * 10) / 10;

        // 2년간의 휴가 사용일 수를 분배한다.
        // 입사년도에 먼저 분배

        myFirstUsedDays = (usedDays >= myFirstGivenLeave) ? myFirstGivenLeave : usedDays;

        if (usedDays > myFirstGivenLeave) {
            mySecondUsedDays = ((usedDays - myFirstGivenLeave) >= mySecondGivenLeave) ? mySecondGivenLeave : usedDays - myFirstGivenLeave;
        }

        if (usedDays - myFirstGivenLeave - mySecondGivenLeave > 0) {
            myThirdUsedDays = usedDays - myFirstGivenLeave - mySecondGivenLeave;
        }

        givenLeave = 15 - ((entryDateF >= minusBaseDay1 && lastDateF >= minusBaseDay2) ? 0 : myThirdUsedDays)
    } else if (nowFiscalyearDiff >= 2) { // 4년차 이후
        givenLeave = 15 + parseInt((fiscalYears - (entryFirstBase === 1 ? 0 : 1)) / 2);
    }

    var point5base = 0;
    point5base = Math.ceil(givenLeave * 2) / 2;
    $('#holiday_overall').html(point5base);
    return point5base
}

function calcMyAnnualLeave(entryDate) {
    var entryDateLocalTime = moment.utc(entryDate).toDate();
    var past = calcTimesPast(entryDateLocalTime);
    var years = past.pastYears;
    var annualLeave = 0;

    if (years >= 1 && years < 3) {
        annualLeave = 15
    } else if (years >= 3 && years < 5) {
        annualLeave = 16
    } else if (years >= 5 && years < 7) {
        annualLeave = 17
    } else if (years >= 7 && years < 9) {
        annualLeave = 18
    } else if (years >= 9 && years < 11) {
        annualLeave = 19
    } else if (years >= 11 && years < 13) {
        annualLeave = 20
    } else if (years >= 13 && years < 15) {
        annualLeave = 21
    } else if (years >= 15 && years < 17) {
        annualLeave = 22
    } else if (years >= 17 && years < 19) {
        annualLeave = 23
    } else if (years >= 19 && years < 21) {
        annualLeave = 24
    } else if (years >= 21) {
        annualLeave = 25
    } else {
        annualLeave = past.pastMonths;
        if (past.pastDays < 0) {
            annualLeave -= 1;
        }
    }

    $('#holiday_overall').html(annualLeave);
    return annualLeave;
}

function calcMyAnnualLeaveDiffLastDate(entryDate, lastDate) { // 연차 계산
    var years = moment(lastDate).diff(moment(entryDate), 'years');
    var annualLeave = 0;

    if (years >= 1 && years < 3) {
        annualLeave = 15
    } else if (years >= 3 && years < 5) {
        annualLeave = 16
    } else if (years >= 5 && years < 7) {
        annualLeave = 17
    } else if (years >= 7 && years < 9) {
        annualLeave = 18
    } else if (years >= 9 && years < 11) {
        annualLeave = 19
    } else if (years >= 11 && years < 13) {
        annualLeave = 20
    } else if (years >= 13 && years < 15) {
        annualLeave = 21
    } else if (years >= 15 && years < 17) {
        annualLeave = 22
    } else if (years >= 17 && years < 19) {
        annualLeave = 23
    } else if (years >= 19 && years < 21) {
        annualLeave = 24
    } else if (years >= 21) {
        annualLeave = 25
    } else {
        annualLeave = moment(lastDate).diff(moment(entryDate), 'months');
    }

    return annualLeave
}
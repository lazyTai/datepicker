(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.tai_date = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

function query(str) {
    var el = document.querySelector(str) || document.querySelector('body');
    return el
}

//日期格式化
function formartDate(y, m, d, symbol) {
    symbol = symbol || '-';
    m = (m.toString())[1] ? m : '0' + m;
    d = (d.toString())[1] ? d : '0' + d;
    return y + symbol + m + symbol + d
}

//当月总天数
function getCurrentMonthDateCount(_year, _month) {
    var year = _year ? _year : new Date().getFullYear();
    var month = _month ? _month : (new Date().getMonth() + 1);
    var fullDay = new Date(year, month, 0).getDate();//当月总天数
    return fullDay
}


function getWeekDay(_year, _month, _day) {
    return new Date(_year, _month-1, _day).getDay()
}

function createParams(opt) {
    var { el } = opt;
    var _el = query(el);
    var curDate = null;
    if (!opt.date) {
        curDate = new Date();
    } else {
        curDate = new Date(opt.date);
    }
    var year = curDate.getFullYear();
    var month = parseInt(curDate.getMonth()) + 1;
    var day = curDate.getDate();
    var currentYear = curDate.getFullYear();
    var currentMonth = parseInt(curDate.getMonth()) + 1;
    var currentDay = curDate.getDate();
    var selectedDate = '';
    var _this = this;

    return {
        opt,
        el: _el,
        curDate,
        year,
        month,
        day,
        currentYear,
        currentMonth,
        currentDay,
        selectedDate,
        _this
    }
}

__$styleInject("*{\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\nul{\r\n    list-style: none;\r\n}\r\n#schedule-box{\r\n    width: 320px;\r\n    margin: 0 auto;\r\n    padding: 35px 20px;\r\n    font-size: 13px;\r\n}\r\n.schedule-hd{\r\n    display: flex;\r\n    justify-content: space-between;\r\n    padding: 0 15px;\r\n}\r\n.today{\r\n    flex: 1;\r\n    text-align: center;\r\n}\r\n.ul-box{\r\n    overflow: hidden;\r\n}\r\n.ul-box > li{\r\n    float: left;\r\n    width: 14.28%;\r\n    text-align: center;\r\n    padding: 5px 0;\r\n}\r\n.other-month{\r\n    color: #999999;\r\n}\r\n.current-month{\r\n    color: #333333;\r\n}\r\n.today-style{\r\n    border-radius: 50%;\r\n    background: #58d321;\r\n}\r\n.arrow{\r\n    cursor: pointer;\r\n}\r\n.dayStyle{\r\n    display: inline-block;\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 50%;\r\n    text-align: center;\r\n    line-height: 35px;\r\n    cursor: pointer;\r\n}\r\n.current-month > .dayStyle:hover{\r\n    background: #00BDFF;\r\n    color: #ffffff;\r\n}\r\n.today-flag{\r\n    background: #00C2B1;\r\n    color: #fff;\r\n}\r\n.boxshaw{\r\n    box-shadow: 2px 2px 15px 2px #e3e3e3;\r\n}\r\n.selected-style {\r\n    background: #00BDFF;\r\n    color: #ffffff;\r\n}\r\n#h3Ele{\r\n    text-align: center;\r\n    padding: 10px;\r\n}\r\n\r\n\r\n\r\n@font-face {font-family: \"iconfont\";\r\n    src: url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.eot?t=1505291076294'); /* IE9*/\r\n    src: url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.eot?t=1505291076294#iefix') format('embedded-opentype'), /* IE6-IE8 */\r\n    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),\r\n    url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.ttf?t=1505291076294') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/\r\n    url('//at.alicdn.com/t/font_234130_nem7eskcrkpdgqfr.svg?t=1505291076294#iconfont') format('svg'); /* iOS 4.1- */\r\n  }\r\n  \r\n  .iconfont {\r\n    font-family:\"iconfont\" !important;\r\n    font-size:16px;\r\n    font-style:normal;\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\r\n  }\r\n  \r\n  .icon-115rightarrowheads:before { content: \"\\e79b\"; }\r\n  \r\n  .icon-111arrowheadright:before { content: \"\\e6db\"; }\r\n  \r\n  .icon-116leftarrowheads:before { content: \"\\e807\"; }\r\n  \r\n  .icon-112leftarrowhead:before { content: \"\\e6f6\"; }",undefined);

var params = {};

var Schedule = function (opt) {
    params = createParams.call(this, opt);
    this.init();

};
Schedule.prototype.init = function () {
    var {
        year, month, day,
        selectedDate,
        currentYear, currentMonth, currentDay,
        el, _this
   } = params;

    var scheduleHd = '<div class="schedule-hd">' +
        '<div>' +
        '<span class="arrow icon iconfont icon-116leftarrowheads" id="prevYear" ></span>' +
        '<span class="arrow icon iconfont icon-112leftarrowhead" id="prevMonth"></span>' +
        '</div>' +
        '<div class="today">' + formartDate(year, month, day, '-') + '</div>' +
        '<div>' +
        '<span class="arrow icon iconfont icon-111arrowheadright" id="nextMonth"></span>' +
        '<span class="arrow icon iconfont icon-115rightarrowheads" id="nextYear"></span>' +
        '</div>' +
        '</div>';
    var scheduleWeek = '<ul class="week-ul ul-box">' +
        '<li>日</li>' +
        '<li>一</li>' +
        '<li>二</li>' +
        '<li>三</li>' +
        '<li>四</li>' +
        '<li>五</li>' +
        '<li>六</li>' +
        '</ul>';
    var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>';

    var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>';
    el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
    _this.renderDate();
    _this.bindEvent();
};

Schedule.prototype.renderDate = function () {
    var {
         year, month, day,
        selectedDate,
        currentYear, currentMonth, currentDay,
        el, _this
    } = params;
    // debugger
    var fullDay = getCurrentMonthDateCount(year, month), //当月总天数
        startWeek = getWeekDay(year, month, 1), //当月第一天是周几
        total = (fullDay + startWeek) % 7 == 0 ?
            (fullDay + startWeek)
            :
            fullDay + startWeek + (7 - (fullDay + startWeek) % 7),//元素总个数
        lastMonthDay = getCurrentMonthDateCount(year, month - 1), //上月最后一天
        eleTemp = [];

    for (var i = 0; i < total; i++) {
        if (i < startWeek) {
            eleTemp.push('<li class="other-month"><span class="dayStyle">' + (lastMonthDay - startWeek + 1 + i) + '</span></li>');
        } else if (i < (startWeek + fullDay)) {
            var nowDate = formartDate(year, month, (i + 1 - startWeek), '-');
            var addClass = '';
            selectedDate == nowDate && (addClass = 'selected-style');
            formartDate(currentYear, currentMonth, currentDay, '-') == nowDate && (addClass = 'today-flag');
            eleTemp.push('<li class="current-month" ><span title=' + nowDate + ' class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>');
        } else {
            eleTemp.push('<li class="other-month"><span class="dayStyle">' + (i + 1 - (startWeek + fullDay)) + '</span></li>');
        }
    }
    el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
    el.querySelector('.today').innerHTML = formartDate(year, month, day, '-');


};

Schedule.prototype.bindEvent = function () {
    var {
        year, month, day,
        selectedDate,
        currentYear, currentMonth, currentDay,
        el, _this, opt
   } = params;

    el.addEventListener('click', function (e) {
        switch (e.target.id) {
            case 'nextMonth':
                _this.nextMonthFun();
                break;
            case 'nextYear':
                _this.nextYearFun();
                break;
            case 'prevMonth':
                _this.prevMonthFun();
                break;
            case 'prevYear':
                _this.prevYearFun();
                break;
            default:
                break;
        }
        if (e.target.className.indexOf('currentDate') > -1) {
            opt.clickCb && opt.clickCb(year, month + 1, e.target.innerHTML);
            selectedDate = e.target.title;
            day = e.target.innerHTML;
            _this.renderDate();
        }
    }, false);
};

Schedule.prototype.nextMonthFun = function () {
    var {
        year, month, day,
        selectedDate,
        currentYear, currentMonth, currentDay,
        el, _this, opt
   } = params;

    if (month > 11) {
        params.year += 1;
        params.month = 1;
    } else {
        params.month += 1;
    }
    _this.renderDate();
    opt.nextMonthCb && opt.nextMonthCb(params.year, params.month, params.day);
};

Schedule.prototype.nextYearFun = function () {
    var {
        year, month, day,
        selectedDate,
        currentYear, currentMonth, currentDay,
        el, _this, opt
   } = params;

    params.year += 1;
    _this.renderDate();
    opt.nextYeayCb && opt.nextYeayCb(params.year, params.month, params.day);
};

Schedule.prototype.prevMonthFun = function () {
    var {
        year, month, day,
        selectedDate,
        currentYear, currentMonth, currentDay,
        el, _this, opt
   } = params;

    if (month - 2 < 0) {
        params.year -= 1;
        params.month = 12;
    } else {
        params.month -= 1;
    }
    _this.renderDate();
    opt.prevMonthCb && opt.prevMonthCb(params.year, params.month, params.day);
};
Schedule.prototype.prevYearFun = function () {
    var {
        year, month, day,
        selectedDate,
        currentYear, currentMonth, currentDay,
        el, _this, opt
   } = params;

    params.year -= 1;
    _this.renderDate();
    opt.prevYearCb && opt.prevYearCb(params.year, params.month, params.day);
};

window.Schedule = Schedule;

return Schedule;

})));

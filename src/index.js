import { query } from './dom'
import {
    formartDate,
    getCurrentMonthDateCount,
    getWeekDay
} from './time'
import createParams from './params.js'
import './date.css'

var params = {}

var Schedule = function (opt) {
    params = createParams.call(this, opt)
    this.init();

}
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
        '</div>'
    var scheduleWeek = '<ul class="week-ul ul-box">' +
        '<li>日</li>' +
        '<li>一</li>' +
        '<li>二</li>' +
        '<li>三</li>' +
        '<li>四</li>' +
        '<li>五</li>' +
        '<li>六</li>' +
        '</ul>'
    var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>';

    var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>';
    el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
    _this.renderDate();
    _this.bindEvent()
}

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
            eleTemp.push('<li class="other-month"><span class="dayStyle">' + (lastMonthDay - startWeek + 1 + i) + '</span></li>')
        } else if (i < (startWeek + fullDay)) {
            var nowDate = formartDate(year, month, (i + 1 - startWeek), '-');
            var addClass = '';
            selectedDate == nowDate && (addClass = 'selected-style');
            formartDate(currentYear, currentMonth, currentDay, '-') == nowDate && (addClass = 'today-flag');
            eleTemp.push('<li class="current-month" ><span title=' + nowDate + ' class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>')
        } else {
            eleTemp.push('<li class="other-month"><span class="dayStyle">' + (i + 1 - (startWeek + fullDay)) + '</span></li>')
        }
    }
    el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
    el.querySelector('.today').innerHTML = formartDate(year, month, day, '-');


}

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
        };
        if (e.target.className.indexOf('currentDate') > -1) {
            opt.clickCb && opt.clickCb(year, month + 1, e.target.innerHTML);
            selectedDate = e.target.title;
            day = e.target.innerHTML;
            _this.renderDate();
        }
    }, false)
}

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
}
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
}

window.Schedule = Schedule;
export default Schedule
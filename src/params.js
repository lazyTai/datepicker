import { query } from './dom'

function createParams(opt) {
    var { el } = opt;
    var _el = query(el);
    var curDate = null;
    if (!opt.date) {
        curDate = new Date();
    } else {
        curDate = new Date(opt.date)
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

export default createParams
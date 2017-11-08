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
    var fullDay = new Date(year, month, 0).getDate()//当月总天数
    return fullDay
}


function getWeekDay(_year, _month, _day) {
    return new Date(_year, _month-1, _day).getDay()
}
export {
    formartDate,
    getCurrentMonthDateCount,
    getWeekDay
}
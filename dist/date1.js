(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.tai_date = factory();
})(this, function () {
	'use strict';

	//日期格式化

	var Schedule = function () {
		console.log("hello");
	};
	window.Schedule = Schedule;

	return Schedule;
});
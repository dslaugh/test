var App = {};

App.Calc = (function() {
	'use strict';
	
	var add = function(num1, num2) {
		return parseInt(num1, 10) + parseInt(num2, 10);
	};

	var multiply = function(num1, num2) {
		return parseInt(num1, 10) * parseInt(num2, 10);
	};

	return {
		add: add,
		multiply: multiply
	};
})();
var App = {};

App.Calc = (function() {
	'use strict';
	
	var add = function(num1, num2) {
		return parseInt(num1) + parseInt(num2);
	}

	var multiply = function(num1, num2) {
		return parseInt(num1) * parseInt(num2);
	}

	return {
		add: add,
		multiply: multiply
	};
})();


console.log(App.Calc.multiply(2, 2));
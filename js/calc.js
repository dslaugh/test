var App = {};
/**
    Utility methods for calculating numbers

    @class App.Calc
    @static
*/
App.Calc = (function() {
	'use strict';
	
    /**
        Adds two numbers together
        
        @method add
        @param {String} num1 First number
        @param {String} num2 Second number
        @return {Integer} Sum of two numbers
    */
	var add = function(num1, num2) {
		return parseInt(num1, 10) + parseInt(num2, 10);
	};

    /**
        Multiplies two numbers together
        
        @method multiply
        @param {String} num1 First number
        @param {String} num2 Second number
        @return {Integer} The result of two numbers multiplied together
    */
	var multiply = function(num1, num2) {
		return parseInt(num1, 10) * parseInt(num2, 10);
	};

    var pow = function(num, power) {
        var i=1, total=1;
        for(i; i<=power; i++) {
            total = total * num;
        }
        return total;
    };

	return {
		add: add,
		multiply: multiply,
        pow: pow
	};
})();
module.exports = App; 
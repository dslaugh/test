var assert = require("assert");
var App = require('../calc');

describe('Calc', function(){
    describe('#add()', function(){
        it('should add two numbers together', function(){
            assert.equal(App.Calc.add(1,1), 2, '1 + 1 = 2');
            assert.notEqual(App.Calc.add(2,2), 5, '2 + 2 != 5');
        });
    });

    describe('#multiply()', function() {
        it('should multiply two numbers', function() {
            assert.equal(App.Calc.multiply(2,2), 4, '2 * 2 = 4');
            assert.equal(App.Calc.multiply(4,4), 16, '4 * 4 = 16');
        });
    });

    describe("#pow()", function() {
        it('should work', function() {
            assert.equal(App.Calc.pow(2, 3), 8);
            assert.equal(App.Calc.pow(5, 2), 25);
            assert.equal(App.Calc.pow(3, 3), 27);
            assert.equal(App.Calc.pow(3, 3), Math.pow(3,3));
        });
    });
});

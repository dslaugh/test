// https://egghead.io/lessons/javascript-redux-writing-a-counter-reducer-with-tests

var Redux = require('redux');
var createStore = Redux.createStore;
var assert = require('chai').assert;

function counter(state, action) {
	if (state === undefined) {
		state = 0;
	}

	if (action.type === 'INCREMENT') {
		return state + 1;
	} else if (action.type === 'DECREMENT') {
		return state - 1;
	} else {
		return state;
	}
}

var store = createStore(counter);
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());

describe('counter', function() {
	it('should increment', function() {
		var test = counter(0, { type: 'INCREMENT' });
		assert.equal(test, 1);
	});

	it('should increment', function() {
		var test2 = counter(1, { type: 'INCREMENT' });
		assert.equal(test2, 2);
	});

	it('should decrement', function() {
		var test3 = counter(2, { type: 'DECREMENT' });
		assert.equal(test3, 1);
	});
	
	it('should pass back the original state if action type is not recognized', function() {
		var test4 = counter(1, { type: 'UNKNOWN' });
		assert.equal(test4, 1);
	});
	
	it('should set initial state if state is undefined', function() {
		var test5 = counter(undefined, {});
		assert.equal(test5, 0);
	});
});

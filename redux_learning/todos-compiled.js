'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var deepFreeze = require('deep-freeze');
var assert = require('chai').assert;
var expect = require('chai').expect;

var todo = function todo(state, action) {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return state;
			}

			return _extends({}, state, {
				completed: !state.completed
			});
		default:
			return state;
	}
};

var todos = function todos() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'ADD_TODO':
			return [].concat(_toConsumableArray(state), [todo(undefined, action)]);
		case 'TOGGLE_TODO':
			return state.map(function (t) {
				return todo(t, action);
			});
		default:
			return state;
	}
};

describe('todos', function () {
	it('should add a todo', function () {
		var stateBefore = [];
		var action = {
			type: 'ADD_TODO',
			id: 0,
			text: 'Learn Redux'
		};
		var stateAfter = [{
			id: 0,
			text: 'Learn Redux',
			completed: false
		}];

		deepFreeze(stateBefore);
		deepFreeze(action);

		assert.deepEqual(todos(stateBefore, action), stateAfter);
	});

	it('should toggle a todo', function () {
		var stateBefore = [{
			id: 0,
			text: 'Learn Redux',
			completed: false
		}, {
			id: 1,
			text: 'Go shopping',
			completed: false
		}];

		var action = {
			type: 'TOGGLE_TODO',
			id: 1
		};

		var stateAfter = [{
			id: 0,
			text: 'Learn Redux',
			completed: false
		}, {
			id: 1,
			text: 'Go shopping',
			completed: true
		}];

		deepFreeze(stateBefore);
		deepFreeze(action);

		assert.deepEqual(todos(stateBefore, action), stateAfter);
	});
});

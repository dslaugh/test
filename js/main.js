var TESTJS = (function() {
	var setContainer = function(container) {
		TESTJS.prototype.container = container;
	};

	var createElement = function() {
		var new_element = document.createElement('div');
		new_element.className = 'bubble';
		return new_element;
	}

	var addElement = function(element) {
		TESTJS.prototype.container.append(element);
	};

	var removeElement = function(element) {
		element.remove();
	};

	var moveElement = function(element, left, top) {
		element.style.left = parseInt(element.style	.left + left) + 'px';
		element.style.top = parseInt(element.style.top + top) + 'px';
		return element;
	};

	var init = function() {
		setContainer($("#main_container"));
		var test = createElement();
		addElement(test);
	};

	var TESTJS = function() {}

	TESTJS.prototype = {
		container: undefined,
		init: init,
		setContainer: setContainer,
		createElement: createElement,
		addElement: addElement,
		removeElement: removeElement,
		moveElement: moveElement

	};

	return TESTJS;
})();

var tj = new TESTJS();
tj.init();
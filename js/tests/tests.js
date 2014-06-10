// QUnit.module('A', {
// 	setup: function() {
// 		var tj = new TESTJS();
// 	},
// 	teardown: function() {
// 		$('.bubble').remove();
// 		tj.setContainer(undefined);
// 	}
// });
// test('There is a main container', function() {
// 	ok($('#main_container'), 'There is a main container');
// });

// test('TESTJS exists', function() {
// 	ok(tj instanceof TESTJS);
// });

// test('TESTJS has a setContainer function', function() {
// 	equal(typeof tj.setContainer, 'function');
// })

// test('TESTJS.setContainer sets the container', function() {
// 	expect(2);

// 	var container_before = tj.container;

// 	equal(container_before, undefined, 'container before is undefined');

// 	tj.setContainer($('#main_container'));
// 	var container_after = tj.container;

// 	deepEqual(container_after, $('#main_container'), 'container after is correct');	
// });




// QUnit.module('B', {
// 	setup: function() {
// 		var tj = new TESTJS();
// 		tj.setContainer($('#main_container'));
// 	},
// 	teardown: function() {
// 		$('.bubble').remove();
// 		tj.setContainer(undefined);
// 	}
// });

// test('TESTJS has a createElement function', function() {
// 	equal(typeof tj.createElement, 'function');
// });

// test('TESTJS.createElement creates an element', function() {
// 	var new_element = tj.createElement();
// 	var expected_element = document.createElement('div');
// 	expected_element.className = 'bubble';
// 	deepEqual(new_element, expected_element);
// });

// test('TESTJS has an addElement function', function() {
// 	equal(typeof tj.addElement, 'function');
// });


// test('TESTJS.addElement() adds an element', function() {
// 	var new_element = tj.createElement();
// 	tj.addElement(new_element);

// 	ok($('#main_container > .bubble')[0]);
// });

// test('TESTJS.removeElement is a function', function() {
// 	equal(typeof tj.removeElement, 'function');
// });





// QUnit.module('C', {
// 	setup: function() {
// 		var tj = new TESTJS();
// 		tj.setContainer($('#main_container'));
// 	},
// 	teardown: function() {
// 		//tj.setContainer(undefined);
// 	}
// });

// test('TESTJS.moveElement is a function', function() {
// 	equal(typeof tj.moveElement, 'function');
// });

// test('TESTJS.moveElement moves the element', function() {
// 	var elem = tj.createElement();
// 	tj.addElement(elem);
// 	tj.moveElement(elem, 100, 100);
// 	ok(true);
// });
var App = {};

App.Element = (function(document) {
	'use strict';

	var e = function(options) {

		var el = document.createElement(options.type);
		if (options.html) {
			el.innerHTML = options.html;
		}
		if (options.class instanceof Array) {
			el.className = options.class.join(' ');
		}
		if (options.attributes instanceof Object) {
			for (var att in options.attributes) {
				el.setAttribute(att, options.attributes[att]);
			}
		}
		
		return el;
	};

	return {
		e: e
	};
})(document);

var formOptions = {
	type: 'form',
	attributes: {
		'action': '/',
		'method': 'GET'
	}

};
var f = App.Element.e(formOptions);

var inputOptions = {
	type: 'input',
	attributes: {
		'type': 'text',
		'name': 'my_name'
	}
};

var i = App.Element.e(inputOptions);

var submitOptions = {
	type: 'button',
	html: 'Submit',
	attributes: {
		'type': 'submit'
	}
};

var s = App.Element.e(submitOptions);

f.appendChild(i);
f.appendChild(s);
document.querySelector('body').appendChild(f);

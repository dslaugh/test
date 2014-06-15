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
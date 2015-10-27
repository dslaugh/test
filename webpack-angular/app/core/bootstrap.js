'use strict';
require('./vendor')();
/*jshint browser:true */

var appModule = require('../index');

angular.element(document).ready(function() {
	angular.bootstrap(document, [appModule.name], {
		//strictDi: true;
	});
});
'use strict';
require('./vendor')();
var appModule = require('../index');
/*jshint browser:true */

var appModule = require('../index');

angular.element(document).ready(function() {
	angular.bootstrap(document, [appModule.name], {
		//strictDi: true;
	});
});
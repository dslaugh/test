var _ = require('underscore');

module.exports = function(values) {
	var foundSuperman = false;

    _.find(values, function(name) {
		if (name === 'Clark Kent') {
            foundSuperman = true;
		}
	});

    return foundSuperman;
};

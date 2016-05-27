angular.module('simple_services', [])
.service('locStore', [function() {
    return {
        set: function(name, data) {
    		window.localStorage.setItem(name, JSON.stringify(data));
    	},
        get: function(name) {
    		return JSON.parse(window.localStorage.getItem(name));
    	},
        remove: function(name) {
            window.localStorage.removeItem(name);
    	}
    };
}]);

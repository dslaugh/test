var CustomEvents = function() {
	var subscribers = {};
	return {
		on: function(topic, fn) {
			if (typeof topic === 'string' && typeof fn === 'function') {
				subscribers[topic] = subscribers[topic] || [];
				subscribers[topic].push(fn);
			}
		},
		off: function(topic, fn) {
			subscribers[topic].splice(subscribers[topic].indexOf(fn), 1);
		},
		emit: function(topic, data) {
			subscribers[topic].forEach(function(fn) {
				fn(data);
			});
		}
	}
};

var Model = {
	names: [],
	events: CustomEvents(),
	addName: function(name) {
		this.names.push(name);
		this.events.emit('name-added', Model.names);
	},
	removeName: function(name) {
		var nameToRemoveIndex = this.names.indexOf(name);
		this.names.splice(nameToRemoveIndex, 1);
		this.events.emit('name-removed', Model.names);
	}
};

var View = {
	nameInput: document.querySelector('#name'),
	nameList: document.querySelector('#names'),
	renderNames: function(names) {
		View.nameList.innerHTML = names.reduce(function(prev, curr) {
			return prev + '<li class="names-item">' + curr + '</li>';
		}, '');
	},
	resetNameInput: function() {
		View.nameInput.value = '';
	},
	bindUIEvents: function() {
		this.nameInput.addEventListener('change', Controller.addName);
		this.nameList.addEventListener('dblclick', function(e) {
			if (e.target.className.match(/names-item/)) {
				Controller.removeName(e);
			}
		});
	}
};

var Controller = {
	initialize: function() {
		Model.events.on('name-added', View.renderNames);
		Model.events.on('name-removed', View.renderNames);
		Model.events.on('name-added', View.resetNameInput);
		View.bindUIEvents();
	},
	addName: function(e) {
		Model.addName(e.target.value);
	},
	removeName: function(e) {
		Model.removeName(e.target.innerText);
	}
};

Controller.initialize();
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
		this.events.emit('name-added');
	}
};

var View = {
	nameInput: document.getElementById('name'),
	nameList: document.getElementById('names'),
	renderNames: function() {
		View.nameList.innerHTML = Model.names.reduce(function(prev, curr) {
			return prev + '<li>' + curr + '</li>';
		}, '');
	},
	resetNameInput: function() {
		View.nameInput.value = '';
	}
};

var Controller = {
	handleAddName: function(e) {
		Model.addName(e.target.value);
	},
};

Model.events.on('name-added', View.renderNames);
Model.events.on('name-added', View.resetNameInput);

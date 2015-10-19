/* Characters:

The Action Creator.
	Creates all the actions for your project.
	Creates an action with a type and a payload.
	It creates an action and then passes that to the dispatcher.

The Dispatcher.
	Basically a registry of callbacks.
	Keeps a list of all the stores that it needs to send actions to.
	When an action comes in, it will pass it to all the necessary stores.
	Sends actions to all stores. The store decides if it needs to do anything with the action.

The Store.
	Holds on to all state in the application.
	Holds all state changing logic.
	All state changes must be made through the store.
	Once state has been changed, it emits a change event to notify the controller view.

The Controller View and the View.
	In charge of taking the state and rendering it for the user.
	In charge of taking user input.
	The controller view is like a middle manager between the store and the view.
	The controller view takes state changes and passes them along to it's child views.

*/

/* The Setup
The application initialization. It only happens once.

1. Stores let the dispatcher know that they want to be notified whenever an action comes in.
2. Then the controller views ask the stores for the latest state.
3. When the stores give the state to the controller views, they pass that state along to their child views to render.
4. The controller views also ask the stores to keep them notified when state changes.

*/

/* The Data Flow
Once the setup is done, the application is ready to accept user input.

1. The view tells The Action Creator to prepare an action.
2. The Action Creator prepares the action and sends it off to The Dispatcher.
3. The Dispatcher sends the action off to The Stores in sequence. Each Store gets notified of all actions.
	Then it decides whether it cares about this one or not and changes the state accordingly.
4. Once it's done changing state, The Store lets it's subscribed View Controllers know.
5. Those View Controllers will then ask The Store to give them the updated state.
6. After The Store gives it the state, the view controller will tell it's child Views to rerender based on the new state.


*/

function extend(consumer, provider) {
	for(key in provider) {
		if (provider.hasOwnProperty(key)) {
			consumer[key] = provider[key];
		}
	}
	return consumer;
}

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
	};
};

var actionCreator = function(e, type) {
	var action;
	if (type === 'name-added') {
		action = {type: type, data: e.target.value};
	}
	dispatcher.emit('action-received', action);
};

var dispatcher = CustomEvents();

var nameStore = Object.create(CustomEvents());
extend(nameStore, {
	names: [],
	notify: function(action) {
		if (action.type === 'name-added') {
			nameStore.names.push(action.data);
			nameStore.emit('name-added');
		}
	},
	getNames: function() {
		return nameStore.names;
	}
});
// nameStore.names = [];
// nameStore.notify = function(action) {
// 	if (action.type === 'name-added') {
// 		nameStore.names.push(action.data);
// 		nameStore.emit('name-added');
// 	}
// };
// nameStore.getNames = function() {
// 	return nameStore.names;
// };

var nameControllerView = {
	notify: function() {
		var names = nameStore.getNames();
		var namesDOM = names.reduce(function(prevVal, currVal) {
			return prevVal + '<li>' + currVal + '</li>';
		}, '');

		document.getElementById('names').innerHTML = namesDOM;
	}
};

var textInputControllerView = {
	notify: function() {
		document.getElementById('name').value = '';
	}
};


var initialize = function() {
	dispatcher.on('action-received', nameStore.notify);
	nameStore.on('name-added', nameControllerView.notify);
	nameStore.on('name-added', textInputControllerView.notify);
};

initialize();
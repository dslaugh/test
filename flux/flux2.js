'use strict';
// This is from the pluralsight videos with some of my own implementations.
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

var ActionTypes = {
	CREATE_AUTHOR: 'CREATE_AUTHOR'
};

var Dispatcher = CustomEvents();

var AuthorActions = {
	createAuthor: function(e) {
		var author = e.target.value;

		// Hey dispatcher, go tell all the stores that an author was just created.
		Dispatcher.emit('action-received', {
			actionType: ActionTypes.CREATE_AUTHOR,
			author: author
		});
	}
};


var AuthorStore = Object.create(CustomEvents());
AuthorStore._authors = [];
AuthorStore.addChangeListener = function(callback) {
	this.on('change', callback);
};
AuthorStore.removeChangeListener = function(callback) {
	this.off('change', callback);
};
AuthorStore.emitChange = function() {
	this.emit('change');
};
AuthorStore.getAllAuthors = function() {
	return this._authors;
};
AuthorStore.getAuthorById = function(id) {
	return AuthorStore._authors.filter(function(author) {
		return author.id = id;
	});
};
AuthorStore.addAuthor = function(author) {
	var id = this._authors.length + 1;
	var newAuthor = {id: id, name: author};
	this._authors.push(newAuthor);
};

Dispatcher.on('action-received', function(action) {
	switch(action.actionType) {
		case ActionTypes.CREATE_AUTHOR:
			AuthorStore.addAuthor(action.author);
			AuthorStore.emitChange();
			break;
		default:
			break;
	}
});

var AuthorView = {
	inputField: document.querySelector('#AuthorName'),
	authorList: document.querySelector('#Authors'),
	renderAuthors: function() {
		var authors = AuthorStore.getAllAuthors();
		var authorHtml = authors.reduce(function(prevVal, currVal) {
			return prevVal + '<div>' + currVal.id + ' - ' + currVal.name + '</div>';
		}, '');
		AuthorView.authorList.innerHTML = authorHtml;
	},
	resetInput: function() {
		AuthorView.inputField.value = '';
	}
};

AuthorStore.addChangeListener(AuthorView.renderAuthors);
AuthorStore.addChangeListener(AuthorView.resetInput);

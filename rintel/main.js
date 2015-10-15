rintel = {};
rintel.setupUserMentions = function(options) {
	var defaultOptions = {
		userMentionsHiddenField: '#UserMentions',
		bodyNotificationsContainer: '#BodyNotifications',
		intelNotificationsContainer: '#IntelNotifications',
		headlineNotificationsContainer: '#HeadlineNotifications',
	};

	options = $.extend(defaultOptions, options);

	var _userMentions = {};
	var _intelMentions = [];
	var _headlineMentions = [];
	var _bodyMentions = [];

	// Handle notification deletes
	$(options.bodyNotificationsContainer).on('click', '.user-notification-delete', _deleteBodyNotification);
	$(options.intelNotificationsContainer).on('click', '.user-notification-delete', _deleteIntelNotification);
	$(options.headlineNotificationsContainer).on('click', '.user-notification-delete', _deleteHeadlineNotification);

	// Handle deleting notifications when the x is clicked
	function _deleteBodyNotification() {
		var $this = $(this);
		var userId = $this.attr('data-user-id');
		_removeFromBodyMentions(userId);
		_removeFromUserNotification(userId);
		$this.parent().remove();		
	}
	function _deleteIntelNotification() {
		var $this = $(this);
		var userId = $this.attr('data-user-id');
		_removeFromIntelMentions(userId);
		_removeFromUserNotification(userId);
		$this.parent().remove();		
	}
	function _deleteHeadlineNotification() {
		var $this = $(this);
		var userId = $this.attr('data-user-id');
		_removeFromHeadlineMentions(userId);
		_removeFromUserNotification(userId);
		$this.parent().remove();		
	}

	function _removeFromBodyMentions(userId) {
		this._bodyMentions.splice(this._bodyMentions.indexOf(userId), 1);
		if (this._bodyMentions.length === 0) {
			$(options.bodyNotificationsContainer).hide();
		}
	}
	function _removeFromIntelMentions(userId) {
		this._intelMentions.splice(this._intelMentions.indexOf(userId), 1);
		if (this._intelMentions.length === 0) {
			$(options.intelNotificationsContainer).hide();
		}
	}
	function _removeFromHeadlineMentions(userId) {
		this._headlineMentions.splice(this._headlineMentions.indexOf(userId), 1);
		
		if (this._headlineMentions.length === 0) {
			$(options.headlineNotificationsContainer).hide();
		}
	}

	// remove users from objects/arrays
	function _removeFromUserNotification(userId) {
		// If it's still in one of the other sections, don't delete it.
		if (!(this._inBodyMentions(userId) || this._inIntelMentions(userId) || this._inHeadlineMentions(userId))) {
			for (var user in this._userMentions) {
				if (this._userMentions.hasOwnProperty(user)) {
					if (this._userMentions[user] === userId) {
						delete this._userMentions[user];
					}
				}
			}
			this._setUserMentionsInHiddenInput();
		}
	}

	function _inBodyMentions(userId) {
		return this._bodyMentions.indexOf(userId) !== -1;
	}
	function _inIntelMentions(userId) {
		return this._intelMentions.indexOf(userId) !== -1;
	}
	function _inHeadlineMentions(userId) {
		return this._headlineMentions.indexOf(userId) !== -1;
	}

	function _setUserMentionsInHiddenInput() {
		$(options.userMentionsHiddenField).val(JSON.stringify(this._userMentions));
	}

	function processBodyMention(value, $li) {
		var itemData = $li.data('item-data');
		this._addToBodyNotifications(itemData);
		return value;
	}
	function processIntelMention(value, $li) {
		var itemData = $li.data('item-data');
		this._addToIntelNotifications(itemData);
		return value;
	}
	function processHeadlineMention(value, $li) {
		var itemData = $li.data('item-data');
		console.log(this);
		this._addToHeadlineNotifications(itemData);
		return value;
	}

	function _addToBodyNotifications(itemData) {
		var userId = itemData['id'];
		if (_bodyMentions.indexOf(userId) === -1) {
			var $mention = this._createNotificationBox(itemData);
			$(options.bodyNotificationsContainer).find('.user-notification-box').append($mention);
			$(options.bodyNotificationsContainer).show();
			this._bodyMentions.push(userId);
			this._updateUserMentions(itemData);
		}
	}
	function _addToIntelNotifications(itemData) {
		var userId = itemData['id'];
		if (_intelMentions.indexOf(userId) === -1) {
			var $mention = this._createNotificationBox(itemData);
			$(options.intelNotificationsContainer).find('.user-notification-box').append($mention);
			$(options.intelNotificationsContainer).show();
			this._intelMentions.push(userId);
			this._updateUserMentions(itemData);
		}
	}
	function _addToHeadlineNotifications(itemData) {
		var userId = itemData['id'];
		if (_headlineMentions.indexOf(userId) === -1) {
			var $mention = this._createNotificationBox(itemData);
			$(options.headlineNotificationsContainer).find('.user-notification-box').append($mention);
			$(options.headlineNotificationsContainer).show();
			this._headlineMentions.push(userId);
			this._updateUserMentions(itemData);
		}
	}

	function _updateUserMentions(itemData) {
		this._userMentions[itemData['name']] = itemData['id'].toString();
		this._setUserMentionsInHiddenInput();
	}

	function _createNotificationBox(itemData) {
		var $mention = $('<li />');
		$mention.addClass('user-notification-box-item sugg-box-item');

		var $label = $('<span />');
		$label.addClass('user-notification-label');
		$label.text(itemData['name']);

		var $deleteBtn = $('<span />');
		$deleteBtn.addClass('user-notification-delete sugg-remove');
		$deleteBtn.attr('data-user-id', itemData['id']);
		$deleteBtn.attr('title', 'Remove Notification');
		$deleteBtn.text('x');
		$mention.append($label).append($deleteBtn);

		return $mention;			
	}

	function getBodyLength($editor) {
		// tinyMce inserts this in when the field is empty
		var TINY_MCE_EMPTY_PLACEHOLDER = '<br data-mce-bogus="1">';
		var bodyHtml = $editor[0].innerHTML;
		if (bodyHtml === TINY_MCE_EMPTY_PLACEHOLDER) {
			return 0;
		}
		return bodyHtml.length;
	}

	return {
		_userMentions: _userMentions,
		_intelMentions: _intelMentions,
		_headlineMentions: _headlineMentions,
		_bodyMentions: _bodyMentions,

		_deleteBodyNotification: _deleteBodyNotification,
		_deleteHeadlineNotification: _deleteHeadlineNotification,
		_deleteIntelNotification: _deleteIntelNotification,

		_removeFromBodyMentions: _removeFromBodyMentions, //
		_removeFromHeadlineMentions: _removeFromHeadlineMentions, //
		_removeFromIntelMentions: _removeFromIntelMentions, //

		_removeFromUserNotification: _removeFromUserNotification, //

		_inBodyMentions: _inBodyMentions, //
		_inHeadlineMentions: _inHeadlineMentions, //
		_inIntelMentions: _inIntelMentions, //

		_setUserMentionsInHiddenInput: _setUserMentionsInHiddenInput, //

		_addToBodyNotifications: _addToBodyNotifications, //
		_addToHeadlineNotifications: _addToHeadlineNotifications, //
		_addToIntelNotifications: _addToIntelNotifications, //

		_updateUserMentions, _updateUserMentions,
		_createNotificationBox: _createNotificationBox, //




		processBodyMention: processBodyMention,
		processIntelMention: processIntelMention,
		processHeadlineMention: processHeadlineMention,
		getBodyLength: getBodyLength
	};

};
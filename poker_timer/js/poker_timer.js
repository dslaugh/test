// A place to display remaining time
// A place to display blinds
// An input to set round time. Default to 20 minutes or something.
// Hardcode blind increments. Maybe in the future add something to set custom blind schedule.
// A start button. Maybe have a pause button.
// A reset button.

// When timer gets close to zero, flash and make a sound.
// When timer gets to zero, make a sound and reset the timer, increase blinds.

// In the future maybe incorporate intermissions.

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
            if (subscribers[topic]) {
                subscribers[topic].forEach(function(fn) {
                    fn(data);
                });
            }
        }
    };
};

function zeroPad(num) {
	return num < 10 ? '0' + num : num;
}

var Model =  {
	events: CustomEvents(),
	blindsSchedule: [
		{small: 1, big: 2},
		{small: 2, big: 4},
		{small: 5, big: 10}
	],
	currentBlindIndex: 0,
	roundTime: {
		minutes: 25,
		seconds: 0
	},
	currentRoundTime: {},
	initializeTimeRemaining: function() {
		this.currentRoundTime.minutes = this.roundTime.minutes;
		this.currentRoundTime.seconds = this.roundTime.seconds;
		this.events.emit('timeRemainingInitialized', this.currentRoundTime);		
	},
	resetCurrentRoundTime: function() {
		this.currentRoundTime.minutes = this.roundTime.minutes;
		this.currentRoundTime.seconds = this.roundTime.seconds;
	},
	updateTimeRemaining: function() {
		if (this.currentRoundTime.seconds === 0) {
			if (this.currentRoundTime.minutes === 0) {
				this.resetCurrentRoundTime();
				this.events.emit('newRoundStarted');
			}
			this.currentRoundTime.minutes = this.currentRoundTime.minutes - 1;
			this.currentRoundTime.seconds = 59;
		} else {
			this.currentRoundTime.seconds = this.currentRoundTime.seconds - 1;
		}
		this.events.emit('timeUpdated', this.currentRoundTime);
	},
	initializeBlinds: function() {
		this.events.emit('blindsInitialized', this.blindsSchedule[this.currentBlindIndex]);
	},
	incrementCurrentBlind: function() {
		this.currentBlindIndex = this.currentBlindIndex + 1;
		if (this.blindsSchedule[this.currentBlindIndex] === undefined) {
			var lastBlinds = this.blindsSchedule[this.currentBlindIndex - 1];
			var newBlinds = {
				small: lastBlinds.small * 2,
				big : lastBlinds.big * 2
			};
			this.blindsSchedule.push(newBlinds);
		}
		this.events.emit('blindsIncremented', this.blindsSchedule[this.currentBlindIndex]);
	},
};

var View = {
	dom: {
		'timeRemaining': document.querySelector('#TimeRemaining'),
		'blindsSchedule': document.querySelector('#BlindsSchedule'),
		'startBtn': document.querySelector('#StartBtn'),
	},
	bindUIEvents: function() {
		this.dom.startBtn.addEventListener('click', Controller.start.bind(Controller));
	},
	renderTimeRemaining: function(timeRemaining) {
		this.dom.timeRemaining.innerHTML = timeRemaining.minutes + ':' + zeroPad(timeRemaining.seconds);
	},
	renderBlinds: function(currentBlinds) {
		this.dom.blindsSchedule.innerHTML = currentBlinds.small + ' and ' + currentBlinds.big;
	}
};

var Controller = {
	timer: undefined,
	initialize: function() {
		Model.events.on('timeRemainingInitialized', View.renderTimeRemaining.bind(View));
		Model.events.on('blindsInitialized', View.renderBlinds.bind(View));
		Model.events.on('timeUpdated', View.renderTimeRemaining.bind(View));
		Model.events.on('newRoundStarted', Model.incrementCurrentBlind.bind(Model));
		Model.events.on('blindsIncremented', View.renderBlinds.bind(View));

		Model.resetCurrentRoundTime();
		Model.initializeTimeRemaining();
		Model.initializeBlinds();
		View.bindUIEvents();
	},
	start: function() {
		this.timer = setInterval(function() {
			Model.updateTimeRemaining();
		}, 1000);
	}
};

Controller.initialize();

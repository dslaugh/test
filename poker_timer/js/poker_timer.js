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



var Model =  {
	events: CustomEvents(),
	blindsSchedule: [
		[1,2],
		[2,4],
		[5,10],
		[10,20],
		[20,40],
		[40,80],
		[80,160],
		[160,320],
		[320,640],
		[640,1280]
	],
	currentBlindIndex: 0,
	roundTime: 20,
	updateCurrentBlind: function() {
		this.currentBlindIndex = this.currentBlindIndex + 1;
	}
};

var View = {
	dom: {
		'timeRemaining': document.querySelector('#TimeRemaining'),
		'blindsSchedule': document.querySelector('#BlindsSchedule'),
		'startBtn': document.querySelector('#StartBtn'),
	},
	bindEvents: function() {
		this.dom.startBtn.addEventListener('click', Controller.start().bind(Controller));
	}

};

var Controller = {
	initialize: function() {
		console.log('Initialization started...');
	},
	start: function() {
		console.log('Starting');
	}
};

// Controller.initialize();

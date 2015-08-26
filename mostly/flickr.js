requirejs.config({
	paths: {
		ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
		jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
		moment: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment'
	}
});

require(
	[
		'ramda',
		'jquery',
		'moment'
	],
	function(_, $, moment) {
		var trace = _.curry(function(tag, x) {
			console.log(tag, x);
			return x;
		});

		//app goes here
		var Impure = {
			getJSON: _.curry(function(callback, url) {
				$.getJSON(url, callback);
			}),

			setHtml: _.curry(function(sel, html) {
				$(sel).html(html);
			})
		};

		var url = function(term) {
			return 'https://api.flickr.com/services/feeds/photos_public.gne?tags='+term+'&format=json&jsoncallback=?';
		};
		var img = function(url) {
			return $('<img />', {src: url});
		};

		var mediaUrl = _.compose(_.prop('m'), _.prop('media'));

		var mediaToImages = _.compose(img, mediaUrl);

		var images = _.compose(_.map(mediaToImages), _.prop('items'));

		var renderImages = _.compose(Impure.setHtml('.container'), images);

		var app = _.compose(Impure.getJSON(renderImages), url);

		$('.search').on('change', function() {
			var getSearchTerm = $$('.search').map(_.head).map(_.prop('value'));
			var runApp = _.compose(app, getSearchTerm.unsafePerformIO);
			runApp();
		});

		// Container or Identity Functor
		var Container = function(x) {
			this.__value = x;
		}
		Container.of = function(x) {
			return new Container(x);
		};
		Container.prototype.map = function(f) {
			return Container.of(f(this.__value));
		};

		var four = Container.of(2).map(function(two) {return two + 2;});
		// console.log(four);
		var x = Container.of('flamethrowers').map(function(x) {return x.toUpperCase();});
		// console.log(x);
		var length = Container.of('bombs').map(function(x) {return x.concat(' away')}).map(_.prop('length'));
		// console.log(length);

		// Maybe Functor
		var Maybe = function(x) {
			this.__value = x;
		};
		Maybe.of = function(x) {
			return new Maybe(x);
		};
		Maybe.prototype.isNothing = function(x) {
			return (this.__value === null || this.__value === undefined); 
		}
		Maybe.prototype.map = function(f) {
			return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
		};
		var maybeTest1 = Maybe.of('Malkovich Malkovich').map(_.match(/a/ig));
		console.log(maybeTest1);

		var maybeTest2 = Maybe.of(null).map(_.match(/a/ig));
		console.log(maybeTest2);

		var maybeTest3 = Maybe.of({name: 'Boris'}).map(_.prop('age')).map(_.add(10));
		console.log(maybeTest3);

		var maybeTest4 = Maybe.of({name: 'Dinah', age: 14}).map(_.prop('age')).map(_.add(10));
		console.log(maybeTest4);

		var map = _.curry(function(f, any_functor_at_all) {
			return any_functor_at_all.map(f);
		});

		var safeHead = function(xs) {
			return Maybe.of(xs[0]);
		};

		var streetName = _.compose(map(_.prop('street')), safeHead, _.prop('addresses'));

		var streetNameTest1 = streetName({addresses: []});
		console.log(streetNameTest1);

		var streetNameTest2 = streetName({addresses: [{street: 'Shady Lane', number: 4201}]});
		console.log(streetNameTest2);


		// Either functors
		// Left
		var Left = function(x) {
			this.__value = x;
		};
		Left.of = function(x) {
			return new Left(x);
		};
		Left.prototype.map = function(f) {
			return this;
		}

		// Right
		var Right = function(x) {
			this.__value = x;
		};
		Right.of = function(x) {
			return new Right(x);
		};
		Right.prototype.map = function(f) {
			return Right.of(f(this.__value));
		};

		var rightTest1 = Right.of('rain').map(function(str) {
			return 'b' + str;
		});
		console.log(rightTest1);

		var leftTest1 = Left.of('rain').map(function(str) {
			return 'b' + str;
		});
		console.log(leftTest1);

		var rightTest2 = Right.of({host: 'localhost', port: 80}).map(_.prop('host'));
		console.log(rightTest2);

		var leftTest2 = Left.of('rolls eyes...').map(_.prop('host'));
		console.log(leftTest2);

		var getAge = _.curry(function(now, user) {
			var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
			if (!birthdate.isValid()) {return Left.of('Birthdate could not be parsed');}
			return Right.of(now.diff(birthdate, 'years'));
		});

		var getAgeTest1 = getAge(moment(), {birthdate: '2005-12-12'});
		console.log(getAgeTest1);

		var getAgeTest2 = getAge(moment(), {birthdate: 2001070});
		console.log(getAgeTest2);

		var fortune = _.compose(_.concat('If you survive you will be '), _.add(1));

		var zoltar = _.compose(map(console.log.bind(console)), trace('after fortune'), map(fortune), getAge(moment()));
		zoltar({birthdate: '2005-12-12'});
		zoltar({birthdate: 'balloons'});

		var IO = function(f) {
			this.unsafePerformIO = f;
		};
		IO.of = function(x) {
			return new IO(function() {
				return x;
			});
		};
		IO.prototype.map = function(f) {
			return new IO(_.compose(f, this.unsafePerformIO));
		};



		var io_window = new IO(function() {return window;});
		var ioTest1 = io_window.map(function(win){return win.innerWidth;});
		console.log(ioTest1.unsafePerformIO());
		var ioTest2 = io_window.map(_.prop('location')).map(_.prop('href')).map(_.split('/'));
		console.log(ioTest2.unsafePerformIO());

		var $$ = function(selector) {
			return new IO(function() {
				return document.querySelectorAll(selector);
			});
		};

		var ioTest3 = $$('#myDiv').map(_.head).map(function(div) {return div.innerHTML;});
		console.log(ioTest3.unsafePerformIO());
	}
);
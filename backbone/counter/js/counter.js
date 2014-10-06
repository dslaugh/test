(function () {
    window.Counter = {
        Models: {},
        Collections: {},
        Views: {}
    };
    window.template = function(id) {
        return _.template($("#"+id).html);
    };

    Counter.Models.Count = Backbone.Model.extend({});

    Counter.Collections.Count = Backbone.Collection.extend({
        model: Counter.Models.Count
    });

    Counter.Views.Count = Backbone.View.extend({
        tagName: 'li',

        events: {
			'dblclick': function() {
				alert('I\'ve been clicked');
			}
        },

        render: function() {
            this.$el.html(this.model.get('counter_time'));
            return this;
        }
    });

    Counter.Views.Counts = Backbone.View.extend({
		tagName: 'ol',

		render: function() {
			// console.log(this.collection);
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(count) {
			var countView = new Counter.Views.Count({model: count});
			this.$el.append(countView.render().el);
		}
    });

    Counter.Views.CountButton = Backbone.View.extend({
		tagName: 'button',

		events: {
			'click': function() {
				alert('Increment count');
			}
		},

		render: function() {
			this.$el.html('Count');
			return this;
		}
    });

    $.ajax({
		url: '../ajax/get_counts.php',
		type: 'GET',
		data: {count_date: 'today'},
		success: function(response) {
			var counts = JSON.parse(response).results;
			var countsCollection = new Counter.Collections.Count(counts);
			var countsView = new Counter.Views.Counts({collection: countsCollection});
			var countButton = new Counter.Views.CountButton();
			$(document.body).append(countButton.render().el);
			$(document.body).append(countsView.render().el);
		}
    });
    
})();
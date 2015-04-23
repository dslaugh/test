var App = React.createClass({
	getInitialState: function() {
		return {
			red: 127,
			green: 127,
			blue: 127
		};
	},
	update: function(e) {
		this.setState({
			red: this.refs.red.refs.range.getDOMNode().value,
			green: this.refs.green.refs.range.getDOMNode().value,
			blue: this.refs.blue.refs.range.getDOMNode().value
		});
	},
	render: function() {
		return (
			<div>
				<Slider ref="red"  update={this.update} />
				<label>{this.state.red}</label>
				<Slider ref="green"  update={this.update} />
				<label>{this.state.green}</label>
				<Slider ref="blue"  update={this.update} />
				<label>{this.state.blue}</label>

				<div ref="block" style={{height: 100 + "px", width: 100 + "px", backgroundColor: "rgb(" + this.state.red + "," + this.state.green + "," + this.state.blue + ")"}}></div>
			</div>
		);
	}
});

var Slider = React.createClass({
	render: function() {
		return (
			<div>
				<input ref="range" type="range" min="0" max="255" onChange={this.props.update} />
			</div>
		);	
	}
});

React.render(<App txt="This is the props text" />, document.body);
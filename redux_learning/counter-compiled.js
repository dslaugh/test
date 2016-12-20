function counter(state = 0, action) {
	if (action.type === 'INCREMENT') {
		return state + 1;
	} else if (action.type === 'DECREMENT') {
		return state - 1;
	} else {
		return state;
	}
}

const Counter = ({
	value,
	onIncrement,
	onDecrement
}) => React.createElement(
	'div',
	null,
	React.createElement(
		'h1',
		null,
		value
	),
	React.createElement(
		'button',
		{ onClick: onIncrement },
		'+'
	),
	React.createElement(
		'button',
		{ onClick: onDecrement },
		'-'
	)
);

var { createStore } = Redux;
var store = createStore(counter);
var render = () => {
	ReactDOM.render(React.createElement(Counter, {
		value: store.getState(),
		onIncrement: () => store.dispatch({
			type: 'INCREMENT'
		}),
		onDecrement: () => store.dispatch({
			type: 'DECREMENT'
		})
	}), document.getElementById('root'));
};

store.subscribe(render);
render();

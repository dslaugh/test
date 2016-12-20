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
	onDecrement,
}) => (
	<div>
		<h1>{ value }</h1>
		<button onClick={onIncrement}>+</button>
		<button onClick={onDecrement}>-</button>
	</div>
);

var { createStore } = Redux;
var store = createStore(counter);
var render = () => {
	ReactDOM.render(
		<Counter 
			value={store.getState()} 
			onIncrement={() =>
				store.dispatch({
					type: 'INCREMENT',
				})
			}
			onDecrement={() =>
				store.dispatch({
					type: 'DECREMENT',
				})
			}
		/>,
		document.getElementById('root')
	);
};

store.subscribe(render);
render();


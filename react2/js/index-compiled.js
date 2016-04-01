'use strict';

var MySelect = React.createClass({
    displayName: 'MySelect',

    getInitialState: function getInitialState() {
        return { selected: false };
    },
    select: function select(event) {
        if (event.target.textContent === this.state.selected) {
            this.setState({ selected: false });
        } else {
            this.setState({ selected: event.target.textContent });
        }
    },
    render: function render() {
        var mySelectStyle = {
            border: '1px solid #999',
            display: 'inline-block',
            padding: '5px'
        };

        return React.createElement(
            'div',
            { style: mySelectStyle },
            React.createElement(MyOption, { select: this.select, state: this.state.selected, value: 'Volvo' }),
            React.createElement(MyOption, { select: this.select, state: this.state.selected, value: 'Saab' }),
            React.createElement(MyOption, { select: this.select, state: this.state.selected, value: 'Mercedes' }),
            React.createElement(MyOption, { select: this.select, state: this.state.selected, value: 'Audi' })
        );
    }
});

var MyOption = React.createClass({
    displayName: 'MyOption',

    render: function render() {
        var selectedStyle = {
            'background-color': 'red',
            color: '#fff',
            cursor: 'pointer'
        };
        var unselectedStyle = {
            cursor: 'pointer'
        };
        if (this.props.value === this.props.state) {
            return React.createElement(
                'div',
                { style: selectedStyle, onClick: this.props.select },
                this.props.value
            );
        } else {
            return React.createElement(
                'div',
                { style: unselectedStyle, onClick: this.props.select },
                this.props.value
            );
        }
    }
});

ReactDOM.render(React.createElement(MySelect, null), document.querySelector('#app'));

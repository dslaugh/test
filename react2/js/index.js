var MySelect = React.createClass({
    getInitialState: function() {
        return {selected: false};
    },
    select: function(event) {
        if (event.target.textContent === this.state.selected) {
            this.setState({selected: false});
        } else {
            this.setState({selected: event.target.textContent});
        }
    },
    render: function() {
        var mySelectStyle = {
            border: '1px solid #999',
            display: 'inline-block',
            padding: '5px'
        };

        return (
            <div style={mySelectStyle}>
                <MyOption select={this.select} state={this.state.selected} value="Volvo"></MyOption>
                <MyOption select={this.select} state={this.state.selected} value="Saab"></MyOption>
                <MyOption select={this.select} state={this.state.selected} value="Mercedes"></MyOption>
                <MyOption select={this.select} state={this.state.selected} value="Audi"></MyOption>
            </div>
        );
    }
});

var MyOption = React.createClass({
    render: function() {
        var selectedStyle = {
            'background-color': 'red',
            color: '#fff',
            cursor: 'pointer'
        };
        var unselectedStyle = {
            cursor: 'pointer'
        };
        if (this.props.value === this.props.state) {
            return <div style={selectedStyle} onClick={this.props.select}>{this.props.value}</div>;
        } else {
            return <div style={unselectedStyle} onClick={this.props.select}>{this.props.value}</div>;
        }
    }
});

ReactDOM.render(<MySelect />, document.querySelector('#app'));

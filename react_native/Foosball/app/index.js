import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	TextInput,
	Text,
} from 'react-native';

import { Provider } from 'react-redux';
import Redux from 'redux';

const styles = StyleSheet.create({
	main: {
		marginTop: 20,
		backgroundColor: '#efefef',
		padding: 5,
	},
});

export default class Foosball extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: 'Initial text',
		};
	}

	setText(text) {
		this.setState({text});
	}

	render() {
		return (
			<ScrollView style={ styles.main }>
				<TextInput
					style={{width: 300, height: 30, borderWidth: 1, borderColor: '#eeeeee'}}
					onChangeText={this.setText}
				/>
				<Text>{	this.state.text }</Text>
			</ScrollView>
		);
	}
}


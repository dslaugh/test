/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  ListView,
} from 'react-native';

import MyScene from './MyScene';

class HelloWorld extends Component {
  render() {
    return (
		<Text>Hello world!</Text>
    );
  }
}

const styles = StyleSheet.create({
	mainView: {
		marginTop: 30,
	},
	bananas: {
		margin: 30
	},
	image: {
		width: 193,
		height: 110,
	},
	greetings: {
		marginTop: 30,
		alignItems: 'center',
	},
	bigblue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 30,
	},
	red: {
		color: 'red',
	},
});

class Bananas extends Component {
	render() {
		let pic = {
			uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
		};

		return (
			<View style={styles.bananas}>
				<Image source={pic} style={styles.image} />
			</View>
		);
	}
}

class Greeting extends Component {
	render() {
		return (
			<Text>Hello {this.props.name}</Text>
		);
	}
}

class LotsOfGreetings extends Component {
	render() {
		return (
			<View style={styles.greetings}>
				<Greeting name='Rexxar' />
				<Greeting name='Jaina' />
				<Greeting name='Valeera' />
			</View>
		);
	}
}

class Blink extends Component {
	constructor(props) {
		super(props);
		this.state = { showText: true };

		setInterval(() => {
			this.setState({ showText: !this.state.showText });
		}, 1000);
	}

	render() {
		let display = this.state.showText ? this.props.text : ' ';
		return (
			<Text>{display}</Text>
		);
	}
}

class BlinkApp extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Blink text='I love to blink' />
				<Blink text='Yes blinking is so great' />
				<Blink text='Why did they ever take this out of HTML' />
				<Blink text='Look at me look at me look at me' />
			</View>
		);
	}
}

class LotsOfStyles extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<Text style={styles.red}>just red</Text>
				<Text style={styles.bigblue}>just bigblue</Text>
				<Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
				<Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
			</View>
		);
	}
}

class FixedDimensionsBasics extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
				<View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
				<View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
			</View>
		);
	}
}

class FlexDimensionsBasics extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1, backgroundColor: 'powderblue'}} />
				<View style={{flex: 2, backgroundColor: 'skyblue'}} />
				<View style={{flex: 3, backgroundColor: 'steelblue'}} />
			</View>
		);
	}
}

class FlexDirectionBasics extends Component {
	render() {
		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
				<View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
				<View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
			</View>
		);
	}
}

class JustifyContentBasics extends Component {
	render() {
		return (
			<View style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>
				<View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
				<View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
				<View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
			</View>
		);
	}
}

class AlignItemsBasics extends Component {
	render() {
		return (
			<View style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
				<View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
				<View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
			</View>
		);
	}
}

class PizzaTranslator extends Component {
	constructor(props) {
		super(props);
		this.state = {text: ''};
	}

	render() {
		return (
			<View style={{padding: 10}}>
				<TextInput
					style={{height: 40}}
					placeholder='Type here to translate!'
					onChangeText={(text) => this.setState({text})}
				/>
				<Text style={{padding: 10, fontSize: 42}}>
					{this.state.text.split(' ').map(word => word && '🍕').join(' ')}
				</Text>
			</View>
		);
	}
}

class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
	render() {
		return (
			<ScrollView>
				<Text style={{fontSize: 96}}>Scroll me plz</Text>
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Text style={{fontSize: 96}}>If you like</Text>
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Text style={{fontSize: 96}}>Scrolling down</Text>
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Text style={{fontSize: 96}}>What's the best</Text>
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Text style={{fontSize: 96}}>Framework around?</Text>
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Image source={require('./img/emoticon.png')} />
				<Text style={{fontSize: 96}}>React Native</Text>
			</ScrollView>
		);
	}
}

class ListViewBasics extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([
				'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
			])
		};
	}

	render() {
		return (
			<View style={{flex: 1, paddingTop: 22}}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <Text>{rowData}</Text>}
				/>
			</View>
		);
	}
};

class YoDawgApp extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<MyScene />
			</View>
		);
	}
}

AppRegistry.registerComponent('HelloWorld', () => YoDawgApp);

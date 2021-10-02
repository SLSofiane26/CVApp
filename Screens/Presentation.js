import {DrawerActions} from '@react-navigation/routers';
import React from 'react';
import {PureComponent} from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

class Presentation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(0),
      topbis: new Animated.Value(0),
      topbisbis: new Animated.Value(0),
      topbisbisbis: new Animated.Value(0),
      orientation: null,
      opacbis: new Animated.Value(0),
    };
  }

  ddd = false;
  dde = false;
  dda = false;

  w = Dimensions.get('window').width;
  h = Dimensions.get('window').height;

  componentDidMount = () => {
    if (!this.ddd) {
      if (this.w < this.h) {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'PORTRAIT',
        }));
      } else {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'LANDSCAPE',
        }));
      }
    }
    Animated.sequence([
      Animated.spring(this.state.top, {
        toValue: this.state.orientation === 'PORTRAIT' ? 120 : 100,
        velocity: 0.5,
        tension: 13,
        friction: 13,
        useNativeDriver: false,
      }),
      Animated.delay(0),
      Animated.timing(this.state.opacbis, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.delay(500),
      Animated.spring(this.state.topbis, {
        toValue: 1,
        velocity: 1,
        tension: 13,
        friction: 13,
        useNativeDriver: false,
      }),
      Animated.delay(500),
      Animated.spring(this.state.topbisbis, {
        toValue: 1,
        velocity: 1,
        tension: 13,
        friction: 13,
        useNativeDriver: false,
      }),
      Animated.delay(500),
      Animated.spring(this.state.topbisbisbis, {
        toValue: 1,
        velocity: 1,
        tension: 13,
        friction: 13,
        useNativeDriver: false,
      }),
    ]).start();
  };

  componentDidUpdate = (prevProps, prevState) => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'PORTRAIT',
        }));
      } else {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'LANDSCAPE',
        }));
      }
    });
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#28AFB0',
        }}>
        <View
          style={{
            alignSelf: 'flex-start',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
            marginTop: this.state.orientation === 'PORTRAIT' ? '15%' : '3%',
            zIndex: 10000,
          }}>
          <TouchableOpacity
            style={{marginRight: '5%'}}
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.toggleDrawer())
            }>
            <Icon name="bars" color="black" size={50} />
          </TouchableOpacity>
        </View>
        <Image
          blurRadius={3}
          source={{uri: 'https://zupimages.net/up/21/30/rjg9.png'}}
          style={{width: '50%', height: '100%', zIndex: 0}}
        />
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
            zIndex: 1000,
            position: 'absolute',
            paddingTop: this.state.orientation === 'PORTRAIT' ? '20%' : '0%',
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Animated.View
            style={{
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: this.state.top,
            }}>
            <Text style={{fontFamily: 'Lato', fontSize: 34, color: 'white'}}>
              SIDI LARBI Sofiane
            </Text>
            <Text
              style={{
                fontFamily: 'Lato',
                fontSize: 25,
                textAlign: 'center',
                color: 'white',
              }}>
              Développeur mobile
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              zIndex: 10000000,
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10%',
              opacity: this.state.opacbis,
            }}>
            <Text
              style={[
                Style.Text,
                {
                  textTransform: 'uppercase',
                },
              ]}>
              Compétences
            </Text>

            <Animated.View
              style={[
                Style.containerBis,
                {
                  opacity: this.state.topbis,
                },
              ]}>
              <Text style={Style.Text}>React Native</Text>
            </Animated.View>

            <Animated.View
              style={[
                Style.containerBis,
                {
                  opacity: this.state.topbisbis,
                },
              ]}>
              <Text style={Style.Text}>React.js</Text>
            </Animated.View>

            <Animated.View
              style={[
                Style.containerBis,
                {
                  opacity: this.state.topbisbisbis,
                },
              ]}>
              <Text style={Style.Text}>Node.js</Text>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}

let Style = StyleSheet.create({
  containerBis: {
    backgroundColor: '#394648',
    marginTop: '10%',
    padding: '5%',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  Text: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 35,
  },
});

export default Presentation;

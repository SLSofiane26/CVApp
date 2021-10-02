import {DrawerActions} from '@react-navigation/routers';
import React from 'react';
import {PureComponent} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Easing} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(-600),
      topbis: 0,
      opac: 0,
      blur: new Animated.Value(50),
      orientation: null,
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

    Animated.timing(this.state.top, {
      toValue: this.state.orientation === 'PORTRAIT' ? 200 : 40,
      duration: 500,
      delay: 500,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
    setTimeout(() => {
      this.props.navigation.dispatch(DrawerActions.openDrawer());
    }, 1200);
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <View style={{backgroundColor: '#394648', flex: 1}}>
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
            <Icon name="bars" color="#28AFB0" size={50} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Animated.View style={[Style.anim, {marginTop: this.state.top}]}>
            <TouchableOpacity
              style={[Style.button]}
              onPress={() => this.props.navigation.navigate('Présentation')}>
              <Text style={[Style.text]}>Présentation</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[Style.anim]}>
            <TouchableOpacity
              style={[Style.button]}
              onPress={() => this.props.navigation.navigate('Éxpériences')}>
              <Text style={[Style.text]}>Expériences</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[Style.anim]}>
            <TouchableOpacity
              style={Style.button}
              onPress={() => this.props.navigation.navigate('Formations')}>
              <Text style={[Style.text]}>Formations</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[Style.anim]}>
            <TouchableOpacity
              style={Style.button}
              onPress={() => this.props.navigation.navigate('Contact')}>
              <Text style={[Style.text]}>Contact</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}

let Style = StyleSheet.create({
  button: {
    marginTop: '10%',
    borderRadius: 10,
    borderWidth: 2,
    padding: '5%',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#28AFB0',
  },
  animation: {
    backgroundColor: 'red',
  },
  anim: {
    flexBasis: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    fontSize: 28,
    textTransform: 'uppercase',
    fontFamily: 'Lato',
  },
});

export default Home;

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, useDispatch, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from '../Screens/Home';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/routers';
import {Easing} from 'react-native-reanimated';
import Presentation from '../Screens/Presentation';
import Experiences from '../Screens/Experiences';
import Formations from '../Screens/Formations';
import Contact from '../Screens/Contact';

let Drawer = createDrawerNavigator();

let Drawerb = React.memo(function Drawer(props) {
  let fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }, 500);
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        height: Dimensions.get('window').height / 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Animated.View>
        <DrawerItemList {...props} />
      </Animated.View>
    </DrawerContentScrollView>
  );
});

let HomeNavigation = props => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        drawerActiveBackgroundColor: '#28AFB0',
        drawerInactiveBackgroundColor: '#394648',
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: 'white',
        drawerItemStyle: {
          borderWidth: 1,
          borderColor: '#28AFB0',
        },
        drawerLabelStyle: {
          textAlign: 'center',
          padding: 0,
          margin: 0,
          textAlignVertical: 'center',
          left: '7%',
          fontFamily: 'Lato',
        },
        drawerStyle: {
          backgroundColor: 'transparent',
          display: 'flex',
        },
      }}
      initialRouteName="Home"
      drawerType=""
      drawerContent={props => <Drawerb {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Présentation"
        component={Presentation}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Éxpériences"
        component={Experiences}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Formations"
        component={Formations}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigation;

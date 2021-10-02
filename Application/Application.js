import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {PureComponent} from 'react';
import HomeNavigation from '../Navigation/HomeNavigation';

class Application extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};

  componentDidUpdate = (prevProps, prevState) => {};

  componentWillUnmount = () => {};

  render() {
    return (
      <NavigationContainer independent={true}>
        <HomeNavigation />
      </NavigationContainer>
    );
  }
}

export default Application;

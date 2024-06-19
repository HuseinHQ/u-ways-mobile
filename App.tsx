import React from 'react';
import 'react-native-gesture-handler';
import StackNavigator from './src/navigator/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;

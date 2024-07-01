import 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './src/navigator/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;

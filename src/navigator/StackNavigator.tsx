import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@/screens/SplashScreen';
import Onboarding from '@/screens/OnboardingScreen';
import LoginScreen from '@/screens/LoginScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@/screens/SplashScreen';
import Onboarding from '@/screens/OnboardingScreen';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import Page1 from '@/screens/CompleteBiodataScreen/Page1';
import Page2 from '@/screens/CompleteBiodataScreen/Page2';
import Page3 from '@/screens/CompleteBiodataScreen/Page3';
import Page4 from '@/screens/CompleteBiodataScreen/Page4';
import Colors from '@/utils/Colors';
import Page5 from '@/screens/CompleteBiodataScreen/Page5';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: Colors.white.default},
        gestureEnabled: true,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />

      {/* Complete Biodata Screen */}
      <Stack.Screen name="Page1" component={Page1} />
      <Stack.Screen name="Page2" component={Page2} />
      <Stack.Screen name="Page3" component={Page3} />
      <Stack.Screen name="Page4" component={Page4} />
      <Stack.Screen name="Page5" component={Page5} />
    </Stack.Navigator>
  );
}

export default StackNavigator;

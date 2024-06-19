import HomeScreen from '@/screens/HomeScreen';
import Colors from '@/utils/Colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.container}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    padding: 20,
  },
});

export default TabNavigator;

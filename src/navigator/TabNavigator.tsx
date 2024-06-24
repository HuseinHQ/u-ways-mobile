/* eslint-disable react/no-unstable-nested-components */
import ChatScreen from '@/screens/ChatScreen';
import HomeScreen from '@/screens/HomeScreen';
import MyHealthScreen from '@/screens/MyHealthScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import Colors from '@/utils/Colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '@/styles/GlobalStyles';
import ArticlesScreen from '@/screens/ArticlesScreen';

const Tab = createBottomTabNavigator();

function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.container}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: styles.labelStyle,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? Colors.primary : Colors.black.halfOpacity}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyHealth"
        component={MyHealthScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'heart' : 'heart-outline'}
              size={24}
              color={focused ? Colors.primary : Colors.black.halfOpacity}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'chat' : 'chat-outline'}
              size={24}
              color={focused ? Colors.primary : Colors.black.halfOpacity}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name={focused ? 'user' : 'user-o'}
              size={24}
              color={focused ? Colors.primary : Colors.black.halfOpacity}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ArticlesScreen"
        component={ArticlesScreen}
        options={{tabBarButton: () => null}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  labelStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  tabBarStyle: {
    ...GlobalStyles.shadow,
    height: 60,
  },
});

export default TabNavigator;

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
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

export type TabNavigatorParamList = {
  Home: Readonly<object | undefined>;
  MyHealth?: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function TabNavigator(): React.JSX.Element {
  const route = useRoute();
  const selectRole = useSelector((state: RootState) => state.user.role);

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
        initialParams={route.params}
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
      {selectRole === 'mahasiswa' && (
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
      )}
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
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
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

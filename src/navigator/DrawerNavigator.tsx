import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '@/screens/HomeScreen';
import CustomDrawer from '@/components/CustomDrawer';
import Colors from '@/utils/Colors';
import FacultyScreen from '@/screens/FacultyScreen';
import MajorScreen from '@/screens/MajorScreen';
import LecturerScreen from '@/screens/LecturerScreen';
import StudentScreen from '@/screens/StudentScreen';
import ManageArticleScreen from '@/screens/ManageArticleScreen';
import ManageQuizScreen from '@/components/ManageQuizScreen';

export type DrawerParamList = {
  Dashboard: undefined;
  ManageArticleScreen: undefined;
  FacultyScreen: undefined;
  MajorScreen: undefined;
  LecturerScreen: undefined;
  StudentScreen: undefined;
  ManageQuizScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={() => <CustomDrawer />}
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: {backgroundColor: Colors.white.default},
        drawerStyle: {
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        },
      }}>
      <Drawer.Screen name="Dashboard" component={HomeScreen} />
      <Drawer.Screen
        name="ManageArticleScreen"
        component={ManageArticleScreen}
      />
      <Drawer.Screen name="FacultyScreen" component={FacultyScreen} />
      <Drawer.Screen name="MajorScreen" component={MajorScreen} />
      <Drawer.Screen name="LecturerScreen" component={LecturerScreen} />
      <Drawer.Screen name="StudentScreen" component={StudentScreen} />
      <Drawer.Screen name="ManageQuizScreen" component={ManageQuizScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

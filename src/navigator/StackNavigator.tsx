import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@/screens/SplashScreen';
import Onboarding from '@/screens/OnboardingScreen';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import TabNavigator, {TabNavigatorParamList} from './TabNavigator';
import Page1 from '@/screens/CompleteBiodataScreen/Page1';
import Page2 from '@/screens/CompleteBiodataScreen/Page2';
import Page3 from '@/screens/CompleteBiodataScreen/Page3';
import Page4 from '@/screens/CompleteBiodataScreen/Page4';
import Colors from '@/utils/Colors';
import Page5 from '@/screens/CompleteBiodataScreen/Page5';
import ArticlesScreen from '@/screens/ArticlesScreen';
import ArticleDetailScreen from '@/screens/ArticleDetailScreen';
import QuestionnaireScreen from '@/screens/QuestionnaireScreen';
import QuestionCompleteScreen from '@/screens/QuestionnaireScreen/QuestionCompleteScreen';
import EditProfileScreen from '@/screens/EditProfileScreen';
import ChatDetailScreen from '@/screens/ChatDetailScreen';
import {NavigatorScreenParams} from '@react-navigation/native';
import Page0 from '@/screens/CompleteBiodataScreen/Page0';
import StudentsScreen from '@/screens/StudentsScreen';
import AddFacultyScreen from '@/screens/AddFacultyScreen';
import EditFacultyScreen from '@/screens/EditFacultyScreen';
import AddMajorScreen from '@/screens/AddMajorScreen';
import EditMajorScreen from '@/screens/EditMajorScreen';
import EditLecturerScreen from '@/screens/EditLecturerScreen';
import EditStudentScreen from '@/screens/EditStudentScreen';
import EditArticleScreen from '@/screens/EditArticleScreen';
import AddArticleScreen from '@/screens/AddArticleScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  Main: NavigatorScreenParams<TabNavigatorParamList> | undefined;
  ArticlesScreen: undefined;
  ArticleDetailScreen: {id: number; editMode?: boolean} | undefined;
  QuestionnaireScreen: undefined;
  QuestionCompleteScreen: undefined;
  EditProfileScreen: undefined;
  ChatDetailScreen: {title: string; chatId: number} | undefined;
  StudentsScreen: undefined;

  Page0: undefined;
  Page1: undefined;
  Page2: {nip?: string; semester?: number} | undefined;
  Page3:
    | {semester?: number; faculty: {id: number; name: string}; nip?: string}
    | undefined;
  Page4:
    | {
        nip?: string;
        semester?: number;
        faculty: {id: number; name: string};
        major: {id: number; name: string};
      }
    | undefined;
  Page5:
    | {
        semester?: number;
        nip?: string;
        faculty: {id: number; name: string};
        major: {id: number; name: string};
        lecturer?: {id: number; name: string};
      }
    | undefined;

  AddFacultyScreen: undefined;
  EditFacultyScreen: {id: number} | undefined;
  AddMajorScreen: undefined;
  EditMajorScreen: {id: number} | undefined;
  EditLecturerScreen: {id: number} | undefined;
  EditStudentScreen: {id: number} | undefined;
  AddArticleScreen: undefined;
  EditArticleScreen: {id: number} | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
      <Stack.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireScreen}
      />
      <Stack.Screen
        name="QuestionCompleteScreen"
        component={QuestionCompleteScreen}
      />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={({route}) => ({
          headerShown: true,
          title: route.params?.title ?? 'Chat Detail',
        })}
      />
      <Stack.Screen
        name="StudentsScreen"
        component={StudentsScreen}
        options={{headerShown: false}}
      />

      {/* Complete Biodata Screen */}
      <Stack.Screen name="Page0" component={Page0} />
      <Stack.Screen name="Page1" component={Page1} />
      <Stack.Screen name="Page2" component={Page2} />
      <Stack.Screen name="Page3" component={Page3} />
      <Stack.Screen name="Page4" component={Page4} />
      <Stack.Screen name="Page5" component={Page5} />

      <Stack.Screen name="AddFacultyScreen" component={AddFacultyScreen} />
      <Stack.Screen name="EditFacultyScreen" component={EditFacultyScreen} />
      <Stack.Screen name="AddMajorScreen" component={AddMajorScreen} />
      <Stack.Screen name="EditMajorScreen" component={EditMajorScreen} />
      <Stack.Screen name="EditLecturerScreen" component={EditLecturerScreen} />
      <Stack.Screen name="EditStudentScreen" component={EditStudentScreen} />
      <Stack.Screen name="AddArticleScreen" component={AddArticleScreen} />
      <Stack.Screen name="EditArticleScreen" component={EditArticleScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;

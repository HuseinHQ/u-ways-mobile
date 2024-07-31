import Fonts from '@/styles/Fonts';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import logo from '@/assets/images/logo_light.png';
import Spacer from '../Spacer';
import Colors from '@/utils/Colors';
import GlobalStyles from '@/styles/GlobalStyles';
import {
  NavigationProp,
  NavigationState,
  Route,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {useAppDispatch} from '@/store/store';
import {logout} from '@/store/authSlice';
import {resetUser} from '@/store/userSlice';
import {clearChats} from '@/store/chatSlice';
import {DrawerParamList} from '@/navigator/DrawerNavigator';

type Menu = {
  displayName: string;
  screenName: keyof DrawerParamList;
};

const menu: Menu[] = [
  {
    displayName: 'Beranda',
    screenName: 'Dashboard',
  },
  {
    displayName: 'Artikel',
    screenName: 'ManageArticleScreen',
  },
  {
    displayName: 'Fakultas',
    screenName: 'FacultyScreen',
  },
  {
    displayName: 'Program Studi',
    screenName: 'MajorScreen',
  },
  {
    displayName: 'Dosen',
    screenName: 'LecturerScreen',
  },
  {
    displayName: 'Mahasiswa',
    screenName: 'StudentScreen',
  },
  {
    displayName: 'Kuesioner',
    screenName: 'ManageQuizScreen',
  },
];

function CustomDrawer(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const dispatch = useAppDispatch();

  const currentDrawerRouteName = useNavigationState(
    (state: NavigationState) => {
      const drawerRoute = state.routes.find(
        (route: Route<string>) => route.name === 'Home',
      );
      if (drawerRoute && drawerRoute.state) {
        const drawerState = drawerRoute.state as NavigationState;
        const activeRoute = drawerState.routes[drawerState.index];
        return activeRoute?.name;
      }
      return null;
    },
  );

  const handleLogout = () => {
    Alert.alert(
      'Apakah Anda yakin ingin keluar',
      'Aksi ini tidak dapat diulang!',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Iya',
          onPress: async () => {
            dispatch(logout());
            dispatch(resetUser());
            dispatch(clearChats());
            navigation.reset({
              index: 0,
              // @ts-ignore
              routes: [{name: 'LoginScreen'}],
            });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.verticalLine} />

      <View style={styles.topContent}>
        <Text style={[Fonts.title2, Fonts.primary]}>U-WAYS</Text>
        <Spacer height={10} />
        <Image source={logo} style={styles.image} />
      </View>

      <Spacer height={20} />

      <View style={styles.menuContainer}>
        {menu.map((el, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(el.screenName)}
            style={[
              styles.menuItem,
              currentDrawerRouteName === el.screenName
                ? styles.menutItemSelected
                : {},
            ]}>
            <Text style={styles.text}>{el.displayName}</Text>
            {/* <Spacer height={5} />
            <View style={styles.horizontalLine} /> */}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomContent}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.text, Fonts.primary]}>Log Out</Text>
          <Text style={[styles.text2, Fonts.primary]}>Admin</Text>
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image source={logo} style={styles.avatar} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  verticalLine: {
    height: 50,
    width: 3,
    position: 'absolute',
    backgroundColor: Colors.grey.lightest,
    right: 6,
    top: '50%',
    transform: [{translateX: -1.5}, {translateY: -25}],
    borderRadius: 50,
  },
  topContent: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  menuContainer: {
    width: '100%',
    flex: 1,
    gap: 10,
  },
  menuItem: {
    padding: 10,
  },
  menutItemSelected: {
    backgroundColor: Colors.grey.lighter,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  text2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  horizontalLine: {
    borderWidth: 0.2,
  },
  bottomContent: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    backgroundColor: Colors.red.lighter,
    padding: 10,
    borderRadius: 50,
    ...GlobalStyles.shadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
  },
});

export default CustomDrawer;

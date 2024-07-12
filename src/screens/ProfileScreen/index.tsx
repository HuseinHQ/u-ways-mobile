import Colors from '@/utils/Colors';
import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import wave_1 from '@/assets/images/wave_1.png';
import wave_2 from '@/assets/images/wave_2.png';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Avatar from '@/components/Avatar';
import logo from '@/assets/images/logo_light.png';
import {RootState, useAppDispatch} from '@/store/store';
import {getUserProfile, resetUser} from '@/store/userSlice';
import {useSelector} from 'react-redux';
import Spacer from '@/components/Spacer';
import GlobalStyles from '@/styles/GlobalStyles';
import InputBox from './LocalComponent/InputBox';
import {logout} from '@/store/authSlice';
import {clearChats} from '@/store/chatSlice';

function ProfileScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserProfile({access_token});
  }, [dispatch, access_token]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(Colors.primary);

      // Optional: Return a cleanup function to reset StatusBar when leaving the screen
      return () => {
        // Set StatusBar settings for other screens or reset to default
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(Colors.white.default); // Change 'white' to your app's default StatusBar color
      };
    }, []),
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

  const goToEditPage = () => {
    // @ts-ignore
    navigation.navigate('EditProfileScreen');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View>
        <View style={styles.imageContainer}>
          <Image source={wave_2} style={styles.wave} />
          <Image source={wave_1} style={[styles.wave, {marginTop: -45}]} />
          <View style={styles.avatarContainer}>
            <Avatar image={logo} />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.name}>{user.name}</Text>
          <Spacer height={10} />
          <View style={styles.emailContainer}>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <Spacer height={20} />
          <InputBox
            label={user.role === 'mahasiswa' ? 'Semester' : 'NIP'}
            value={user.role === 'mahasiswa' ? user.semester : user.nip}
          />
          <Spacer height={15} />
          <InputBox label="Fakultas" value={user.faculty_name} />
          <Spacer height={15} />
          <InputBox label="Program Studi" value={user.major_name} />
          <Spacer height={15} />
          {user.role === 'mahasiswa' && (
            <InputBox label="Dosen Wali" value={user.lecturer_name} />
          )}
        </View>
      </View>

      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={goToEditPage}
            style={[styles.button, {backgroundColor: Colors.blue.default}]}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <Spacer width={10} />
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.button, {backgroundColor: Colors.primary}]}>
            <Text style={styles.buttonText}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  wave: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  avatarContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  emailContainer: {
    backgroundColor: Colors.grey.lightest,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    ...GlobalStyles.shadow,
  },
  email: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    backgroundColor: Colors.blue.default,
    paddingVertical: 10,
    flex: 1,
    ...GlobalStyles.shadow,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white.default,
  },
});

export default ProfileScreen;

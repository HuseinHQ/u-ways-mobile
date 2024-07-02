import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {
  Image,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import logoLight from '@/assets/images/logo_light.png';
import logoDark from '@/assets/images/logo_dark.png';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {RootState, useAppDispatch} from '@/store/store';
import {useSelector} from 'react-redux';
import {refreshToken} from '@/store/authSlice';
import {getUserProfile} from '@/store/userSlice';

function SplashScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const refresh_token = useSelector(
    (state: RootState) => state.auth.refreshToken,
  );
  const dispatch = useAppDispatch();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.primary : Colors.white.default,
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!refresh_token) {
        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{name: 'Onboarding'}],
        });
      } else {
        dispatch(
          refreshToken({
            refresh_token,
            successCallback: access_token => {
              dispatch(
                getUserProfile({
                  access_token,
                  cb: () => {
                    navigation.reset({
                      index: 0,
                      // @ts-ignore
                      routes: [{name: 'Main'}],
                    });
                  },
                }),
              );
            },
          }),
        );
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation, dispatch, refresh_token]);

  return (
    <SafeAreaView style={[GlobalStyles.container, {...backgroundStyle}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.imageContainer}>
        <Image
          source={isDarkMode ? logoDark : logoLight}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
}

export default SplashScreen;

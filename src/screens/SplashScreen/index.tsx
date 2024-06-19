import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import logoLight from '@/assets/images/logo_light.png';
import logoDark from '@/assets/images/logo_dark.png';
import {useNavigation} from '@react-navigation/native';

function SplashScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.primary : Colors.white.default,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        // @ts-ignore
        routes: [{name: 'Onboarding'}],
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

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

const styles = StyleSheet.create({
  imageContainer: {
    margin: 'auto',
  },
  image: {
    width: 180,
    height: 180,
  },
});

export default SplashScreen;

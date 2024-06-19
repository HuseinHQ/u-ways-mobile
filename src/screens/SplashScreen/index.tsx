import React from 'react';
import 'react-native-gesture-handler';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import logoLight from '@/assets/images/logo_light.png';
import logoDark from '@/assets/images/logo_dark.png';

function SplashScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.primary : Colors.white.default,
  };

  return (
    <SafeAreaView style={[GlobalStyles.container, {...backgroundStyle}]}>
      <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
      <Image source={isDarkMode ? logoDark : logoLight} style={styles.image} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
  },
});

export default SplashScreen;

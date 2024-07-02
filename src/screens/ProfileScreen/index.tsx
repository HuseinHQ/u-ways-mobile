import Colors from '@/utils/Colors';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import GlobalStyles from '@/styles/GlobalStyles';

function ProfileScreen(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 180,
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    marginLeft: 20,
    resizeMode: 'contain',
  },
  button: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 7,
    ...GlobalStyles.shadow,
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: Colors.white.default,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

export default ProfileScreen;

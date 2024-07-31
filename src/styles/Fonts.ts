import Colors from '@/utils/Colors';
import {StyleSheet} from 'react-native';

const Fonts = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  title2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  subtitleMontserrat: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
  },
  primary: {
    color: Colors.primary,
  },
  black: {
    color: Colors.black.default,
  },
  white: {
    color: Colors.white.default,
  },
});

export default Fonts;

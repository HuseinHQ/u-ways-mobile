import Colors from '@/utils/Colors';
import {StyleSheet} from 'react-native';

const Fonts = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
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
});

export default Fonts;

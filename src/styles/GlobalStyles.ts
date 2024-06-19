import {StyleSheet} from 'react-native';
import Colors from '../utils/Colors';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white.default,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
});

export default GlobalStyles;

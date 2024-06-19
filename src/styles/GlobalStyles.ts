import {StyleSheet} from 'react-native';
import Colors from '../utils/Colors';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white.default,
  },
  shadow: {
    elevation: 2,
  },
  alignCenter: {
    alignItems: 'center',
  },
});

export default GlobalStyles;

import {StyleSheet} from 'react-native';
import Colors from '../utils/Colors';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white.default,
  },
  shadow: {
    // iOS Shadow
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: -2}, // Shadow direction and distance
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Blur radius of the shadow
    // Android Elevation
    elevation: 2,
  },
  alignCenter: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default GlobalStyles;

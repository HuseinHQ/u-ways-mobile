import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white.default,
    padding: 20,
  },
  buttonContainer: {
    gap: 15,
    paddingBottom: 20,
    paddingHorizontal: 2,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 10,
    ...GlobalStyles.shadow,
  },
  selectedButton: {
    backgroundColor: Colors.white.default,
  },
  text: {
    ...Fonts.subtitle,
    textAlign: 'center',
  },
  unselectedText: {
    color: Colors.white.default,
  },
  lanjut: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    ...GlobalStyles.shadow,
  },
  textBold: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default styles;

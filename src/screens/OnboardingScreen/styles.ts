import Colors from '@/utils/Colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 25,
  },
  midContent: {
    marginHorizontal: 'auto',
  },
  botContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  textContainer: {
    height: 100,
    marginTop: 30,
  },
  paragraph: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  lanjut: {
    paddingVertical: 15,
    color: Colors.white.default,
    fontFamily: 'Montserrat-Semibold',
    fontSize: 18,
  },
});

export default styles;

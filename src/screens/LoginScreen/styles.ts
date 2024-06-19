import Colors from '@/utils/Colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 0.9,
    backgroundColor: Colors.white.default,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    width: '100%',
  },
  title: {
    color: Colors.white.default,
    marginTop: 20,
  },
  image: {
    margin: 'auto',
    width: 140,
    height: 140,
  },
  textContainer: {
    gap: 10,
    marginBottom: 20,
  },
  textRed: {
    color: Colors.primary,
  },
  formContainer: {
    marginTop: 10,
    gap: 15,
  },
  forgotPassword: {
    color: Colors.primary,
    marginTop: 5,
    marginBottom: 10,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 15,
  },
  login: {
    color: Colors.white.default,
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 20,
  },
  daftar: {
    color: Colors.primary,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default styles;

import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    ...GlobalStyles.shadow,
    width: screenWidth * 0.7,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingVertical: 10,
    width: '100%',
  },
  buttonClose: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginTop: 15,
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    color: Colors.white.default,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default styles;

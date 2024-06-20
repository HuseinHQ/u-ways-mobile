import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

type CustomModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  buttonText?: string;
  title?: string;
  image?: React.JSX.Element;
};

const screehWidth = Dimensions.get('screen').width;

function CustomModal({
  visible,
  setVisible,
  buttonText = 'OK',
  title = 'This is a modal!',
  image,
}: CustomModalProps): React.JSX.Element {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {image && image}
            <Text style={styles.modalText}>{title}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible)}>
              <Text style={styles.textStyle}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
    width: screehWidth * 0.7,
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
});

export default CustomModal;

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from 'react-native';
import Spacer from '../Spacer';
import styles from './styles';

type CustomModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  buttonText?: string;
  title?: string;
  image?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

function CustomModal({
  visible,
  setVisible,
  buttonText = 'OK',
  title = 'This is a modal!',
  image,
  onPress = () => {},
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
            {image && (
              <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
              </View>
            )}
            <Spacer height={10} />
            <Text style={styles.modalText}>{title}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onPress}>
              <Text style={styles.textStyle}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomModal;

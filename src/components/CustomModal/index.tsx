import Colors from '@/utils/Colors';
import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';

interface CustomModalProps extends PropsWithChildren<Partial<ModalProps>> {
  containerStyle?: ViewStyle; // Optional prop for custom container styling
  modalStyle?: ViewStyle;
}

function CustomModal({
  children,
  containerStyle,
  modalStyle,
  ...modalProps
}: CustomModalProps): React.JSX.Element {
  // Merge custom styles with the default ones
  const combinedContainerStyle = StyleSheet.flatten([
    styles.container,
    containerStyle,
  ]);

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      {...modalProps}
      style={modalStyle}>
      <View style={combinedContainerStyle}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default, // Default background color, can be overridden by containerStyle
    borderRadius: 10, // Default border radius, can be overridden by containerStyle
    padding: 30, // Default padding, can be overridden by containerStyle
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomModal;

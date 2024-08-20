import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
} from 'react-native-gifted-chat';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Colors from '@/utils/Colors';

interface CustomInputToolbarProps extends InputToolbarProps<IMessage> {
  pickDocument: () => void;
}

export default function renderInputToolbar(props: CustomInputToolbarProps) {
  return (
    <InputToolbar {...props}>
      <View style={styles.inputToolbar}>
        <TouchableOpacity onPress={props.pickDocument} style={styles.sendFile}>
          <Foundation name="paperclip" size={25} color={Colors.blue.default} />
        </TouchableOpacity>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Send {...props} containerStyle={{justifyContent: 'center'}}>
          <FontAwesome
            name="send"
            size={25}
            color={Colors.primary}
            style={styles.sendMessage}
          />
        </Send>
      </View>
    </InputToolbar>
  );
}

const styles = StyleSheet.create({
  inputToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendFile: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 5,
    justifyContent: 'center',
  },
  sendMessage: {
    paddingLeft: 5,
    paddingRight: 10,
  },
});

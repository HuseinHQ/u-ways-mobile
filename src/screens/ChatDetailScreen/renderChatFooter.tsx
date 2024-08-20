import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import InChatFileTransfer from './inChatFileTransfer';
import Colors from '@/utils/Colors';
import Fontisto from 'react-native-vector-icons/Fontisto';

type renderChatFooterProps = {
  imagePath: string;
  setImagePath: (value: string) => void;
  filePath: string;
  setFilePath: (value: string) => void;
};

export default function renderChatFooter({
  imagePath,
  setImagePath,
  filePath,
  setFilePath,
}: renderChatFooterProps) {
  if (imagePath) {
    return (
      <View style={styles.chatFooter}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Image source={{uri: imagePath}} style={{height: 75, width: 75}} />
        <TouchableOpacity
          onPress={() => setImagePath('')}
          style={styles.buttonFooterChatImg}>
          <Fontisto name="close-a" size={10} color={Colors.black.default} />
        </TouchableOpacity>
      </View>
    );
  }
  if (filePath) {
    return (
      <View style={styles.chatFooter}>
        <InChatFileTransfer filePath={filePath} />
        <TouchableOpacity
          onPress={() => setFilePath('')}
          style={styles.buttonFooterChat}>
          <Fontisto name="close-a" size={10} color={Colors.black.default} />
        </TouchableOpacity>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  chatFooter: {
    shadowColor: '#1F2687',
    shadowOpacity: 0.37,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: Colors.primary,
  },
  fileContainer: {
    flex: 1,
    maxWidth: 300,
    marginVertical: 2,
    borderRadius: 15,
  },
  fileText: {
    marginVertical: 5,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  buttonFooterChat: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    right: 3,
    top: -2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonFooterChatImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 66,
    top: -4,
    backgroundColor: Colors.white.halfOpacity,
  },
  textFooterChat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});

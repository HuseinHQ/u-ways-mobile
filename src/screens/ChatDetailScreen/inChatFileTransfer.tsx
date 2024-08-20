import Colors from '@/utils/Colors';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type InChatFileTransferProps = {
  filePath: string;
};

const InChatFileTransfer = ({filePath}: InChatFileTransferProps) => {
  let fileType = '';
  let name = '';
  if (filePath !== undefined) {
    name = filePath.split('/').pop() ?? '';
    name = name.replace(/%20/g, '').replace(/ /g, '');
    fileType = filePath.split('.').pop() ?? '';
  }

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        {fileType === 'pdf' ? (
          <FontAwesome5 name="file-pdf" size={60} color={Colors.primary} />
        ) : (
          <FontAwesome5 name="file" size={60} color={Colors.primary} />
        )}
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.textType}>{fileType.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
};
export default InChatFileTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    borderRadius: 15,
    padding: 5,
  },
  text: {
    color: 'black',
    marginTop: 10,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  textType: {
    color: 'black',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  frame: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    marginTop: -4,
  },
});

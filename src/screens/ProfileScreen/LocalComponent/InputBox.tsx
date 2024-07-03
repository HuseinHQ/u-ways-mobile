import Spacer from '@/components/Spacer';
import Colors from '@/utils/Colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type InputBoxProps = {
  label: string;
  value: string | number;
};

function InputBox({label, value}: InputBoxProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Spacer height={5} />
      <View style={styles.inputContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: Colors.black.halfOpacity,
  },
  value: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  inputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default InputBox;

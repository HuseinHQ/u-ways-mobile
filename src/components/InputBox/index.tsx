import Spacer from '@/components/Spacer';
import Colors from '@/utils/Colors';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type InputBoxProps = {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
} & TextInputProps;

function InputBox({
  label,
  value,
  setValue,
  keyboardType = 'default',
  editable = true,
  ...props
}: InputBoxProps): React.JSX.Element {
  return (
    <>
      <View>
        {label && <Text style={styles.label}>{label}:</Text>}
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          keyboardType={keyboardType}
          editable={editable}
          {...props}
        />
        <View style={styles.horizontalLine} />
      </View>
      <Spacer height={15} />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  input: {
    color: Colors.black.default,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  horizontalLine: {
    width: '100%',
    height: 0.7,
    backgroundColor: Colors.black.default,
  },
});

export default InputBox;

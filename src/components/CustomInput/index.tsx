import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

type CustomInputProps = TextInputProps & {
  leftIcon?: React.JSX.Element | number;
  rightIcon?: React.JSX.Element | number;
  validation?: boolean;
  value: string;
  setValue: (value: string) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  leftIcon,
  rightIcon,
  value,
  setValue,
  validation = false,
  ...props // This now includes all TextInputProps
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.icon}>{leftIcon}</View>

      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        placeholderTextColor={Colors.white.default}
        {...props}
      />
      <View style={styles.icon}>{validation ? rightIcon : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    ...GlobalStyles.shadow,
  },
  textInput: {
    color: Colors.white.default,
    fontFamily: 'Blinker-Regular',
    fontSize: 14,
    flex: 0.8,
    padding: 0,
    opacity: 0.5,
  },
  icon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomInput;

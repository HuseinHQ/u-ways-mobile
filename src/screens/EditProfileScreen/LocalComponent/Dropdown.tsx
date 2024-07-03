import Spacer from '@/components/Spacer';
import Colors from '@/utils/Colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type DropdownProps = {
  value: string | number;
  data: any[];
  label: string;
  setValue: (value: number) => void;
};

function Dropdown({
  label,
  value,
  data,
  setValue,
}: DropdownProps): React.JSX.Element {
  return (
    <>
      <View>
        <Text style={styles.label}>{label}:</Text>

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
  box: {
    color: Colors.black.default,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  horizontalLine: {
    width: '100%',
    height: 0.7,
    backgroundColor: Colors.black.default,
  },
});

export default Dropdown;

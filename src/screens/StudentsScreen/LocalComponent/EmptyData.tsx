import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function EmptyData(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Belum ada data Mahasiswa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default EmptyData;

import CustomHeader from '@/components/CustomHeader';
import DataList from '@/components/DataList';
import Colors from '@/utils/Colors';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

function FacultyScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <CustomHeader title="Fakultas" titleColor={Colors.black.default} />

      <DataList name="Fakultas" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default FacultyScreen;

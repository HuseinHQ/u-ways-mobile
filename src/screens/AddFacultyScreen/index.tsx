import CustomHeader from '@/components/CustomHeader';
import InputBox from '@/components/InputBox';
import {postFaculty} from '@/store/facultySlice';
import {RootState, useAppDispatch} from '@/store/store';
import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

function AddFacultyScreen(): React.JSX.Element {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.faculty.loading);

  const submitHandler = () => {
    dispatch(
      postFaculty({access_token, name, successCB: () => navigation.goBack()}),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <CustomHeader
        title="Tambah Fakultas"
        titleFontSize={20}
        titleColor={Colors.black.default}
      />

      <InputBox value={name} label="Nama Fakultas" setValue={setName} />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flex: 1}} />

      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={submitHandler}>
        {loading ? (
          <ActivityIndicator size={20} color={Colors.white.default} />
        ) : (
          <Text style={[Fonts.subtitleMontserrat, Fonts.white]}>Tambahkan</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.green.default,
    height: 50,
    ...GlobalStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default AddFacultyScreen;

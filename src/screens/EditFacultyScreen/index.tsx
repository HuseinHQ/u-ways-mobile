import CustomHeader from '@/components/CustomHeader';
import InputBox from '@/components/InputBox';
import useErrorToast from '@/hooks/useToastError';
import {clearErrors, deleteFaculty, editFaculty} from '@/store/facultySlice';
import {RootState, useAppDispatch} from '@/store/store';
import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';

type RouteParams = {
  id: number;
  name: string;
  Majors: {id: number; name: string}[];
};

function EditFacultyScreen(): React.JSX.Element {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {id, name} = route.params;
  const [nameState, setNameState] = useState('');
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.faculty.loading);
  const errors = useSelector((state: RootState) => state.faculty.errors);
  const navigation = useNavigation();

  useEffect(() => {
    if (name) {
      setNameState(name);
    }
  }, [name]);

  const handleEdit = () => {
    dispatch(
      editFaculty({
        access_token,
        id,
        name: nameState,
        successCB: () => navigation.goBack(),
      }),
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteFaculty({access_token, id, successCB: () => navigation.goBack()}),
    );
  };

  useErrorToast({
    title: 'Gagal',
    errors,
    dispatchFunction: clearErrors,
  });

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Edit Fakultas"
        titleColor={Colors.black.default}
        titleFontSize={20}
      />

      <InputBox
        value={nameState}
        label="Nama Fakultas"
        setValue={setNameState}
      />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flex: 1}} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, GlobalStyles.bgBlue]}
          onPress={handleEdit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={24} color={Colors.white.default} />
          ) : (
            <Text style={[Fonts.white, Fonts.subtitleMontserrat]}>Edit</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, GlobalStyles.bgPrimary]}
          onPress={handleDelete}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={24} color={Colors.white.default} />
          ) : (
            <Text style={[Fonts.white, Fonts.subtitleMontserrat]}>Hapus</Text>
          )}
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    flex: 1,
    height: 50,
    ...GlobalStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default EditFacultyScreen;

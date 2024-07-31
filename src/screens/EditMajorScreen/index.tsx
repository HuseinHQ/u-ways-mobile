import CustomHeader from '@/components/CustomHeader';
import InputBox from '@/components/InputBox';
import Spacer from '@/components/Spacer';
import useErrorToast from '@/hooks/useToastError';
import {getFaculties} from '@/store/facultySlice';
import {clearErrors, deleteMajor, editMajor} from '@/store/majorSlice';
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
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

type RouteParams = {
  id: number;
  name: string;
  FacultyId: number;
};

function EditMajorScreen(): React.JSX.Element {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {id, name, FacultyId: faculty_id} = route.params;
  const [nameState, setNameState] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [FacultyId, setFacultyId] = useState(0);
  const [dropdownData, setDropdownData] = useState([
    {label: 'Tidak ada data', value: 0},
  ]);
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.major.loading);
  const faculties = useSelector((state: RootState) => state.faculty.faculties);
  const errors = useSelector((state: RootState) => state.major.errors);
  const navigation = useNavigation();
  useErrorToast({
    title: 'Gagal',
    errors,
    dispatchFunction: clearErrors,
  });

  const handleEdit = () => {
    dispatch(
      editMajor({
        access_token,
        id,
        name: nameState,
        FacultyId,
        successCB: () => navigation.goBack(),
      }),
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteMajor({access_token, id, successCB: () => navigation.goBack()}),
    );
  };

  useEffect(() => {
    if (name) {
      setNameState(name);
    }
    if (faculty_id) {
      setFacultyId(faculty_id);
    }
  }, [name, faculty_id]);

  useEffect(() => {
    dispatch(getFaculties({access_token}));
  }, [dispatch, access_token]);

  useEffect(() => {
    if (faculties.length) {
      const mappedFaculties = faculties.map(el => ({
        label: el.name,
        value: el.id,
      }));
      setDropdownData(mappedFaculties);
    }
  }, [faculties]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Edit Program Studi"
        titleColor={Colors.black.default}
        titleFontSize={20}
      />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flex: 1}}>
        <InputBox
          value={nameState}
          label="Nama Program Studi"
          setValue={setNameState}
        />

        <Text style={styles.label}>Fakultas:</Text>
        <Spacer height={10} />
        <DropDownPicker
          open={openDropdown}
          value={FacultyId}
          items={dropdownData}
          setOpen={setOpenDropdown}
          setValue={setFacultyId}
          setItems={setDropdownData}
          placeholder="Pilih Fakultas"
        />
      </View>

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
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

export default EditMajorScreen;

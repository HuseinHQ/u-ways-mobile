import CustomHeader from '@/components/CustomHeader';
import InputBox from '@/components/InputBox';
import Spacer from '@/components/Spacer';
import useErrorToast from '@/hooks/useToastError';
import {getFaculties} from '@/store/facultySlice';
import {
  clearErrors,
  deleteLecturer,
  editLecturer,
  setErrors,
} from '@/store/lecturerSlice';
import {getMajors} from '@/store/majorSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Pressable,
  Keyboard,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

type RouteParams = {
  id: number;
};

type Dropdown = {
  label: string;
  value: any;
};

function EditLecturerScreen(): React.JSX.Element {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {id} = route.params;

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.lecturer.loading);
  const errors = useSelector((state: RootState) => state.lecturer.errors);
  const selectFaculties = useSelector(
    (state: RootState) => state.faculty.faculties,
  );
  const selectMajors = useSelector((state: RootState) => state.major.majors);
  const firstRun = useRef(true);

  const [lecturerData, setLecturerData] = useState({
    FacultyId: 0,
    MajorId: 0,
    email: '',
    name: '',
    nip: '',
  });

  const [faculties, setFaculties] = useState<Dropdown[]>([]);
  const [majors, setMajors] = useState<Dropdown[]>([]);
  const [openFacultyDropdown, setOpenFacultyDropdown] = useState(false);
  const [openMajorDropdown, setOpenMajorDropdown] = useState(false);

  // Functions
  const handleEdit = () => {
    Alert.alert(
      'Apakah Anda yakin ingin mengedit data?',
      'Aksi ini tidak dapat dibatalkan!',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Iya',
          onPress: async () => {
            dispatch(
              editLecturer({
                access_token,
                id,
                lecturerData,
                callback: () => navigation.goBack(),
              }),
            );
          },
        },
      ],
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Apakah Anda yakin ingin mendelete data?',
      'Aksi ini tidak dapat dibatalkan!',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Iya',
          onPress: async () => {
            dispatch(
              deleteLecturer({
                access_token,
                id,
                callback: () => navigation.goBack(),
              }),
            );
          },
        },
      ],
    );
  };
  const setValue = useCallback(
    (name: string) => (value: any) => {
      setLecturerData(prevData => ({
        ...prevData,
        [name]: typeof value === 'function' ? value() : value,
      }));
    },
    [setLecturerData],
  );

  // useEffect
  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          const {data} = await axios({
            method: 'GET',
            url: `${process.env.BACKEND_URL}/lecturers/${id}`,
            headers: {access_token},
            timeout: 500,
          });

          setLecturerData({
            name: data.data.name,
            email: data.data.email,
            nip: data.data.nip,
            FacultyId: data.data.Faculty.id,
            MajorId: data.data.Major.id,
          });
        } catch (err) {
          return dispatch(setErrors((err as any)?.response?.data?.errors));
        }
      };

      fetchDetail();
    }
  }, [id, access_token, dispatch]);

  useEffect(() => {
    dispatch(getFaculties({access_token}));
  }, [access_token, dispatch]);

  useEffect(() => {
    if (lecturerData.FacultyId) {
      if (!firstRun.current) {
        setValue('MajorId')(0);
      }
      dispatch(getMajors({access_token, FacultyId: lecturerData.FacultyId}));
      firstRun.current = false;
    }
  }, [access_token, dispatch, lecturerData.FacultyId, setValue]);

  useEffect(() => {
    if (selectFaculties) {
      const mappedFaculties = selectFaculties.map(el => ({
        label: el.name,
        value: el.id,
      }));
      setFaculties(mappedFaculties);
    }
    if (selectMajors) {
      const mappedMajors = selectMajors.map(el => ({
        label: el.name,
        value: el.id,
      }));
      setMajors(mappedMajors);
    }
  }, [selectFaculties, selectMajors]);

  useErrorToast({
    title: 'Gagal',
    errors,
    dispatchFunction: clearErrors,
  });

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <CustomHeader
        title="Edit Dosen"
        titleColor={Colors.black.default}
        titleFontSize={20}
        onPress={() => Keyboard.dismiss()}
      />

      <InputBox
        value={lecturerData.name}
        label="Nama"
        setValue={setValue('name')}
      />

      <InputBox
        value={lecturerData.email}
        label="Email"
        setValue={setValue('email')}
      />

      <InputBox
        value={lecturerData.nip}
        label="NIP"
        setValue={setValue('nip')}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Fakultas:</Text>
      <Spacer height={10} />
      <DropDownPicker
        open={openFacultyDropdown}
        value={lecturerData.FacultyId}
        items={
          faculties?.length > 0
            ? faculties
            : [{label: 'Tidak ada data', value: ''}]
        }
        setOpen={setOpenFacultyDropdown}
        setValue={setValue('FacultyId')}
        setItems={setFaculties}
        placeholder="Pilih Fakultas"
        onOpen={() => {
          setOpenMajorDropdown(false);
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{zIndex: 2}}
      />

      <Spacer height={15} />
      <Text style={styles.label}>Program Studi:</Text>
      <Spacer height={10} />
      <DropDownPicker
        open={openMajorDropdown}
        value={lecturerData.MajorId}
        items={
          majors?.length > 0 ? majors : [{label: 'Tidak ada data', value: ''}]
        }
        setOpen={setOpenMajorDropdown}
        setValue={setValue('MajorId')}
        setItems={setMajors}
        placeholder="Pilih Program Studi"
        onOpen={() => {
          setOpenFacultyDropdown(false);
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{zIndex: 1}}
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
    </Pressable>
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

export default EditLecturerScreen;

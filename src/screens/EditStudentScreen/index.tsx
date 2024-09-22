import CustomHeader from '@/components/CustomHeader';
import InputBox from '@/components/InputBox';
import Spacer from '@/components/Spacer';
import useErrorToast from '@/hooks/useToastError';
import {getFaculties} from '@/store/facultySlice';
import {getMajors} from '@/store/majorSlice';
import {RootState, useAppDispatch} from '@/store/store';
import {
  clearErrors,
  deleteStudent,
  editStudent,
  setErrors,
} from '@/store/studentSlice';
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

function EditStudentScreen(): React.JSX.Element {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {id} = route.params;

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.student.loading);
  const errors = useSelector((state: RootState) => state.student.errors);
  const selectFaculties = useSelector(
    (state: RootState) => state.faculty.faculties,
  );
  const selectMajors = useSelector((state: RootState) => state.major.majors);
  const firstRun = useRef(true);

  const [studentData, setStudentData] = useState({
    FacultyId: 0,
    MajorId: 0,
    email: '',
    name: '',
    LecturerId: 0,
    semester: 0,
    cohort: 0,
    npm: '',
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
              editStudent({
                access_token,
                id,
                studentData,
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
              deleteStudent({
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
      setStudentData(prevData => ({
        ...prevData,
        [name]: typeof value === 'function' ? value() : value,
      }));
    },
    [setStudentData],
  );

  // useEffect
  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          const {data} = await axios({
            method: 'GET',
            url: `${process.env.BACKEND_URL}/students/${id}`,
            headers: {'X-Access-Token': access_token},
            timeout: 5000,
          });

          setStudentData({
            name: data.data.name,
            email: data.data.email,
            semester: data.data.semester,
            FacultyId: data.data.Faculty.id,
            MajorId: data.data.Major.id,
            cohort: data.data.cohort,
            LecturerId: data.data.LecturerId,
            npm: data.data.npm,
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
    if (studentData.FacultyId) {
      if (!firstRun.current) {
        setValue('MajorId')(0);
      }
      dispatch(getMajors({access_token, FacultyId: studentData.FacultyId}));
      firstRun.current = false;
    }
  }, [access_token, dispatch, studentData.FacultyId, setValue]);

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
        title="Edit Mahasiswa"
        titleColor={Colors.black.default}
        titleFontSize={20}
        onPress={() => Keyboard.dismiss()}
      />

      <InputBox
        value={studentData.name}
        label="Nama"
        setValue={setValue('name')}
      />

      <InputBox
        value={studentData.email}
        label="Email"
        setValue={setValue('email')}
      />

      <InputBox
        value={studentData.semester.toString()}
        label="Semester"
        setValue={setValue('semester')}
        keyboardType="number-pad"
      />

      <InputBox
        value={studentData.npm.toString()}
        label="NPM"
        setValue={setValue('npm')}
        keyboardType="number-pad"
      />

      <InputBox
        value={studentData.cohort.toString()}
        label="Angkatan"
        setValue={setValue('cohort')}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Fakultas:</Text>
      <Spacer height={10} />
      <DropDownPicker
        open={openFacultyDropdown}
        value={studentData.FacultyId}
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
        value={studentData.MajorId}
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

export default EditStudentScreen;

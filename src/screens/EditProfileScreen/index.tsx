import Colors from '@/utils/Colors';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from './LocalComponent/Header';
import Spacer from '@/components/Spacer';
import InputBox from './LocalComponent/InputBox';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {getFaculties} from '@/store/facultySlice';
import DropDownPicker from 'react-native-dropdown-picker';
import {getAllLecturers} from '@/store/lecturerSlice';
import {updateUserProfile} from '@/store/userSlice';
import {useNavigation} from '@react-navigation/native';
import GlobalStyles from '@/styles/GlobalStyles';
import {validateInput} from '@/helpers';
import Toast from 'react-native-toast-message';

type Dropdown = {
  label: string;
  value: any;
};

function EditProfileScreen(): React.JSX.Element {
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const selectFaculties = useSelector(
    (state: RootState) => state.faculty.faculties,
  );
  const selectLecturers = useSelector(
    (state: RootState) => state.lecturer.lecturers,
  );
  const selectLoading = useSelector((state: RootState) => state.user.loading);
  const selectErrors = useSelector((state: RootState) => state.user.errors);

  const [data, setData] = useState({
    name: userData.name,
    email: userData.email,
    semester: userData.semester,
    nip: userData.nip,
  });
  const firstRun = useRef(true);

  const [FacultyId, setFacultyId] = useState(userData.faculty_id);
  const [MajorId, setMajorId] = useState(userData.major_id);
  const [LecturerId, setLecturerId] = useState(userData.lecturer_id);

  const [faculties, setFaculties] = useState<Dropdown[]>([]);
  const [majors, setMajors] = useState<Dropdown[]>([]);
  const [lecturers, setLecturers] = useState<Dropdown[]>([]);

  const [openFacultyDropdown, setOpenFacultyDropdown] = useState(false);
  const [openMajorDropdown, setOpenMajorDropdown] = useState(false);
  const [openLecturerDropdown, setOpenLecturerDropdown] = useState(false);

  const onChangeTextHandler = (name: any) => (value: any) => {
    setData({...data, [name]: value});
  };

  useEffect(() => {
    dispatch(getFaculties({access_token}));
    dispatch(getAllLecturers({access_token}));
  }, [dispatch, access_token]);

  useEffect(() => {
    const facultyData = selectFaculties.map((el: any) => ({
      label: el?.name,
      value: el?.id,
    }));
    setFaculties(facultyData);
  }, [selectFaculties]);

  useEffect(() => {
    const lecturerData = selectLecturers.map((el: any) => ({
      label: el.name,
      value: el.id,
    }));
    setLecturers(lecturerData);
  }, [selectLecturers]);

  useEffect(() => {
    let majorData = selectFaculties.find((el: any) => el.id == FacultyId);
    // @ts-ignore
    majorData = majorData?.Majors?.map((el: any) => ({
      label: el.name,
      value: el.id,
    }));
    setMajors(majorData as any);
    if (!firstRun.current) {
      setMajorId(0);
      setLecturerId(0);
    }
    if (FacultyId) {
      dispatch(getAllLecturers({access_token, FacultyId: String(FacultyId)}));
    }
    firstRun.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FacultyId, dispatch, access_token]);

  useEffect(() => {
    if (selectErrors) {
      console.log(selectErrors);
    }
  }, [selectErrors]);

  const navigation = useNavigation();
  const submitHandler = () => {
    const body = {
      ...data,
      MajorId,
      LecturerId,
    };

    const isinputValid = validateInput(body, userData.role);

    if (isinputValid) {
      dispatch(
        updateUserProfile({
          access_token,
          data: body,
          cb: msg => {
            navigation.goBack();
            Toast.show({type: 'success', text1: 'Berhasil', text2: msg});
          },
        }),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.white.default}
      />
      <Header title="Edit Profile" withBackButton />
      <Spacer height={20} />
      <InputBox
        value={data.name}
        label="Name"
        setValue={onChangeTextHandler('name')}
      />
      <InputBox
        value={data.email}
        label="Email"
        setValue={onChangeTextHandler('email')}
        editable={false}
      />
      <InputBox
        value={userData.role === 'mahasiswa' ? String(data.semester) : data.nip}
        label={userData.role === 'mahasiswa' ? 'Semester' : 'NIP'}
        setValue={onChangeTextHandler(
          userData.role === 'mahasiswa' ? 'semester' : 'nip',
        )}
        keyboardType="number-pad"
      />
      <Text style={styles.label}>Fakultas:</Text>
      <Spacer height={10} />
      <DropDownPicker
        open={openFacultyDropdown}
        value={FacultyId}
        items={
          faculties?.length > 0
            ? faculties
            : [{label: 'Tidak ada data', value: ''}]
        }
        setOpen={setOpenFacultyDropdown}
        setValue={setFacultyId}
        setItems={setFaculties}
        placeholder="Pilih Fakultas"
        onOpen={() => {
          setOpenMajorDropdown(false);
          setOpenLecturerDropdown(false);
        }}
        style={{zIndex: 3}} // Increase zIndex when open
      />
      <Spacer height={15} />
      <Text style={styles.label}>Program Studi:</Text>
      <Spacer height={10} />
      <DropDownPicker
        open={openMajorDropdown}
        value={MajorId}
        items={
          majors?.length > 0 ? majors : [{label: 'Tidak ada data', value: ''}]
        }
        setOpen={setOpenMajorDropdown}
        setValue={setMajorId}
        setItems={setMajors}
        placeholder="Pilih Program Studi"
        onOpen={() => {
          setOpenFacultyDropdown(false);
          setOpenLecturerDropdown(false);
        }}
        style={{zIndex: 2}} // Increase zIndex when open
      />
      {userData.role === 'mahasiswa' && (
        <>
          <Spacer height={15} />
          <Text style={styles.label}>Dosen Wali:</Text>
          <Spacer height={10} />
          <DropDownPicker
            open={openLecturerDropdown}
            value={LecturerId}
            items={
              lecturers?.length > 0
                ? lecturers
                : [{label: 'Tidak ada data', value: ''}]
            }
            setOpen={setOpenLecturerDropdown}
            setValue={setLecturerId}
            setItems={setLecturers}
            placeholder="Pilih Dosen Wali"
            onOpen={() => {
              setOpenFacultyDropdown(false);
              setOpenMajorDropdown(false);
            }}
            style={{zIndex: 1}} // Increase zIndex when open
          />
        </>
      )}
      <Spacer height={30} />
      <TouchableOpacity
        disabled={selectLoading}
        onPress={submitHandler}
        style={styles.button}>
        {selectLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Ubah</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  labelStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: Colors.black.default,
  },
  placeholderStyle: {
    color: Colors.black.halfOpacity,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  button: {
    backgroundColor: Colors.blue.default,
    borderRadius: 10,
    minHeight: 45,
    justifyContent: 'center',
    ...GlobalStyles.shadow,
  },
  buttonText: {
    color: Colors.white.default,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
});

export default EditProfileScreen;

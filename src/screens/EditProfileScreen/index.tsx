import Colors from '@/utils/Colors';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import Header from './LocalComponent/Header';
import Spacer from '@/components/Spacer';
import InputBox from './LocalComponent/InputBox';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {getFaculties} from '@/store/facultySlice';
import DropDownPicker from 'react-native-dropdown-picker';

function EditProfileScreen(): React.JSX.Element {
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const selectFaculties = useSelector(
    (state: RootState) => state.faculty.faculties,
  );
  const [data, setData] = useState({
    name: userData.name,
    email: userData.email,
    semester: userData.semester,
  });
  const [FacultyId, setFacultyId] = useState(userData.faculty_id);
  const [MajorId, setMajorId] = useState(userData.major_id);
  const [LecturerId, setLecturerId] = useState(userData.lecturer_id);

  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [openFacultyDropdown, setOpenFacultyDropdown] = useState(false);
  const [openMajorDropdown, setOpenMajorDropdown] = useState(false);
  const [openLecturerDropdown, setOpenLecturerDropdown] = useState(false);

  const onChangeTextHandler = (name: any) => (value: any) => {
    console.log(value.toString());
    setData({...data, [name]: value});
  };

  useEffect(() => {
    dispatch(getFaculties({access_token}));
  }, [dispatch, access_token]);

  useEffect(() => {
    let facultyData = selectFaculties.map(el => ({
      label: el?.name,
      value: el?.id,
    }));
    setFaculties(facultyData);
  }, [selectFaculties]);

  useEffect(() => {
    let majorData = faculties.map((el: any) => {
      // TODO: terakhir disini
    });
  }, [faculties]);

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
      />
      <InputBox
        value={String(data.semester)}
        label="Semester"
        setValue={onChangeTextHandler('semester')}
        keyboardType="number-pad"
      />
      <Text>Fakultas</Text>
      <DropDownPicker
        open={openFacultyDropdown}
        value={FacultyId}
        items={faculties}
        setOpen={setOpenFacultyDropdown}
        setValue={setFacultyId}
        setItems={setFaculties}
      />
      <Text>Program Studi</Text>
      <DropDownPicker
        open={openFacultyDropdown}
        value={FacultyId}
        items={faculties}
        setOpen={setOpenFacultyDropdown}
        setValue={setFacultyId}
        setItems={setFaculties}
      />
      <Text>Fakultas</Text>
      <DropDownPicker
        open={openFacultyDropdown}
        value={FacultyId}
        items={faculties}
        setOpen={setOpenFacultyDropdown}
        setValue={setFacultyId}
        setItems={setFaculties}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});

export default EditProfileScreen;

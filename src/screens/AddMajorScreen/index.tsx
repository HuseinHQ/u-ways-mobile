import CustomHeader from '@/components/CustomHeader';
import InputBox from '@/components/InputBox';
import Spacer from '@/components/Spacer';
import {getFaculties} from '@/store/facultySlice';
import {postMajor} from '@/store/majorSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

function AddMajorScreen(): React.JSX.Element {
  const [name, setName] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [FacultyId, setFacultyId] = useState(0);
  const [dropdownData, setDropdownData] = useState([
    {label: 'Tidak ada data', value: 0},
  ]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.major.loading);
  const faculties = useSelector((state: RootState) => state.faculty.faculties);

  const submitHandler = () => {
    dispatch(
      postMajor({
        access_token,
        name,
        FacultyId,
        successCB: () => navigation.goBack(),
      }),
    );
  };

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
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <CustomHeader
        title="Tambah Program Studi"
        titleFontSize={20}
        titleColor={Colors.black.default}
      />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flex: 1}}>
        <InputBox value={name} label="Nama Program Studi" setValue={setName} />

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
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

export default AddMajorScreen;

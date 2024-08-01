import CustomHeader from '@/components/CustomHeader';
import DataList from '@/components/DataList';
import useSearch from '@/hooks/useSearch';
import useErrorToast from '@/hooks/useToastError';
import {RootStackParamList} from '@/navigator/StackNavigator';
import {RootState, useAppDispatch} from '@/store/store';
import {
  bulkDeleteStudents,
  clearErrors,
  getAllStudents,
} from '@/store/studentSlice';
import Colors from '@/utils/Colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDebounce} from '@uidotdev/usehooks';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

function StudentScreen(): React.JSX.Element {
  const students = useSelector((state: RootState) => state.student.data);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.student.loading);
  const errors = useSelector((state: RootState) => state.student.errors);
  const [search, setSearch] = useSearch();
  const debouncedSearch = useDebounce(search, 300);

  const goToDetail = (value: any) => {
    navigation.navigate('EditStudentScreen', value);
  };

  const handleDelete = (ids: number[], cb: () => void) => {
    dispatch(bulkDeleteStudents({access_token, ids, callback: cb}));
    cb();
  };

  const handleRefresh = () => {
    dispatch(getAllStudents({access_token}));
  };

  useEffect(() => {
    dispatch(getAllStudents({access_token}));
  }, [access_token, dispatch]);

  useEffect(() => {
    dispatch(getAllStudents({access_token, search: debouncedSearch}));
  }, [debouncedSearch, access_token, dispatch]);

  useErrorToast({
    title: 'Gagal',
    errors,
    dispatchFunction: clearErrors,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <CustomHeader
        title="Mahasiswa"
        titleFontSize={20}
        titleColor={Colors.black.default}
        leftButtonType="menu"
      />

      <DataList
        name="Mahasiswa"
        data={students}
        search={search}
        setSearch={setSearch}
        loading={loading}
        onPressDetail={goToDetail}
        onPressDelete={handleDelete}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
  },
});

export default StudentScreen;

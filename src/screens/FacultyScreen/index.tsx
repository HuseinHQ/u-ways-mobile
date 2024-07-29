import CustomHeader from '@/components/CustomHeader';
import DataList from '@/components/DataList';
import {getFaculties} from '@/store/facultySlice';
import {RootState, useAppDispatch} from '@/store/store';
import Colors from '@/utils/Colors';
import {useDebounce} from '@uidotdev/usehooks';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

function FacultyScreen(): React.JSX.Element {
  const faculties = useSelector((state: RootState) => state.faculty.faculties);
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.faculty.loading);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    dispatch(getFaculties({access_token}));
  }, [access_token, dispatch]);

  useEffect(() => {
    dispatch(getFaculties({access_token, search: debouncedSearch}));
  }, [debouncedSearch, access_token, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <CustomHeader title="Fakultas" titleColor={Colors.black.default} />

      <DataList
        name="Fakultas"
        data={faculties}
        search={search}
        setSearch={setSearch}
        loading={loading}
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

export default FacultyScreen;

import CustomHeader from '@/components/CustomHeader';
import DataList from '@/components/DataList';
import {getAllLecturers} from '@/store/lecturerSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Colors from '@/utils/Colors';
import {useDebounce} from '@uidotdev/usehooks';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

function LecturerScreen(): React.JSX.Element {
  const lecturers = useSelector((state: RootState) => state.lecturer.lecturers);
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.lecturer.loading);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    dispatch(getAllLecturers({access_token}));
  }, [access_token, dispatch]);

  useEffect(() => {
    dispatch(getAllLecturers({access_token, search: debouncedSearch}));
  }, [debouncedSearch, access_token, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <CustomHeader
        title="Dosen"
        titleFontSize={20}
        titleColor={Colors.black.default}
        leftButtonType="menu"
      />

      <DataList
        name="Dosen"
        data={lecturers}
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

export default LecturerScreen;

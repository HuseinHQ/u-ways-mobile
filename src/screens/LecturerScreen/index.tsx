import CustomHeader from '@/components/CustomHeader';
import DataList from '@/components/DataList';
import useSearch from '@/hooks/useSearch';
import useErrorToast from '@/hooks/useToastError';
import {RootStackParamList} from '@/navigator/StackNavigator';
import {
  bulkDeleteLecturers,
  clearErrors,
  getAllLecturers,
} from '@/store/lecturerSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Colors from '@/utils/Colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDebounce} from '@uidotdev/usehooks';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

function LecturerScreen(): React.JSX.Element {
  const lecturers = useSelector((state: RootState) => state.lecturer.lecturers);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.lecturer.loading);
  const errors = useSelector((state: RootState) => state.lecturer.errors);
  const [search, setSearch] = useSearch();
  const debouncedSearch = useDebounce(search, 300);

  const goToDetail = (value: any) => {
    navigation.navigate('EditLecturerScreen', value);
  };

  const handleDelete = (ids: number[], cb: () => void) => {
    dispatch(bulkDeleteLecturers({access_token, ids, callback: cb}));
  };

  const handleRefresh = () => {
    dispatch(getAllLecturers({access_token}));
  };

  useEffect(() => {
    dispatch(getAllLecturers({access_token}));
  }, [access_token, dispatch]);

  useEffect(() => {
    dispatch(getAllLecturers({access_token, search: debouncedSearch}));
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

export default LecturerScreen;

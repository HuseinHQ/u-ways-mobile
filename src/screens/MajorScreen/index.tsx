import CustomHeader from '@/components/CustomHeader';
import DataList from '@/components/DataList';
import {getMajors} from '@/store/majorSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Colors from '@/utils/Colors';
import {useDebounce} from '@uidotdev/usehooks';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

function MajorScreen(): React.JSX.Element {
  const majors = useSelector((state: RootState) => state.major.majors);
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.major.loading);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    dispatch(getMajors({access_token}));
  }, [access_token, dispatch]);

  useEffect(() => {
    dispatch(getMajors({access_token, search: debouncedSearch}));
  }, [debouncedSearch, access_token, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <CustomHeader
        title="Program Studi"
        titleFontSize={20}
        titleColor={Colors.black.default}
        leftButtonType="menu"
      />

      <DataList
        name="Program Studi"
        data={majors}
        search={search}
        setSearch={setSearch}
        loading={loading}
        onPressAddData={() => {}}
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

export default MajorScreen;

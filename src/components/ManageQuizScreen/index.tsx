import CustomHeader from '@/components/CustomHeader';
import DataList from '@/components/DataList';
import useSearch from '@/hooks/useSearch';
import useErrorToast from '@/hooks/useToastError';
import {RootStackParamList} from '@/navigator/StackNavigator';
import {bulkDeleteQuizzes, getAllQuizzes} from '@/store/quizActions';
import {clearErrors} from '@/store/quizSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Colors from '@/utils/Colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDebounce} from '@uidotdev/usehooks';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

function ManageQuizScreen(): React.JSX.Element {
  const quizzes = useSelector((state: RootState) => state.quiz.data);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loading = useSelector((state: RootState) => state.quiz.loading);
  const errors = useSelector((state: RootState) => state.quiz.errors);
  const [search, setSearch] = useSearch();
  const debouncedSearch = useDebounce(search, 300);

  const onPressDelete = (value: number[], cb: () => void) => {
    dispatch(
      bulkDeleteQuizzes({
        value,
        callback: cb,
      }),
    );
  };

  const goToDetail = (value: any) => {
    navigation.navigate('EditQuizScreen', {id: value.id});
  };

  const onRefresh = () => {
    dispatch(getAllQuizzes({}));
  };

  useEffect(() => {
    dispatch(getAllQuizzes({search: debouncedSearch}));
  }, [debouncedSearch, dispatch]);

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
        title="Kuesioner"
        titleFontSize={20}
        titleColor={Colors.black.default}
        leftButtonType="menu"
      />

      <DataList
        name="Kuis"
        data={quizzes}
        search={search}
        setSearch={setSearch}
        loading={loading}
        onPressAddData={() => {
          navigation.navigate('AddQuizScreen');
        }}
        onPressDelete={onPressDelete}
        onPressDetail={goToDetail}
        onRefresh={onRefresh}
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

export default ManageQuizScreen;

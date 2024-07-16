import Colors from '@/utils/Colors';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Header from './LocalComponent/Header';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {getStudents} from '@/store/studentSlice';
import logo from '@/assets/images/logo_light.png';
import EmptyData from './LocalComponent/EmptyData';
import StudentItem from './LocalComponent/StudentItem';
import Spacer from '@/components/Spacer';
import Pagination from './LocalComponent/Pagination';
import {useNavigation} from '@react-navigation/native';

function StudentsScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const selectStudents = useSelector((state: RootState) => state.student.data);
  const selectPagination = useSelector(
    (state: RootState) => state.student.pagination,
  );
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getStudents({access_token}));
  }, [access_token, dispatch]);

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <Header />

      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} />
      </View>

      <Spacer height={20} />

      <Pagination data={selectPagination} />

      <Spacer height={10} />

      {!selectStudents.length ? (
        <EmptyData />
      ) : (
        selectStudents.map(
          (student: {id: number; name: string; npm: string}) => (
            <StudentItem student={student} key={student.id} />
          ),
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default StudentsScreen;

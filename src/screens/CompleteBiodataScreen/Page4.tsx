import Colors from '@/utils/Colors';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './LocalComponent';
import Spacer from '@/components/Spacer';
import GlobalStyles from '@/styles/GlobalStyles';
import Fonts from '@/styles/Fonts';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootState, useAppDispatch} from '@/store/store';
import {useSelector} from 'react-redux';
import {getAllLecturers} from '@/store/lecturerSlice';
import {RootStackParamList} from '@/navigator/StackNavigator';

type RouteParams = {
  semester?: number;
  nip?: string;
  faculty: {id: number; name: string};
  major: {id: number; name: string};
};

type NextRouteParams = {
  semester?: number;
  nip?: string;
  faculty: {id: number; name: string};
  major: {id: number; name: string};
  lecturer: {id: number; name: string};
};

function Page4(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {semester, faculty, major} = route.params;
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const selectLecturers = useSelector(
    (state: RootState) => state.lecturer.lecturers,
  );

  const goToNextPage = (data: NextRouteParams) => {
    navigation.navigate('Page5', data);
  };

  useEffect(() => {
    dispatch(getAllLecturers({access_token, FacultyId: String(faculty.id)}));
  }, [dispatch, access_token, faculty.id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Dosen Wali" withBackButton />
        <Spacer height={20} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled
            style={[styles.button, styles.selectedButton]}>
            <Text style={styles.text}>{semester}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            style={[styles.button, styles.selectedButton]}>
            <Text style={styles.text}>{faculty.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            style={[styles.button, styles.selectedButton]}>
            <Text style={styles.text}>{major.name}</Text>
          </TouchableOpacity>
          {!selectLecturers.length && (
            <TouchableOpacity
              disabled
              style={[styles.button, styles.selectedButton]}>
              <Text style={styles.text}>Tidak ada data dosen</Text>
            </TouchableOpacity>
          )}
          {selectLecturers?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                goToNextPage({
                  semester,
                  faculty,
                  major,
                  lecturer: {id: item.id, name: item.name},
                })
              }
              style={styles.button}>
              <Text style={[styles.text, styles.unselectedText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white.default,
    padding: 20,
  },
  buttonContainer: {
    gap: 15,
    paddingBottom: 20,
    paddingHorizontal: 2,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 10,
    ...GlobalStyles.shadow,
  },
  selectedButton: {
    backgroundColor: Colors.white.default,
    borderWidth: 1,
  },
  text: {
    ...Fonts.subtitle,
    textAlign: 'center',
  },
  unselectedText: {
    color: Colors.white.default,
  },
});

export default Page4;

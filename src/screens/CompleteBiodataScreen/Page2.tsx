import Colors from '@/utils/Colors';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
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
import {getFaculties} from '@/store/facultySlice';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '@/navigator/StackNavigator';

type RouteParams = {
  semester?: number;
  nip?: string;
};

function Page2(): React.JSX.Element {
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const selectFaculties = useSelector(
    (state: RootState) => state.faculty.faculties,
  );
  const selectLoading = useSelector(
    (state: RootState) => state.faculty.loading,
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {semester, nip} = route.params;

  const goToNextPage = (data: {
    semester?: number;
    faculty: {id: number; name: string};
    nip?: string;
  }) => {
    navigation.navigate('Page3', data);
  };

  useEffect(() => {
    dispatch(getFaculties({access_token}));
  }, [dispatch, access_token]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Fakultas" withBackButton />
        <Spacer height={20} />
        <View style={styles.buttonContainer}>
          {semester && (
            <TouchableOpacity
              disabled
              style={[styles.button, styles.selectedButton]}>
              <Text style={styles.text}>{semester}</Text>
            </TouchableOpacity>
          )}
          {nip && (
            <TouchableOpacity
              disabled
              style={[styles.button, styles.selectedButton]}>
              <Text style={styles.text}>{nip}</Text>
            </TouchableOpacity>
          )}
          {selectLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator />
            </View>
          ) : (
            selectFaculties?.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => goToNextPage({semester, faculty: item, nip})}
                style={styles.button}>
                <Text style={[styles.text, styles.unselectedText]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))
          )}
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
  loading: {
    justifyContent: 'center',
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

export default Page2;

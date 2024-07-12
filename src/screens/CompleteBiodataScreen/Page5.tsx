import Colors from '@/utils/Colors';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
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
import image from '@/assets/images/logo_5.png';
import CustomModal from '@/components/CustomModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootState, useAppDispatch} from '@/store/store';
import {clearErrors, completeBiodata} from '@/store/userSlice';
import {useSelector} from 'react-redux';
import useErrorToast from '@/hooks/useToastError';
import {RootStackParamList} from '@/navigator/StackNavigator';

type RouteParams = {
  semester?: number;
  nip?: string;
  faculty: {id: number; name: string};
  major: {id: number; name: string};
  lecturer?: {id: number; name: string};
};

function Page5(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {semester, faculty, major, lecturer, nip} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const errors = useSelector((state: RootState) => state.user.errors);
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useAppDispatch();
  useErrorToast({
    errors: errors,
    title: 'Submit Error',
    dispatchFunction: clearErrors,
  });

  useEffect(() => {
    setModalVisible(true);

    return () => setModalVisible(false);
  }, []);

  const handleSubmit = () => {
    const successCB = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    };

    dispatch(
      completeBiodata({
        access_token,
        successCB,
        LecturerId: lecturer?.id,
        MajorId: major?.id,
        semester,
        nip,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={modalVisible ? 'light-content' : 'dark-content'}
        backgroundColor={
          modalVisible ? Colors.grey.darkest : Colors.white.default
        }
      />
      <Header
        title={semester ? 'Data Mahasiswa' : 'Data Dosen'}
        withBackButton
      />
      <Spacer height={20} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled
          style={[styles.button, styles.selectedButton]}>
          <Text style={styles.text}>{semester ? semester : nip}</Text>
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
        {semester && (
          <TouchableOpacity
            disabled
            style={[styles.button, styles.selectedButton]}>
            <Text style={styles.text}>{lecturer?.name}</Text>
          </TouchableOpacity>
        )}
      </View>
      <CustomModal modalStyle={styles.modalStyle} isVisible={modalVisible}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <Spacer height={20} />
        <Text style={styles.title}>Apakah Identitas Anda Sudah Benar?</Text>
        <Spacer height={20} />
        <View style={styles.buttonContainer2}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <TouchableOpacity onPress={handleSubmit}>
                <AntDesign
                  name="checkcircleo"
                  color={Colors.green.default}
                  size={48}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign
                  name="closecircleo"
                  color={Colors.primary}
                  size={48}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </CustomModal>
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
  modalStyle: {top: 100},
  imageContainer: {
    width: 180,
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    marginLeft: 20,
    resizeMode: 'contain',
  },
  buttonContainer2: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  text2: {
    textAlign: 'center',
    color: Colors.white.default,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

export default Page5;

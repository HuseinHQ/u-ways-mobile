import Colors from '@/utils/Colors';
import React, {useEffect, useState} from 'react';
import {
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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import image from '@/assets/images/logo_5.png';
import CustomModal from '@/components/CustomModal';
import AntDesign from 'react-native-vector-icons/AntDesign';

type RouteParams = {
  semester: number;
  faculty: {id: number; name: string};
  major: {id: number; name: string};
  lecturer: {id: number; name: string};
};

function Page5(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {semester, faculty, major, lecturer} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);

    return () => setModalVisible(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={modalVisible ? 'light-content' : 'dark-content'}
        backgroundColor={
          modalVisible ? Colors.grey.darkest : Colors.white.default
        }
      />
      <Header title="Data Mahasiswa" withBackButton />
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
        <TouchableOpacity
          disabled
          style={[styles.button, styles.selectedButton]}>
          <Text style={styles.text}>{lecturer.name}</Text>
        </TouchableOpacity>
      </View>
      <CustomModal modalStyle={styles.modalStyle} isVisible={modalVisible}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <Spacer height={20} />
        <Text style={styles.title}>Apakah Identitas Anda Sudah Benar?</Text>
        <Spacer height={20} />
        <View style={styles.buttonContainer2}>
          <TouchableOpacity>
            <AntDesign
              name="checkcircleo"
              color={Colors.green.default}
              size={48}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="closecircleo" color={Colors.primary} size={48} />
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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

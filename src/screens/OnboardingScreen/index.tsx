import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import image from '@/assets/images/logo_2.png';
import image2 from '@/assets/images/logo_3.png';
import image3 from '@/assets/images/logo_4.png';
import {useNavigation} from '@react-navigation/native';

const pageData = [
  {
    previous: false,
    next: true,
    title: 'Welcome to U-WAYS',
    description:
      'UPN-Wellness & Youth Support adalah aplikasi kesehatan mental mahasiswa UPN yang siap mendukungmu dalam perjalanan kesehatan mentalmu.',
    button: 'LANJUT',
    image: image,
  },
  {
    previous: true,
    next: true,
    title: 'Growing Together',
    description:
      'Temukan sumber daya, dukungan, dan alat yang dibutuhkan untuk tumbuh bersama.',
    button: 'LANJUT',
    image: image2,
  },
  {
    previous: true,
    next: false,
    title: 'Start Exploring!',
    description:
      'Mari mulai perjalananmu menuju kesehatan mental yang lebih baik bersama UWAYS!',
    button: 'MULAI',
    image: image3,
  },
];

function Onboarding(): React.JSX.Element {
  const [page, setPage] = useState(0);
  const navigation = useNavigation();

  const onPressButton = () => {
    if (pageData[page].next) {
      setPage(page + 1);
    } else {
      navigation.reset({
        index: 0,
        // @ts-ignore
        routes: [{name: 'LoginScreen'}],
      });
    }
  };

  const onPressBack = () => {
    if (pageData[page].previous) {
      setPage(page - 1);
    }
  };

  const onPressSkip = () => {
    setPage(pageData.length - 1);
  };

  return (
    <SafeAreaView style={[GlobalStyles.container, styles.container]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <View style={styles.topContent}>
        <TouchableOpacity onPress={onPressBack}>
          {pageData[page].previous && (
            <Ionicons name="chevron-back" size={24} />
          )}
        </TouchableOpacity>
        {pageData[page].next && (
          <TouchableOpacity onPress={onPressSkip}>
            <Text style={styles.text}>LEWATI</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.midContent}>
        <Image source={pageData[page].image} style={styles.image} />
      </View>

      <View style={styles.botContent}>
        <Text style={styles.title}>{pageData[page].title}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>{pageData[page].description}</Text>
        </View>
        <TouchableOpacity onPress={onPressButton} style={styles.button}>
          <Text style={styles.lanjut}>
            {pageData[page].next ? 'LANJUT' : 'MULAI'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 25,
  },
  midContent: {
    marginHorizontal: 'auto',
  },
  botContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  textContainer: {
    height: 100,
    marginTop: 30,
  },
  paragraph: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  lanjut: {
    paddingVertical: 15,
    color: Colors.white.default,
    fontFamily: 'Montserrat-Semibold',
    fontSize: 18,
  },
});

export default Onboarding;

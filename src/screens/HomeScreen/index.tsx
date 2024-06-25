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
import Header from './LocalComponent/Header';
import CustomCarousel from './LocalComponent/CustomCarousel';
import Spacer from '@/components/Spacer';
import {ScrollView} from 'react-native-gesture-handler';
import FeatureList from './LocalComponent/FeatureList';
import ArticleRecommendation from './LocalComponent/ArticleRecommendation';
import CustomModal from '@/components/CustomModal';
import image from '@/assets/images/logo_5.png';
import {useNavigation} from '@react-navigation/native';
import GlobalStyles from '@/styles/GlobalStyles';

function HomeScreen(): React.JSX.Element {
  const [isBiodataComplete] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!isBiodataComplete) {
        setModalVisible(true);
      }

      return () => {
        unsubscribe;
      };
    });

    return unsubscribe;
  }, [navigation, isBiodataComplete]);

  const goToNextPage = () => {
    setModalVisible(false);
    // @ts-ignore
    navigation.navigate('Page1');
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={modalVisible ? 'light-content' : 'dark-content'}
        backgroundColor={
          modalVisible ? Colors.grey.darkest : Colors.white.default
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Spacer height={20} />
        <CustomCarousel />
        <Spacer height={20} />
        <FeatureList />
        <Spacer height={20} />
        <ArticleRecommendation />
      </ScrollView>

      <CustomModal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <Spacer height={20} />
        <Text style={styles.title}>lengkapi Identitas Anda!</Text>
        <Spacer height={20} />
        <TouchableOpacity onPress={goToNextPage} style={styles.button}>
          <Text style={styles.text}>LANJUT</Text>
        </TouchableOpacity>
      </CustomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  button: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 7,
    ...GlobalStyles.shadow,
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: Colors.white.default,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

export default HomeScreen;

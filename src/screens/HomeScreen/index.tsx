import Colors from '@/utils/Colors';
import React, {useCallback, useState} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import GlobalStyles from '@/styles/GlobalStyles';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {getUserProfile} from '@/store/userSlice';

function HomeScreen(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isBioComplete = useSelector(
    (state: RootState) => state.auth.isBioComplete,
  );
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  useFocusEffect(
    useCallback(() => {
      if (isBioComplete) {
        dispatch(getUserProfile({access_token}));
      } else {
        setModalVisible(true);
      }
    }, [isBioComplete, dispatch, access_token]),
  );

  const goToNextPage = () => {
    setModalVisible(false);
    // @ts-ignore
    navigation.navigate('Page1');
  };

  return (
    <SafeAreaView style={GlobalStyles.tabContainer}>
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

      <CustomModal isVisible={modalVisible} onBackdropPress={() => {}}>
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

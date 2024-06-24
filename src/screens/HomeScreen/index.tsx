import Colors from '@/utils/Colors';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Header from './Header';
import CustomCarousel from './CustomCarousel';
import Spacer from '@/components/Spacer';
import {ScrollView} from 'react-native-gesture-handler';
import FeatureList from './FeatureList';
import ArticleRecommendation from './ArticleRecommendation';
import CustomModal from '@/components/CustomModal';
import {useModal} from '@/contexts/Contexts';
import image from '@/assets/images/logo_5.png';
import {useNavigation} from '@react-navigation/native';

function HomeScreen(): React.JSX.Element {
  const [isBiodataComplete, setIsBiodataComplete] = useState(false);
  const {modalVisible, setModalVisible} = useModal();
  const navigation = useNavigation();

  useEffect(() => {}, [isBiodataComplete, setModalVisible]);

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
  }, [navigation, isBiodataComplete, setModalVisible]);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={modalVisible ? 'grey' : Colors.white.default}
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
        image={image}
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Lengkapi Identitas Anda!"
        buttonText="LANJUT"
        onPress={() => {
          setModalVisible(false);
          // @ts-ignore
          navigation.navigate('Page1');
        }}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;

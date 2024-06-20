import Colors from '@/utils/Colors';
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar} from 'react-native';
import Header from './Header';
import CustomCarousel from './CustomCarousel';
import Spacer from '@/components/Spacer';
import {ScrollView} from 'react-native-gesture-handler';
import FeatureList from './FeatureList';
import ArticleRecommendation from './ArticleRecommendation';
import CustomModal from '@/components/CustomModal';
import {useModal} from '@/contexts/Contexts';
import image from '@/assets/images/logo_5.png';

function HomeScreen(): React.JSX.Element {
  const [isBiodataComplete, setIsBiodataComplete] = useState(false);
  const {modalVisible, setModalVisible} = useModal();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isBiodataComplete) {
        setModalVisible(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isBiodataComplete, setModalVisible]);

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
        image={<Image source={image} />}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;

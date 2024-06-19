import Colors from '@/utils/Colors';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Header from './Header';
import CustomCarousel from './CustomCarousel';
import Spacer from '@/components/Spacer';
import {ScrollView} from 'react-native-gesture-handler';

function HomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />

      <ScrollView>
        <Header />
        <Spacer height={20} />
        <CustomCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

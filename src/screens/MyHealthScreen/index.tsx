import Colors from '@/utils/Colors';
import React from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Header, HistoryCard, QuestionnaireCard} from './LocalComponent';
import image from '@/assets/images/logo_2.png';
import GlobalStyles from '@/styles/GlobalStyles';
import Spacer from '@/components/Spacer';

function MyHealthScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />

      <Header title="U-WAYS" />
      <View style={styles.imageContainer}>
        <Image source={image} style={GlobalStyles.image} />
      </View>
      <Spacer height={20} />
      <HistoryCard />
      <Spacer height={20} />
      <QuestionnaireCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default MyHealthScreen;

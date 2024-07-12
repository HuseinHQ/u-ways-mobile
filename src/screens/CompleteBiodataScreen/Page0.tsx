import Colors from '@/utils/Colors';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from './LocalComponent';
import Spacer from '@/components/Spacer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import styles from './style';
import {RootStackParamList} from '@/navigator/StackNavigator';
import InputBox from '../EditProfileScreen/LocalComponent/InputBox';

function Page0(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nip, setNip] = useState('');

  const goToNextPage = () => {
    navigation.navigate('Page2', {nip});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="NIP" />
        <Spacer height={20} />
        <InputBox value={nip} setValue={setNip} keyboardType="numeric" />
        <TouchableOpacity onPress={goToNextPage} style={styles.lanjut}>
          <Text style={[styles.unselectedText, styles.textBold]}>Lanjut</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Page0;

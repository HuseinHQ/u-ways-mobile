import Colors from '@/utils/Colors';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './LocalComponent';
import Spacer from '@/components/Spacer';
import {useNavigation} from '@react-navigation/native';
import styles from './style';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Page1(): React.JSX.Element {
  const navigation = useNavigation();

  const goToNextPage = (value: number) => {
    // @ts-ignore
    navigation.navigate('Page2', {
      semester: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Semester" />
        <Spacer height={20} />
        <View style={styles.buttonContainer}>
          {data?.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => goToNextPage(item)}
              style={styles.button}>
              <Text style={[styles.text, styles.unselectedText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Page1;

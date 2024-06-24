import Colors from '@/utils/Colors';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
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

// TODO: Dummy data
const facultyData = [
  {
    id: 0,
    name: 'Ekonomi dan Bisnis',
  },
  {
    id: 1,
    name: 'Pertanian',
  },
  {
    id: 2,
    name: 'Ilmu Sosial dan Politik',
  },
  {
    id: 3,
    name: 'Arsitektur dan Desain',
  },
  {
    id: 4,
    name: 'Ilmu Komputer',
  },
  {
    id: 5,
    name: 'Hukum',
  },
  {
    id: 6,
    name: 'Kedokteran',
  },
];

type RouteParams = {
  semester: number;
};

function Page2(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {semester} = route.params;

  const goToNextPage = (data: {
    semester: number;
    faculty: {id: number; name: string};
  }) => {
    // @ts-ignore
    navigation.navigate('Page3', data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Fakultas" withBackButton />
        <Spacer height={20} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled
            style={[styles.button, styles.selectedButton]}>
            <Text style={styles.text}>{semester}</Text>
          </TouchableOpacity>
          {facultyData?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => goToNextPage({semester, faculty: item})}
              style={styles.button}>
              <Text style={[styles.text, styles.unselectedText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
});

export default Page2;

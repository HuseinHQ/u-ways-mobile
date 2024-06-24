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
const lecturerData = [
  {
    id: 0,
    name: 'Fetty Tri Anggraeny, S.Kom. M.Kom',
  },
  {
    id: 1,
    name: 'Dr. Basuki Rahmat, S.Si. MT.',
  },
  {
    id: 2,
    name: 'Intan Yuniar Purbasari, S.Kom. MSc.',
  },
  {
    id: 3,
    name: 'Budi Nugroho, S.Kom. M.Kom.',
  },
  {
    id: 4,
    name: 'Chrystia Aji Putra, S.Kom, M.T',
  },
  {
    id: 5,
    name: 'Eva Yulia Puspaningrum, S.Kom., M.Kom',
  },
  {
    id: 6,
    name: 'Faisal Muttaqin, S.Kom, M.T',
  },
  {
    id: 7,
    name: 'Firza Prima Aditiawan, S.Kom., MTI',
  },
  {
    id: 8,
    name: 'Henni Endah Wahanani, ST. M.Kom.',
  },
];

type RouteParams = {
  semester: number;
  faculty: {id: number; name: string};
  major: {id: number; name: string};
};

type NextRouteParams = {
  semester: number;
  faculty: {id: number; name: string};
  major: {id: number; name: string};
  lecturer: {id: number; name: string};
};

function Page4(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {semester, faculty, major} = route.params;

  const goToNextPage = (data: NextRouteParams) => {
    // @ts-ignore
    navigation.navigate('Page5', data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Dosen Wali" withBackButton />
        <Spacer height={20} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled
            style={[styles.button, styles.selectedButton]}>
            <Text style={styles.text}>{semester}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            style={[styles.button, styles.selectedButton]}>
            <Text style={styles.text}>{faculty.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            style={[styles.button, styles.selectedButton]}>
            <Text style={styles.text}>{major.name}</Text>
          </TouchableOpacity>
          {lecturerData?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                goToNextPage({
                  semester,
                  faculty,
                  major,
                  lecturer: {id: item.id, name: item.name},
                })
              }
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

export default Page4;

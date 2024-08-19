import React, {useEffect} from 'react';
import {Header} from './LocalComponent';
import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Colors from '@/utils/Colors';
import Spacer from '@/components/Spacer';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator/StackNavigator';

const screenHeight = Dimensions.get('screen').height;

type RouteParams = {
  id: number;
  semester: number;
  part: number;
};

function QuestionCompleteScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {id, semester, part} = route.params;

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    // Add the back press handler
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const goToHome = () => {
    navigation.reset({index: 0, routes: [{name: 'Main'}]});
  };

  const goToResult = () => {
    navigation.navigate('QuestionnaireResultScreen', {id});
  };

  return (
    <SafeAreaView>
      <Header
        title={`Semester ${semester} - ${part === 0 ? 'Awal' : 'Akhir'}`}
      />
      <View style={styles.container}>
        <Spacer height={screenHeight / 20} />
        <Octicons name="check-circle-fill" size={200} color={Colors.primary} />
        <Spacer height={screenHeight / 20} />
        <Text style={styles.text}>
          Selamat kamu telah menyelesaikan Kuesioner!
        </Text>
        <Spacer height={screenHeight / 5} />
        <TouchableOpacity onPress={goToResult} style={styles.button}>
          <Text style={styles.buttonText}>LIHAT HASIL KUESIONER</Text>
        </TouchableOpacity>
        <Spacer height={10} />
        <TouchableOpacity onPress={goToHome} style={styles.button}>
          <Text style={styles.buttonText}>KEMBALI KE BERANDA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: '80%',
    padding: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white.default,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

export default QuestionCompleteScreen;

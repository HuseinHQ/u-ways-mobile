import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import banner from '@/assets/images/quiz_result.png';
import Colors from '@/utils/Colors';
import GlobalStyles from '@/styles/GlobalStyles';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import data from '@/data/motivationCard.json';
import Spacer from '@/components/Spacer';
import {ScrollView} from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getQuizResult} from '@/store/quizResultActions';
import {QuizResult} from '@/types/quizResult';
import useErrorToast from '@/hooks/useToastError';
import {clearErrors} from '@/store/quizResultSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RouteParams = {
  id: number;
};

function QuestionnaireResultScreen(): React.JSX.Element {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const selectUser = useSelector((state: RootState) => state.user.name);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const errors = useSelector((state: RootState) => state.quizResult.errors);
  const loading = useSelector((state: RootState) => state.quizResult.loading);
  const {id} = route.params;
  const [detail, setDetail] = useState<QuizResult>({} as QuizResult);

  useErrorToast({
    title: 'Error',
    errors,
    dispatchFunction: clearErrors,
  });

  useEffect(() => {
    dispatch(
      getQuizResult({id, callback: (value: QuizResult) => setDetail(value)}),
    );
  }, [dispatch, id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <View style={styles.imageContainer}>
        <Image source={banner} style={GlobalStyles.image} />
        <View style={styles.additionalImage} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleLeft}>Halo</Text>
          <Text style={styles.titleRight}>{selectUser?.split(' ')[0]}</Text>
        </View>

        <Text style={styles.subtitle}>Lihat hasil kuesioner Anda!</Text>

        <View style={styles.horizontalLine} />

        <Spacer height={20} />

        <ScrollView horizontal={true}>
          {data?.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Spacer height={10} />
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.card2}>
          <View>
            <Text style={styles.cardTitle2}>Skor</Text>
            <Text style={styles.cardDescription2}>Rata - Rata</Text>
          </View>

          <AnimatedCircularProgress
            fill={+detail.score || 0}
            size={100}
            width={10}
            backgroundColor={Colors.black.circleBg}
            tintColor={Colors.primary}
            rotation={180}>
            {() =>
              loading ? (
                <ActivityIndicator color={Colors.primary} />
              ) : (
                <Text>{detail.score}%</Text>
              )
            }
          </AnimatedCircularProgress>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 230,
  },
  backButton: {
    position: 'absolute',
    marginTop: StatusBar.currentHeight || 0,
    marginLeft: 20,
  },
  additionalImage: {
    height: 100,
    backgroundColor: Colors.grey.bg,
  },
  mainContainer: {
    borderTopLeftRadius: 75,
    backgroundColor: Colors.white.default,
    padding: 20,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  titleLeft: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
  },
  titleRight: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  horizontalLine: {
    width: '80%',
    height: 1,
    backgroundColor: Colors.black.default,
    borderRadius: 50,
    marginTop: 10,
  },
  card: {
    backgroundColor: Colors.white.default,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    ...GlobalStyles.shadow,
    width: 200,
  },
  cardTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  cardDescription: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
  },
  card2: {
    backgroundColor: Colors.white.default,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: '100%',
    ...GlobalStyles.shadow,
  },
  cardTitle2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: Colors.primary,
  },
  cardDescription2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.primary,
  },
});

export default QuestionnaireResultScreen;

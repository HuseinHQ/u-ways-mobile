import Spacer from '@/components/Spacer';
import {formatDates} from '@/helpers';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import 'moment/locale/id';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, useNavigation} from '@react-navigation/native';

// number images
import number1 from '@/assets/images/number/1.png';
import number2 from '@/assets/images/number/2.png';
import number3 from '@/assets/images/number/3.png';
import number4 from '@/assets/images/number/4.png';
import number5 from '@/assets/images/number/5.png';
import number6 from '@/assets/images/number/6.png';
import number7 from '@/assets/images/number/7.png';
import number8 from '@/assets/images/number/8.png';
import number9 from '@/assets/images/number/9.png';
import number0 from '@/assets/images/number/0.png';
import {RootStackParamList} from '@/navigator/StackNavigator';
import {RootState, useAppDispatch} from '@/store/store';
import {getStudentQuiz} from '@/store/quizActions';
import {useSelector} from 'react-redux';

const numberImages = {
  '0': number0,
  '1': number1,
  '2': number2,
  '3': number3,
  '4': number4,
  '5': number5,
  '6': number6,
  '7': number7,
  '8': number8,
  '9': number9,
} as const;

type NumberKey = keyof typeof numberImages;

function QuestionnaireCard(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const quiz = useSelector((state: RootState) => state.quiz.studentQuiz);
  const quizLoading = useSelector((state: RootState) => state.quiz.loading);
  // const quizLoading = true;

  const goToQuestionnaire = (id: number) => {
    navigation.navigate('QuestionnaireScreen', {id});
  };

  useEffect(() => {
    dispatch(getStudentQuiz({}));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        {!quizLoading && Array.isArray(quiz) && quiz.length > 0 && (
          <Text style={styles.title2}>Kuis Tersedia</Text>
        )}
        {quizLoading && (
          <>
            <Spacer height={40} />
            <ActivityIndicator color={Colors.primary} size={30} />
          </>
        )}
        {!quizLoading &&
          quiz?.map((item, index) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.timeline}>
                <FontAwesome name="circle" size={15} color={Colors.primary} />
                {index !== quiz.length - 1 && (
                  <View style={styles.verticalLine} />
                )}
              </View>
              <View style={styles.innerCardContainer}>
                {/* eslint-disable-next-line react-native/no-inline-styles */}
                <View style={{flexDirection: 'row'}}>
                  {/* <TouchableOpacity> */}
                  <Text style={styles.title}>Kuesioner {index + 1}</Text>
                  {/* </TouchableOpacity> */}
                </View>
                <Spacer height={5} />
                <TouchableOpacity
                  style={styles.innerCard}
                  onPress={() => goToQuestionnaire(item.id)}>
                  <View style={styles.imageContainer}>
                    {(index + 1)
                      .toString()
                      .split('')
                      .map((number, idx) => (
                        <Image
                          key={idx}
                          source={numberImages[number as NumberKey]}
                          style={styles.image}
                        />
                      ))}
                  </View>
                  <View style={styles.contentContainer}>
                    <Text style={styles.semester}>
                      Semester{' '}
                      {item.semester +
                        ' - ' +
                        (item.part === 0 ? 'awal' : 'akhir')}
                    </Text>
                    <View style={styles.timeContainer}>
                      <Text style={styles.dateText}>
                        {item.startTime && item.endTime
                          ? formatDates(item.startTime, item.endTime)
                          : 'Tersedia'}
                      </Text>
                      <MaterialCommunityIcons
                        name="timer-outline"
                        size={18}
                        color={Colors.black.default}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <Spacer height={index === quiz.length - 1 ? 20 : 10} />
              </View>
            </View>
          ))}
        {!quiz.length && !quizLoading && (
          <>
            <Spacer height={40} />
            <Text style={styles.title2}>Belum ada kuis yang tersedia</Text>
          </>
        )}
        <Spacer height={40} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white.default,
    ...GlobalStyles.shadow,
    overflow: 'hidden',
  },
  scrollViewContainer: {
    padding: 17,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.primary,
  },
  title2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 3,
    flexDirection: 'row',
  },
  timeline: {
    marginRight: 15,
    alignItems: 'center',
  },
  verticalLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.primary,
    marginVertical: -3,
  },
  innerCardContainer: {
    flex: 1,
  },
  innerCard: {
    backgroundColor: Colors.white.default,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    ...GlobalStyles.shadow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 36,
    width: 24,
    resizeMode: 'cover',
  },
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  semester: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  dateText: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
  },
});

export default QuestionnaireCard;

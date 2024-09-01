import React, {useEffect, useState} from 'react';
import {Header} from './LocalComponent';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import Spacer from '@/components/Spacer';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {getNewQuiz} from '@/store/quizActions';
import useErrorToast from '@/hooks/useToastError';
import {clearErrors as clearQuizErrors} from '@/store/quizSlice';
import {clearErrors as quizResultClearErrors} from '@/store/quizResultSlice';
import {RootStackParamList} from '@/navigator/StackNavigator';
import {countScore} from '@/helpers';
import {createQuizResult} from '@/store/quizResultActions';

const possibleAnswer = [0, 1, 2, 3];

type RouteParams = {
  semester: number;
  part: number;
};

function QuestionnaireScreen(): React.JSX.Element {
  const [answer, setAnswer] = useState<number[]>([]);
  const newQuiz = useSelector((state: RootState) => state.quiz.newQuiz);
  const loading = useSelector((state: RootState) => state.quiz.loading);
  const quizResultLoading = useSelector(
    (state: RootState) => state.quizResult.loading,
  );
  const quizErrors = useSelector((state: RootState) => state.quiz.errors);
  const quizResultErrors = useSelector(
    (state: RootState) => state.quizResult.errors,
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {semester, part} = route.params;

  const onClickAnswer = (data: {index: number; newValue: number}) => () => {
    const {index, newValue} = data;
    setAnswer(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      if (updatedAnswers[index] === newValue) {
        updatedAnswers[index] = 0;
      } else {
        updatedAnswers[index] = newValue;
      }
      return updatedAnswers;
    });
  };

  const onSubmitHandler = async () => {
    const score = countScore(answer);
    if (score !== false) {
      dispatch(
        createQuizResult({
          data: {
            semester: semester,
            part: part,
            score: score as number,
            answer,
          },
          callback: (value: number) =>
            navigation.navigate('QuestionCompleteScreen', {
              id: value,
              semester: semester,
              part: part,
            }),
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getNewQuiz({}));
  }, [dispatch]);

  useEffect(() => {
    if (newQuiz?.length) {
      const newAnswers = new Array(newQuiz?.length).fill(null);
      setAnswer(newAnswers);
    }
  }, [newQuiz]);

  useErrorToast({
    title: 'Error',
    errors: quizResultErrors,
    dispatchFunction: quizResultClearErrors,
  });

  useErrorToast({
    title: 'Error',
    errors: quizErrors,
    dispatchFunction: clearQuizErrors,
  });

  if (loading) {
    return (
      <View style={GlobalStyles.fullCenter}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Header
        title={`Semester ${semester} - ${part === 0 ? 'Awal' : 'Akhir'}`}
        withBackButton
      />

      <ScrollView>
        <View style={styles.topContainer}>
          {/* <Image source={bg} style={GlobalStyles.image} />
          <Image source={number1} style={styles.image} /> */}
          <Text style={styles.title}>Catatan</Text>
          <Text style={styles.question}>0 : Tidak Pernah</Text>
          <Text style={styles.question}>1{'  '}: Beberapa Hari</Text>
          <Text style={styles.question}>
            2 : Lebih dari separuh waktu yang dimaksud
          </Text>
          <Text style={styles.question}>3 : Hampir Setiap Hari</Text>
        </View>

        <View style={styles.cardContainer}>
          {newQuiz?.map((item, index) => (
            <View key={index} style={styles.questionCard}>
              <Text style={styles.title}>Pertanyaan {index + 1}</Text>
              <Spacer height={10} />
              <Text style={styles.question}>{item.question}</Text>
              <Spacer height={10} />
              <View style={styles.answerContainer}>
                {possibleAnswer?.map((value, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={onClickAnswer({
                      index,
                      newValue: value,
                    })}
                    style={[
                      styles.answer,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        backgroundColor:
                          answer[index] === value
                            ? Colors.white.default
                            : Colors.primary,
                        borderColor:
                          answer[index] === value
                            ? Colors.black.default
                            : 'transparent',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.answerText,
                        {
                          color:
                            answer[index] === value
                              ? Colors.black.default
                              : Colors.white.default,
                        },
                      ]}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Spacer height={5} />
              {/* <View style={styles.yesno}>
                <Text style={styles.yesnoText}>Tidak Pernah</Text>
                <Text style={styles.yesnoText}>Hampir Setiap Hari</Text>
              </View> */}
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={onSubmitHandler}
          style={styles.submitButton}
          disabled={quizResultLoading}>
          {quizResultLoading ? (
            <ActivityIndicator color={Colors.white.default} />
          ) : (
            <Text style={styles.submit}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    // height: Dimensions.get('screen').height / 4,
    paddingHorizontal: 20,
  },
  image: {
    position: 'absolute',
    width: 50,
    height: 75,
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -37.5}],
  },
  cardContainer: {
    padding: 20,
    gap: 20,
  },
  questionCard: {
    backgroundColor: Colors.white.default,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    ...GlobalStyles.shadow,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  question: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  answerContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  answer: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    ...GlobalStyles.shadow,
  },
  answerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: Colors.white.default,
    textAlign: 'center',
  },
  yesno: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yesnoText: {
    fontFamily: 'Poppins-ExtraLight',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    ...GlobalStyles.shadow,
    marginBottom: 80,
  },
  submit: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.white.default,
    textAlign: 'center',
  },
});

export default QuestionnaireScreen;

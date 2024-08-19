import React, {useEffect, useState} from 'react';
import {Header} from './LocalComponent';
import bg from '@/assets/images/gradient_bg.png';
import number1 from '@/assets/images/number/1.png';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
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
import {getQuizDetail} from '@/store/quizActions';
import useErrorToast from '@/hooks/useToastError';
import {clearErrors as clearQuizErrors} from '@/store/quizSlice';
import {clearErrors as quizResultClearErrors} from '@/store/quizResultSlice';
import {RootStackParamList} from '@/navigator/StackNavigator';
import {countScore} from '@/helpers';
import {createQuizResult} from '@/store/quizResultActions';

const possibleAnswer = [1, 2, 3, 4, 5];

type RouteParams = {
  id: number;
};

function QuestionnaireScreen(): React.JSX.Element {
  const [answer, setAnswer] = useState<number[][]>([]);
  const studentQuiz = useSelector((state: RootState) => state.quiz.detail);
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
  const {id} = route.params;

  const onClickAnswer =
    (data: {partIdx: number; questionIdx: number; newValue: number}) => () => {
      const {partIdx, questionIdx, newValue} = data;
      setAnswer(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        if (updatedAnswers[partIdx][questionIdx] === newValue) {
          updatedAnswers[partIdx][questionIdx] = 0;
        } else {
          updatedAnswers[partIdx][questionIdx] = newValue;
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
            semester: studentQuiz.semester,
            part: studentQuiz.part,
            score: score as number,
            answer,
          },
          callback: (value: number) =>
            navigation.navigate('QuestionCompleteScreen', {
              id: value,
              semester: studentQuiz.semester,
              part: studentQuiz.part,
            }),
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getQuizDetail({id}));
  }, [dispatch, id]);

  useEffect(() => {
    if (studentQuiz.details) {
      const newAnswers = studentQuiz.details.map(part =>
        new Array(part.questions.length).fill(0),
      );
      setAnswer(newAnswers);
    }
  }, [studentQuiz.details]);

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
        title={`Semester ${studentQuiz.semester} - ${
          studentQuiz.part === 0 ? 'Awal' : 'Akhir'
        }`}
        withBackButton
      />

      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={bg} style={GlobalStyles.image} />
          <Image source={number1} style={styles.image} />
        </View>

        <View>
          {studentQuiz.details?.map((item, index) => (
            <View key={index} style={styles.cardContainer}>
              <Text style={[styles.title, styles.font18]}>{`Bagian ${
                index + 1
              }: ${item.partName}`}</Text>
              {item.questions.map((question, questionIndex) => (
                <View key={questionIndex} style={styles.questionCard}>
                  <Text style={styles.title}>
                    Pertanyaan {questionIndex + 1}
                  </Text>
                  <Spacer height={10} />
                  <Text style={styles.question}>{question}</Text>
                  <Spacer height={10} />
                  <View style={styles.answerContainer}>
                    {possibleAnswer?.map((value, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={onClickAnswer({
                          partIdx: index,
                          questionIdx: questionIndex,
                          newValue: value,
                        })}
                        style={[
                          styles.answer,
                          // eslint-disable-next-line react-native/no-inline-styles
                          {
                            backgroundColor:
                              answer.length &&
                              answer[index][questionIndex] === value
                                ? Colors.white.default
                                : Colors.primary,
                            borderColor:
                              answer.length &&
                              answer[index][questionIndex] === value
                                ? Colors.black.default
                                : 'transparent',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.answerText,
                            {
                              color:
                                answer.length &&
                                answer[index][questionIndex] === value
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
                  <View style={styles.yesno}>
                    <Text style={styles.yesnoText}>Tidak Setuju</Text>
                    <Text style={styles.yesnoText}>Setuju</Text>
                  </View>
                </View>
              ))}
              {index === studentQuiz.details.length - 1 && (
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
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: Dimensions.get('screen').height / 4,
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

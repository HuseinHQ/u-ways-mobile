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
} from 'react-native';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import Spacer from '@/components/Spacer';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';

const possibleAnswer = [1, 2, 3, 4, 5];

function QuestionnaireScreen(): React.JSX.Element {
  const [answer, setAnswer] = useState<number[][]>([]);
  console.log(answer);
  const studentQuiz = useSelector((state: RootState) => state.quiz.studentQuiz);
  const navigation = useNavigation();

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

  const onSubmitHandler = () => {
    // @ts-ignore
    navigation.navigate('QuestionCompleteScreen');
  };

  useEffect(() => {
    if (studentQuiz.details) {
      const newAnswers = studentQuiz.details.map(part =>
        new Array(part.questions.length).fill(0),
      );
      setAnswer(newAnswers);
    }
  }, [studentQuiz.details]);

  return (
    <SafeAreaView>
      <Header
        title={`Semester ${studentQuiz.semester} - ${studentQuiz.part + 1}`}
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
            </View>
          ))}

          <TouchableOpacity
            onPress={onSubmitHandler}
            style={styles.submitButton}>
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
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
  },
  submit: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.white.default,
    textAlign: 'center',
  },
});

export default QuestionnaireScreen;

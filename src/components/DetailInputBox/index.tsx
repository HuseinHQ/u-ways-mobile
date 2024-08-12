import {QuizDetail, SetQuizDetailValue} from '@/types/quiz';
import Colors from '@/utils/Colors';
import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

type DetailInputBoxProps = {
  data: QuizDetail[];
  onPress?: () => void;
  setQuizDetailValue: (value: SetQuizDetailValue) => void;
};

function DetailInputBox({
  data,
  onPress = () => {},
  setQuizDetailValue = () => {},
}: DetailInputBoxProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress}>
      {data.map((item, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.partContainer}>
            <Text style={styles.partName}>Bagian {index + 1}:</Text>
            <TextInput
              value={item.partName}
              style={[styles.textinput, styles.partName]}
              onChangeText={value =>
                setQuizDetailValue({
                  field: 'partName',
                  fieldValue: value,
                  partIndex: index,
                })
              }
            />
          </View>
          {item.questions.map((question, idx) => (
            <View key={idx} style={styles.questionContainer}>
              <Text style={[styles.question, styles.leftQuestion]}>
                {idx + 1}.
              </Text>
              <TextInput
                value={question}
                style={[styles.question, styles.rightQuestion]}
                multiline={true}
                onChangeText={val => {
                  setQuizDetailValue({
                    field: 'questions',
                    fieldValue: val,
                    partIndex: index,
                    questionIndex: idx,
                  });
                }}
              />
            </View>
          ))}
        </View>
      ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  partContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    gap: 5,
    alignItems: 'center',
  },
  partName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  textinput: {
    color: Colors.black.default,
    padding: 0,
    margin: 0,
    flex: 1,
  },
  questionContainer: {
    flexDirection: 'row',
  },
  question: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignItems: 'center',
  },
  leftQuestion: {
    width: 20,
  },
  rightQuestion: {
    flex: 1,
    color: Colors.black.default,
    margin: 0,
    padding: 0,
  },
});

export default DetailInputBox;

import {QuizDetail, SetQuizDetailValue} from '@/types/quiz';
import Colors from '@/utils/Colors';
import React, {useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type DetailInputBoxProps = {
  data: QuizDetail[];
  onPress?: () => void;
  setQuizDetailValue: (
    value: SetQuizDetailValue,
    callback?: () => void,
  ) => void;
};

function DetailInputBox({
  data,
  onPress = () => {},
  setQuizDetailValue = () => {},
}: DetailInputBoxProps): React.JSX.Element {
  const [enterPressed, setEnterPressed] = useState(false);
  const questionRefs = useRef<(TextInput | null)[][]>([]);

  const deletePartName = (index: number) => {
    setQuizDetailValue({
      field: 'partName',
      fieldValue: 'delete',
      partIndex: index,
    });
  };

  const onChangeTextHandler =
    (partNameIdx: number, questionIdx: number) => (val: string) => {
      if (!enterPressed) {
        setQuizDetailValue({
          field: 'questions',
          fieldValue: val,
          partIndex: partNameIdx,
          questionIndex: questionIdx,
        });
      } else {
        setEnterPressed(false);
      }
    };

  const addNewPartHandler = (index: number) => () => {
    setQuizDetailValue({
      field: 'partName',
      fieldValue: 'add',
      partIndex: index,
    });
  };

  if (data.length === 0) {
    return (
      <Pressable onPress={onPress} style={{paddingBottom: 10}}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addNewPartHandler(0)}>
          <Ionicons name="add-circle" color={Colors.green.default} size={24} />
        </TouchableOpacity>
      </Pressable>
    );
  }

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
            <TouchableOpacity onPress={() => deletePartName(index)}>
              <Ionicons
                name="remove-circle"
                size={24}
                color={Colors.red.default}
              />
            </TouchableOpacity>
          </View>
          {item.questions.map((question, idx) => (
            <View key={idx} style={styles.questionContainer}>
              <Text style={[styles.question, styles.leftQuestion]}>
                {idx + 1}.
              </Text>
              <TextInput
                ref={el => {
                  if (!questionRefs.current[index]) {
                    questionRefs.current[index] = [];
                  }
                  questionRefs.current[index][idx] = el;
                }}
                value={question}
                style={[styles.question, styles.rightQuestion]}
                multiline={true}
                onChangeText={onChangeTextHandler(index, idx)}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Enter') {
                    setEnterPressed(true);
                    const insertIndex = idx + 1;
                    setQuizDetailValue(
                      {
                        field: 'questions',
                        fieldValue: 'enter',
                        partIndex: index,
                        questionIndex: insertIndex,
                      },
                      () => {
                        if (
                          questionRefs.current[index] &&
                          questionRefs.current[index][insertIndex]
                        ) {
                          questionRefs.current[index][insertIndex]?.focus();
                        }
                      },
                    );
                  } else if (nativeEvent.key === 'Backspace') {
                    if (question === '') {
                      setQuizDetailValue(
                        {
                          field: 'questions',
                          fieldValue: 'delete',
                          partIndex: index,
                          questionIndex: idx,
                        },
                        () => {
                          if (
                            questionRefs.current[index] &&
                            questionRefs.current[index][idx - 1]
                          ) {
                            questionRefs.current[index][idx - 1]?.focus();
                          } else if (
                            questionRefs.current[index] &&
                            questionRefs.current[index][idx + 1]
                          ) {
                            questionRefs.current[index][idx + 1]?.focus();
                          }
                        },
                      );
                    }
                  }
                }}
              />
            </View>
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={addNewPartHandler(index)}>
            <Ionicons
              name="add-circle"
              color={Colors.green.default}
              size={24}
            />
          </TouchableOpacity>
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
    alignItems: 'flex-start',
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
  addButton: {
    marginTop: 5,
    alignSelf: 'center',
  },
});

export default DetailInputBox;

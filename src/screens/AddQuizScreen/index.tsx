import CustomHeader from '@/components/CustomHeader';
import DetailInputBox from '@/components/DetailInputBox';
import InputBox from '@/components/InputBox';
import Spacer from '@/components/Spacer';
import useErrorToast from '@/hooks/useToastError';
import {DrawerParamList} from '@/navigator/DrawerNavigator';
import {createQuiz} from '@/store/quizActions';
import {clearErrors} from '@/store/quizSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import {QuizRequest, SetQuizDetailValue} from '@/types/quiz';
import Colors from '@/utils/Colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

function AddQuizScreen(): React.JSX.Element {
  const [quizData, setQuizData] = useState<QuizRequest>({
    title: '',
    details: [],
    semester: 0,
    part: 0,
    startTime: undefined,
    endTime: undefined,
  });
  const [openDropdown, setOpenDropdown] = useState([false]);
  const [partData, setPartData] = useState([
    {label: 'Awal', value: 0},
    {label: 'Akhir', value: 1},
  ]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const loading = useSelector((state: RootState) => state.quiz.loading);
  const errors = useSelector((state: RootState) => state.quiz.errors);
  useErrorToast({
    title: 'Gagal',
    errors,
    dispatchFunction: clearErrors,
  });

  const submitHandler = () => {
    dispatch(
      createQuiz({
        requestBody: quizData,
        callback: () => navigation.goBack(),
      }),
    );
  };

  const setValue = (name: keyof QuizRequest) => (value: any) => {
    setQuizData(prevState => ({
      ...prevState,
      [name]: typeof value === 'function' ? value() : value,
    }));
  };

  const setQuizDetailValue = (
    value: SetQuizDetailValue,
    callback = () => {},
  ) => {
    const updatedDetails = [...quizData.details];
    const {partIndex, questionIndex, field, fieldValue} = value;
    if (field === 'partName') {
      if (fieldValue === 'delete') {
        updatedDetails.splice(partIndex, 1);
      } else if (fieldValue === 'add') {
        if (updatedDetails[partIndex + 1]) {
          updatedDetails.splice(partIndex + 1, 0, {
            partName: '',
            questions: [''],
          });
        } else {
          updatedDetails.push({partName: '', questions: ['']});
        }
      } else {
        updatedDetails[partIndex] = {
          ...updatedDetails[partIndex],
          partName: fieldValue,
        };
      }
    } else if (field === 'questions' && questionIndex !== undefined) {
      const updatedQuestions = [...updatedDetails[partIndex].questions];
      if (fieldValue === 'enter') {
        if (updatedQuestions[questionIndex]) {
          updatedQuestions.splice(questionIndex, 0, '');
        } else {
          updatedQuestions.push('');
        }
      } else if (fieldValue === 'delete') {
        updatedQuestions.splice(questionIndex, 1);
      } else {
        updatedQuestions[questionIndex] = fieldValue;
      }
      updatedDetails[partIndex] = {
        ...updatedDetails[partIndex],
        questions: updatedQuestions,
      };
      if (fieldValue === 'enter' || fieldValue === 'delete') {
        setTimeout(() => {
          callback();
        }, 1);
      }
    }
    setQuizData(prevState => ({
      ...prevState,
      details: updatedDetails,
    }));
  };

  const setOpenDropdownIndex = (index: number) => () => {
    setOpenDropdown(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const closeAllDropdown = () => {
    setOpenDropdown([false]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Tambah Kuesioner"
        titleColor={Colors.black.default}
        titleFontSize={20}
        onPress={() => {
          Keyboard.dismiss();
          closeAllDropdown();
        }}
      />

      <ScrollView>
        <InputBox
          value={quizData.title}
          label="Judul"
          setValue={setValue('title')}
          onPress={closeAllDropdown}
        />
        <InputBox
          value={quizData.semester.toString()}
          label="Semester"
          setValue={setValue('semester')}
          onPress={closeAllDropdown}
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Bagian:</Text>
        <Spacer height={10} />
        <DropDownPicker
          open={openDropdown[0]}
          value={quizData.part}
          items={partData}
          setOpen={setOpenDropdownIndex(0)}
          setValue={setValue('part')}
          setItems={setPartData}
          placeholder="Awal/Akhir"
        />

        <Spacer height={15} />
        <Text style={styles.label}>Detail:</Text>
        <Spacer height={10} />
        <DetailInputBox
          data={quizData.details}
          setQuizDetailValue={setQuizDetailValue}
        />
      </ScrollView>

      <Pressable
        onPress={() => {
          closeAllDropdown();
          Keyboard.dismiss();
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, GlobalStyles.bgGreen]}
          onPress={submitHandler}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={24} color={Colors.white.default} />
          ) : (
            <Text style={[Fonts.white, Fonts.subtitleMontserrat]}>
              Tambahkan
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    flex: 1,
    height: 50,
    ...GlobalStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});

export default AddQuizScreen;

import Colors from '@/utils/Colors';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Header, HistoryCard, QuestionnaireCard} from './LocalComponent';
import image from '@/assets/images/logo_2.png';
import GlobalStyles from '@/styles/GlobalStyles';
import Spacer from '@/components/Spacer';
import useErrorToast from '@/hooks/useToastError';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {clearErrors as quizClearErrors} from '@/store/quizSlice';
import {clearErrors as quizResultClearErrors} from '@/store/quizResultSlice';
import {getAllQuizResluts} from '@/store/quizResultActions';

function MyHealthScreen(): React.JSX.Element {
  const quizErrors = useSelector((state: RootState) => state.quiz.errors);
  const quizResultErrors = useSelector(
    (state: RootState) => state.quizResult.errors,
  );
  const dispatch = useAppDispatch();

  useErrorToast({
    title: 'Error',
    errors: quizErrors,
    dispatchFunction: quizClearErrors,
  });
  useErrorToast({
    title: 'Error',
    errors: quizResultErrors,
    dispatchFunction: quizResultClearErrors,
  });

  useEffect(() => {
    dispatch(getAllQuizResluts());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />

      <Header title="U-WAYS" />
      <View style={styles.imageContainer}>
        <Image source={image} style={GlobalStyles.image} />
      </View>
      <Spacer height={20} />
      <HistoryCard />
      <Spacer height={20} />
      <QuestionnaireCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    flex: 1,
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default MyHealthScreen;

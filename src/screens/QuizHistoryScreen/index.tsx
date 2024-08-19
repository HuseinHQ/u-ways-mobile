import CustomHeader from '@/components/CustomHeader';
import React, {useEffect} from 'react';
import banner from '@/assets/images/history_bg.jpg';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {RootState, useAppDispatch} from '@/store/store';
import {getAllQuizResluts} from '@/store/quizResultActions';
import {useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator/StackNavigator';

function QuizHistoryScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.quizResult.data);
  const summary = useSelector((state: RootState) => state.quizResult.summary);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const goToDetail = (id: number) => {
    navigation.navigate('QuestionnaireResultScreen', {id});
  };

  useEffect(() => {
    dispatch(getAllQuizResluts());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image source={banner} style={GlobalStyles.image} />
        </View>
        <View style={styles.padding}>
          <CustomHeader title="Riwayat" titleColor={Colors.black.default} />

          <View style={styles.mid}>
            <AnimatedCircularProgress
              fill={+summary.scoreAverage || 0}
              size={140}
              width={10}
              backgroundColor={Colors.black.circleBg}
              tintColor={Colors.primary}
              rotation={180}>
              {() => (
                <Text style={styles.text}>{summary.scoreAverage || 0}%</Text>
              )}
            </AnimatedCircularProgress>
          </View>

          {data?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => goToDetail(item.id)}>
              <AnimatedCircularProgress
                fill={+item.score || 0}
                size={50}
                width={4}
                backgroundColor={Colors.black.circleBg}
                tintColor={Colors.primary}
                rotation={180}>
                {() => <Text style={styles.text2}>{item.score || 0}%</Text>}
              </AnimatedCircularProgress>
              <Text style={styles.text3}>{`Semester ${item.semester} - ${
                item.part === 0 ? 1 : 2
              }`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: 300,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
    paddingTop: 0,
  },
  mid: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.black.circleBg,
  },
  text2: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: Colors.black.circleBg,
  },
  text3: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  card: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: Colors.white.default,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    ...GlobalStyles.shadow,
  },
});

export default QuizHistoryScreen;

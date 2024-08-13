import Spacer from '@/components/Spacer';
import {formatDates} from '@/helpers';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import 'moment/locale/id';
import React from 'react';
import {
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
import {useAppDispatch} from '@/store/store';
import {getStudentQuiz} from '@/store/quizActions';

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

const questionnaireData = [
  {
    semester: 1,
    part: 1,
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-07'),
  },
  {
    semester: 1,
    part: 2,
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-07'),
  },
  {
    semester: 2,
    part: 1,
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-07'),
  },
  {
    semester: 2,
    part: 2,
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-07'),
  },
];

function QuestionnaireCard(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handleAddNewQuestionnaire = () => {
    dispatch(
      getStudentQuiz({
        callback: () => navigation.navigate('QuestionnaireScreen'),
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        {questionnaireData?.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.timeline}>
              <FontAwesome name="circle" size={15} color={Colors.primary} />
              <View style={styles.verticalLine} />
            </View>
            <View style={styles.innerCardContainer}>
              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Text style={styles.title}>Kuesioner {index + 1}</Text>
                </TouchableOpacity>
              </View>
              <Spacer height={5} />
              <TouchableOpacity style={styles.innerCard}>
                <View style={styles.imageContainer}>
                  {item.semester
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
                    Semester {item.semester + ' - ' + item.part}
                  </Text>
                  <View style={styles.timeContainer}>
                    <Text style={styles.dateText}>
                      {formatDates(item.startDate, item.endDate)}
                    </Text>
                    <MaterialCommunityIcons
                      name="timer-outline"
                      size={18}
                      color={Colors.black.default}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <Spacer
                height={index === questionnaireData.length - 1 ? 20 : 10}
              />
            </View>
          </View>
        ))}
        <View style={styles.card}>
          <View style={styles.timeline}>
            <FontAwesome name="circle" size={15} color={Colors.primary} />
          </View>
          <View style={styles.innerCardContainer}>
            <TouchableOpacity
              onPress={handleAddNewQuestionnaire}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{alignSelf: 'center'}}>
              <FontAwesome name="plus" size={40} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
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

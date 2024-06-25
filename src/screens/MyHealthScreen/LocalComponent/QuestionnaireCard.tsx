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
import number1 from '@/assets/images/number/1.png';

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
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Text style={styles.title}>Kuesioner {index + 1}</Text>
                </TouchableOpacity>
              </View>
              <Spacer height={5} />
              <TouchableOpacity style={styles.innerCard}>
                <View style={styles.imageContainer}>
                  <Image source={number1} style={GlobalStyles.image} />
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
            <TouchableOpacity style={{alignSelf: 'center'}}>
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
    paddingHorizontal: 20,
    borderRadius: 5,
    ...GlobalStyles.shadow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageContainer: {
    width: 40,
    height: 60,
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

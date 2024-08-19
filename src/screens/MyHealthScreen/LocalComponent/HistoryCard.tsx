import Spacer from '@/components/Spacer';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import image from '@/assets/images/history.png';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator/StackNavigator';

function HistoryCard(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goToHistory = () => {
    navigation.navigate('QuizHistoryScreen');
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topContent}>
          <MaterialIcons
            name="history"
            size={36}
            color={Colors.black.halfOpacity}
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>Riwayat</Text>
            <Text style={styles.subtitle}>Kuesioner</Text>
          </View>
        </View>

        <Spacer height={15} />

        <TouchableOpacity style={styles.button} onPress={goToHistory}>
          <Text style={styles.buttonText}>Lihat Riwayat</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: Colors.white.default,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...GlobalStyles.shadow,
  },
  topContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: -5,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 10,
    ...GlobalStyles.shadow,
  },
  buttonText: {
    color: Colors.white.default,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default HistoryCard;

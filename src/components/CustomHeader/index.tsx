import Colors from '@/utils/Colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spacer from '../Spacer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type CustomHeaderProps = {
  title: string;
  description?: string;
};

function CustomHeader({
  title,
  description,
}: CustomHeaderProps): React.JSX.Element {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Spacer width={20} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Spacer height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: Colors.primary,
  },
  description: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    marginTop: 3,
  },
});

export default CustomHeader;

import Colors from '@/utils/Colors';
import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spacer from '../Spacer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type CustomHeaderProps = {
  title: string;
  description?: string;
  titleColor?: string;
  onPress?: () => void;
  titleFontSize?: number;
};

function CustomHeader({
  title,
  description,
  titleColor = Colors.primary,
  onPress,
  titleFontSize = 24,
}: CustomHeaderProps): React.JSX.Element {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Montserrat-Bold',
      fontSize: titleFontSize,
      color: titleColor,
    },
    description: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 13,
      marginTop: 3,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Spacer width={20} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      {description && <Spacer height={20} />}
    </Pressable>
  );
}

export default CustomHeader;

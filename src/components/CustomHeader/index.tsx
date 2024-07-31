import Colors from '@/utils/Colors';
import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Spacer from '../Spacer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions, useNavigation} from '@react-navigation/native';

type CustomHeaderProps = {
  title: string;
  description?: string;
  titleColor?: string;
  onPress?: () => void;
  titleFontSize?: number;
  leftButtonType?: 'back' | 'menu';
};

function CustomHeader({
  title,
  description,
  titleColor = Colors.primary,
  onPress,
  titleFontSize = 24,
  leftButtonType = 'back',
}: CustomHeaderProps): React.JSX.Element {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
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
        <TouchableOpacity
          onPress={leftButtonType === 'back' ? goBack : openDrawer}>
          {leftButtonType === 'back' ? (
            <Ionicons name="arrow-back" size={24} />
          ) : (
            <Feather name="menu" size={24} />
          )}
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

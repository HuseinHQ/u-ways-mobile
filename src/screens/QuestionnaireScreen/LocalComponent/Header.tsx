import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type HeaderProps = {
  title: string;
  withBackButton?: boolean;
};

function Header({
  title,
  withBackButton = false,
}: HeaderProps): React.JSX.Element {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity disabled={!withBackButton} onPress={goBack}>
          {withBackButton && (
            <MaterialCommunityIcons name="arrow-left" size={30} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer2}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  innerContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  innerContainer2: {
    flex: 0.8,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
  },
});

export default Header;

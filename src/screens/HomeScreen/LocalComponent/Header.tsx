import Spacer from '@/components/Spacer';
import {RootState} from '@/store/store';
import Fonts from '@/styles/Fonts';
import Colors from '@/utils/Colors';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

function Header(): React.JSX.Element {
  const selectUser = useSelector((state: RootState) => state.user.name);

  return (
    <View>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={[Fonts.title, styles.textRed]}>Halo</Text>
          <Text style={Fonts.title}>{selectUser}!</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} />
        </TouchableOpacity>
      </View>

      <Spacer height={5} />

      <Text style={styles.text}>
        Mari wujudkan kesehatan mental yang lebih baik
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  textRed: {
    color: Colors.primary,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
});

export default Header;

import {RootState} from '@/store/store';
import Colors from '@/utils/Colors';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

function ChatCard({item}: any): React.JSX.Element {
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        // @ts-ignore
        navigation.navigate('ChatDetailScreen', {chatId: item.chatId})
      }
      style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.user.name[0]}</Text>
      </View>
      <View style={styles.midContent}>
        <Text style={styles.title}>{item.user.name}</Text>
        <Text style={styles.subtitle}>
          {user.role === 'mahasiswa' ? 'Dosen Wali' : user.email.split('@')[0]}
        </Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.date}>
          {moment(item.updatedAt).isSame(moment(), 'day')
            ? moment(item.updatedAt).format('HH:mm')
            : moment(item.updatedAt).format('D/M/YY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    borderRadius: 200,
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midContent: {
    flex: 1,
  },
  rightContent: {
    alignSelf: 'flex-start',
  },
  avatarText: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.white.default,
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  subtitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  date: {
    fontFamily: 'Montserrat-Regular',
  },
});

export default ChatCard;

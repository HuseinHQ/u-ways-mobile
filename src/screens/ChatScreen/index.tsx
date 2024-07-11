import Colors from '@/utils/Colors';
import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Header from '../ChatScreen/LocalComponent/Header';
import {useNavigation} from '@react-navigation/native';
import {RootState, useAppDispatch} from '@/store/store';
import {getChats} from '@/store/chatSlice';
import {useSelector} from 'react-redux';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {database} from '@/config/firebase';
import ChatCard from './LocalComponent/ChatCard';

function ChatScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const chats = useSelector((state: RootState) => state.chat.data);
  const user = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    dispatch(getChats({access_token}));
  }, [dispatch, access_token]);

  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(
      collectionRef,
      where('participants', 'array-contains', user.email),
    );

    const unsubscribe = onSnapshot(q, () => {
      dispatch(getChats({access_token}));
    });

    return () => unsubscribe();
  }, [user.email, access_token, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <FlatList
        data={chats}
        ListHeaderComponent={<Header title="Chat" />}
        renderItem={({item}: {item: any}) => <ChatCard item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default ChatScreen;

import Colors from '@/utils/Colors';
import React, {useLayoutEffect, useMemo} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../ChatScreen/LocalComponent/Header';
import {RootState, useAppDispatch} from '@/store/store';
import {getChats} from '@/store/chatSlice';
import {useSelector} from 'react-redux';
import {doc, onSnapshot} from 'firebase/firestore';
import {database} from '@/config/firebase';
import ChatCard from './LocalComponent/ChatCard';

function ChatScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const chats = useSelector((state: RootState) => state.chat.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedChats = useMemo(() => chats, [JSON.stringify(chats)]);

  useLayoutEffect(() => {
    const unsubscribeFunctions = memoizedChats.map((chat: any) => {
      const chatDocRef = doc(database, 'chats', chat.chatId);

      return onSnapshot(chatDocRef, () => {
        dispatch(getChats({access_token}));
      });
    });

    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }, [memoizedChats, dispatch, access_token]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <FlatList
        data={chats}
        ListHeaderComponent={<Header title="Chat" />}
        renderItem={({item, index}: {item: any; index: number}) => (
          <>
            <ChatCard item={item} />
            {index !== chats.length - 1 && (
              <View style={styles.horizontalLine} />
            )}
          </>
        )}
      />
      {!chats.length && (
        <View style={styles.emptyChatsContainer}>
          <Text style={styles.emptyChats}>Anda belum memiliki mahasiswa</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  horizontalLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: Colors.black.halfOpacity,
  },
  emptyChatsContainer: {
    height: Dimensions.get('screen').height * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChats: {
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default ChatScreen;

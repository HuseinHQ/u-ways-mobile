import {database} from '@/config/firebase';
import Colors from '@/utils/Colors';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
// @ts-ignore
import id from 'dayjs/locale/id';

function ChatDetailScreen(): React.JSX.Element {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useLayoutEffect(() => {
    const collectionRef = collection(
      database,
      'chats',
      'a745778c-6a8b-491b-9713-6c27bcf4782b',
      'messages',
    );
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(
        snapshot.docs.map(doc => {
          console.log(doc.id);
          return {
            _id: doc.id,
            createdAt: doc.data().createdAt,
            text: doc.data().text,
            user: doc.data().user,
          };
        }),
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((message = []) => {
    (message[0] as IMessage).pending = true;
    setMessages(prevMessages => GiftedChat.append(prevMessages, message[0]));

    // const {_id, createdAt, text, user} = message[0];
    // addDoc(collection(database, 'chats'), {
    //   _id,
    //   createdAt,
    //   text,
    //   user,
    // });
  }, []);

  return (
    <GiftedChat
      textInputProps={{color: Colors.black.default}}
      messages={messages}
      user={{_id: 1}}
      renderAvatar={null}
      locale={id}
      dateFormat="D MMMM YYYY"
      timeFormat="HH:mm"
      onSend={onSend}
    />
  );
}

export default ChatDetailScreen;

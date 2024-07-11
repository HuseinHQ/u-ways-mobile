import {database} from '@/config/firebase';
import Colors from '@/utils/Colors';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
} from 'react-native-gifted-chat';
// @ts-ignore
import indonesia from 'dayjs/locale/id';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {updateChatDate} from '@/store/chatSlice';

type RouteParams = {
  chatId: string;
};

type CustomBubbleProps = BubbleProps<IMessage>;

function ChatDetailScreen(): React.JSX.Element {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {chatId} = route.params;
  const email = useSelector((state: RootState) => state.user.email);
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats', chatId, 'messages');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      if (snapshot.docs.length) {
        setMessages(
          snapshot.docs.map(doc => {
            console.log(doc.id);
            return {
              _id: doc.id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            };
          }),
        );
      } else {
        setMessages([
          {
            _id: 0,
            text: 'Ini adalah permulaan chat',
            system: true,
            user: {_id: 0},
            createdAt: 0,
          },
        ]);
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(
    (message = []) => {
      (message[0] as IMessage).pending = true;
      setMessages(prevMessages => GiftedChat.append(prevMessages, message[0]));

      const {_id, createdAt, text, user} = message[0];
      addDoc(collection(database, 'chats', chatId, 'messages'), {
        _id,
        createdAt,
        text,
        user,
      });
      dispatch(updateChatDate({access_token, id: chatId, date: createdAt}));
    },
    [chatId, access_token, dispatch],
  );

  const renderBubble = (props: CustomBubbleProps) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.primary,
          },
          left: {
            backgroundColor: Colors.grey.default,
          },
        }}
      />
    );
  };

  return (
    <GiftedChat
      textInputProps={{color: Colors.black.default}}
      messages={messages}
      user={{_id: email}}
      renderAvatar={null}
      locale={indonesia}
      dateFormat="D MMMM YYYY"
      timeFormat="HH:mm"
      onSend={onSend as any}
      messagesContainerStyle={{backgroundColor: Colors.grey.lighter}}
      renderBubble={renderBubble}
    />
  );
}

export default ChatDetailScreen;

import {database} from '@/config/firebase';
import Colors from '@/utils/Colors';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {updateChatDate} from '@/store/chatSlice';
import renderInputToolbar from './renderInputToolbar';
import renderBubble from './renderBubble';
import renderMessageImage from './renderMessageImage';
import * as DocumentPicker from 'react-native-document-picker';
import renderChatFooter from './renderChatFooter';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {getMimeType} from '@/helpers';

type RouteParams = {
  chatId: string;
};

interface File extends IMessage {
  url?: string;
}

function ChatDetailScreen(): React.JSX.Element {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {chatId} = route.params;
  const email = useSelector((state: RootState) => state.user.email);
  const dispatch = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const [isAttachImage, setIsAttachImage] = useState(false);
  const [isAttachFile, setIsAttachFile] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [filePath, setFilePath] = useState('');

  const postFile = useCallback(
    async (file: FormData) => {
      try {
        console.log(file._parts[0]);
        const {data} = await axios({
          method: 'POST',
          url: `${process.env.BACKEND_URL}/chats/file`,
          headers: {
            accept: 'application/json',
            'X-Access-Token': access_token,
            'Content-Type': 'multipart/form-data',
          },
          data: file,
        });

        return data.data.url;
      } catch (error) {
        Toast.show({type: 'error', text1: 'Gagal mengirim file'});
      }
    },
    [access_token],
  );

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats', chatId, 'messages');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      if (snapshot.docs.length) {
        setMessages(
          snapshot.docs.map(docuemnt => {
            return {
              _id: docuemnt.id,
              createdAt: docuemnt.data().createdAt.toDate(),
              text: docuemnt.data().text,
              user: docuemnt.data().user,
              image: docuemnt.data().image,
              file: docuemnt.data().file,
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
    async (message: any = []) => {
      let imageUrl = '';
      let fileUrl = '';

      if (isAttachImage) {
        const formData = new FormData();
        const mimeType = getMimeType(imagePath);

        formData.append('file', {
          uri: imagePath,
          type: mimeType,
          name: imagePath.split('/').pop(),
        });
        const url = await postFile(formData);
        imageUrl = url;
        setImagePath(() => url);
        message[0].image = url;
      } else if (isAttachFile) {
        const formData = new FormData();
        formData.append('file', {
          uri: filePath,
          type: 'application/*',
          name: filePath.split('/').pop(),
        });
        const url = await postFile(formData);
        fileUrl = url;
        setFilePath(() => url);
        message[0].url = url;
      }
      setMessages(prevMessages => GiftedChat.append(prevMessages, message[0]));

      const {_id, createdAt, text, user} = message[0];
      addDoc(collection(database, 'chats', chatId, 'messages'), {
        _id,
        createdAt,
        text,
        user,
        file: fileUrl,
        image: imageUrl,
      }).then(() => {
        const chatDocRef = doc(database, 'chats', chatId);
        updateDoc(chatDocRef, {
          updatedAt: createdAt,
        });
      });

      dispatch(
        updateChatDate({access_token, id: chatId, date: createdAt as Date}),
      );

      setIsAttachImage(false);
      setIsAttachFile(false);
      setImagePath('');
      setFilePath('');
    },
    [
      chatId,
      access_token,
      dispatch,
      filePath,
      imagePath,
      isAttachFile,
      isAttachImage,
      postFile,
    ],
  );

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        mode: 'import',
        allowMultiSelection: true,
      });
      const fileUri = result[0].fileCopyUri;
      if (!fileUri) {
        console.log('File URI is undefined or null');
        return;
      }
      if (
        fileUri.indexOf('.png') !== -1 ||
        fileUri.indexOf('.jpg') !== -1 ||
        fileUri.indexOf('.jpeg') !== -1
      ) {
        setImagePath(fileUri);
        setIsAttachImage(true);
      } else {
        setFilePath(fileUri);
        setIsAttachFile(true);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    }
  };

  return (
    <GiftedChat
      textInputProps={{color: Colors.black.default}}
      messages={messages}
      user={{_id: email}}
      renderAvatar={null}
      locale="id"
      dateFormat="D MMMM YYYY"
      timeFormat="HH:mm"
      onSend={onSend as any}
      messagesContainerStyle={{backgroundColor: Colors.grey.lighter}}
      renderBubble={renderBubble}
      renderInputToolbar={props => renderInputToolbar({...props, pickDocument})}
      renderMessageImage={renderMessageImage}
      renderChatFooter={() =>
        renderChatFooter({imagePath, setImagePath, filePath, setFilePath})
      }
    />
  );
}

export default ChatDetailScreen;

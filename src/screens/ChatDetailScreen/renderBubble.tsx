import React from 'react';
import Colors from '@/utils/Colors';
import {Bubble, BubbleProps, IMessage} from 'react-native-gifted-chat';

type CustomBubbleProps = BubbleProps<IMessage>;

export default function renderBubble(props: CustomBubbleProps) {
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
}

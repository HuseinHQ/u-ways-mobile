import Colors from '@/utils/Colors';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import Header from '../ChatScreen/LocalComponent/Header';

function ChatScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <ScrollView>
        <Header title="Chat" withBackButton />
      </ScrollView>
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

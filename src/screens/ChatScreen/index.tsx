import Colors from '@/utils/Colors';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import Header from '../ChatScreen/LocalComponent/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

function ChatScreen(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <ScrollView>
        <Header title="Chat" withBackButton />
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate('ChatDetailScreen')}>
          <Text>TESTING</Text>
        </TouchableOpacity>
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

import Colors from '@/utils/Colors';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

function MyHealthScreen(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
    </SafeAreaView>
  );
}

export default MyHealthScreen;

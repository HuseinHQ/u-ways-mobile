import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default function renderMessageImage(props: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={{uri: props.currentMessage.image}}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
});

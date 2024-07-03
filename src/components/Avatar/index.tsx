import React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import Colors from '@/utils/Colors';

function Avatar({
  image,
  icon,
  style,
}: {
  image?: string | number;
  icon?: React.ReactNode;
  style?: ViewStyle;
}): React.JSX.Element {
  return (
    <View style={[styles.avatar, style]}>
      {image && (
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          style={styles.image}
        />
      )}
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Colors.grey.darker,
    borderRadius: 100,
    width: 120,
    height: 120,
    padding: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Avatar;

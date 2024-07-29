import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import edit_artikel from '@/assets/images/edit_artikel.png';
import Colors from '@/utils/Colors';
import Spacer from '@/components/Spacer';
import Fonts from '@/styles/Fonts';

function EditArticle() {
  return (
    <View>
      <Text style={Fonts.subtitle}>Edit Artikel</Text>

      <Spacer height={10} />

      <TouchableOpacity style={styles.container}>
        <Image source={edit_artikel} style={styles.image} />
        <Text style={styles.text}>by U-WAYS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('screen').height / 6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    right: -90,
  },
  text: {
    position: 'absolute',
    color: Colors.white.default,
    left: 10,
    bottom: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
  },
});

export default EditArticle;

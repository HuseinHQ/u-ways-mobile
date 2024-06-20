import React from 'react';
import Spacer from '@/components/Spacer';
import Fonts from '@/styles/Fonts';
import Colors from '@/utils/Colors';
import image1 from '@/assets/images/feature_1.png';
import image2 from '@/assets/images/feature_2.png';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const featureListData = [
  {
    title: 'My Health',
    image: image1,
  },
  {
    title: 'Konseling',
    image: image2,
  },
];

function FeatureList(): React.JSX.Element {
  return (
    <View>
      <Text style={Fonts.subtitle}>Apa yang kamu butuhkan?</Text>
      <Spacer height={10} />
      <View style={styles.featureContainer}>
        {featureListData?.map((item, index) => (
          <TouchableOpacity key={index} style={styles.featureItem}>
            <View style={styles.topContent}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.bottomContent}>
              <Text style={styles.featureItemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featureContainer: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  featureItem: {
    flexBasis: '47%',
    minHeight: 200,
    borderRadius: 10,
    backgroundColor: Colors.white.default,
  },
  topContent: {
    flex: 0.9,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  bottomContent: {
    flex: 0.1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureItemText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: Colors.white.default,
  },
});

export default FeatureList;

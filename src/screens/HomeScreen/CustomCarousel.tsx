import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Hero1 from '@/assets/images/hero_1.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '@/utils/Colors';

const width = Dimensions.get('window').width;
const carouselData = [{}, {}, {}];

function CustomCarousel(): React.JSX.Element {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const height = Dimensions.get('screen').height;

  return (
    <View style={{height: height / 4}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        // autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setCarouselIndex(index)}
        renderItem={({index}) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={Hero1} style={styles.image} />
          </View>
        )}
      />

      <View style={styles.bullet}>
        {carouselData.map((item, index) => (
          <FontAwesome
            name="circle"
            size={10}
            color={
              carouselIndex === index ? Colors.red.default : Colors.red.lighter
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    width: width - 40,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  bullet: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
});

export default CustomCarousel;
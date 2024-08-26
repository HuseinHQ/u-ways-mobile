import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '@/utils/Colors';
import Spacer from '@/components/Spacer';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {getAllCarousels} from '@/store/carouselActions';
import useErrorToast from '@/hooks/useToastError';
import {clearErrors} from '@/store/carouselSlice';

const width = Dimensions.get('window').width;
const imagePrefixUrl = process.env.BACKEND_URL + '/uploads';

function CustomCarousel(): React.JSX.Element {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carousels = useSelector((state: RootState) => state.carousel.data);
  const loading = useSelector((state: RootState) => state.carousel.loading);
  const errors = useSelector((state: RootState) => state.carousel.errors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCarousels());
  }, [dispatch]);

  useErrorToast({
    title: 'Gagal Mengambil Data Carousel',
    errors,
    dispatchFunction: clearErrors,
  });

  return (
    <>
      <View>
        {loading ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size={24} color={Colors.primary} />
          </View>
        ) : (
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlayInterval={5000}
            autoPlay={true}
            data={carousels}
            scrollAnimationDuration={1000}
            onSnapToItem={index => setCarouselIndex(index)}
            renderItem={({index, item}) => (
              <View key={index} style={styles.carouselItem}>
                <Image
                  source={{uri: imagePrefixUrl + item.imageUrl}}
                  style={styles.image}
                />
              </View>
            )}
          />
        )}
      </View>
      <Spacer height={10} />
      <View style={styles.bullet}>
        {carousels.map((_, index) => (
          <FontAwesome
            key={index}
            name="circle"
            size={10}
            color={
              carouselIndex === index ? Colors.red.default : Colors.red.lighter
            }
          />
        ))}
      </View>
    </>
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
  emptyContainer: {
    flex: 1,
    height: width / 2,
    justifyContent: 'center',
  },
});

export default CustomCarousel;

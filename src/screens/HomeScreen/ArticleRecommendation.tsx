import React from 'react';
import Spacer from '@/components/Spacer';
import Fonts from '@/styles/Fonts';
import Colors from '@/utils/Colors';
import article1 from '@/assets/images/article_1.png';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const articleListData = [
  {
    title: 'Self Diagnosis, Sebuah Jembatan Petaka Untuk Diri',
    image: article1,
  },
  {
    title:
      'Apa Itu Toxic Positivity? Bagaimana Dampaknya Bagi Kesehatan Mental?',
    image: article1,
  },
];

function ArticleRecommendation(): React.JSX.Element {
  return (
    <View>
      <View style={styles.subtitleContainer}>
        <Text style={Fonts.subtitle}>Rekomendasi Artikel</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      <Spacer height={10} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.featureContainer}>
        {articleListData?.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity style={styles.featureItem}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.overlay} />
              <Text
                style={[
                  styles.text,
                  index % 2 === 0 ? styles.textVariant1 : styles.textVariant2,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            {index !== articleListData.length - 1 && <Spacer width={10} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeMore: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: Colors.primary,
  },
  featureContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  featureItem: {
    minHeight: 150,
    minWidth: 250,
    borderRadius: 10,
    backgroundColor: 'pink',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.black.halfOpacity,
    borderRadius: 10,
  },
  text: {
    position: 'absolute',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    color: Colors.white.default,
    width: '70%',
  },
  textVariant1: {
    top: 10,
    left: 10,
  },
  textVariant2: {
    bottom: 10,
    left: 10,
  },
});

export default ArticleRecommendation;

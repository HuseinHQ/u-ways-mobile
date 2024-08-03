import React, {useEffect} from 'react';
import Spacer from '@/components/Spacer';
import Fonts from '@/styles/Fonts';
import Colors from '@/utils/Colors';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {getArticles} from '@/store/articleSlice';

function ArticleRecommendation(): React.JSX.Element {
  const navigation = useNavigation();
  const goToArticlesScreen = () => {
    // @ts-ignore
    navigation.navigate('ArticlesScreen');
  };
  const articleLoading = useSelector(
    (state: RootState) => state.article.loading,
  );
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const selectArticles = useSelector((state: RootState) => state.article.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArticles({access_token, limit: 3}));
  }, [access_token, dispatch]);

  return (
    <View>
      <View style={styles.subtitleContainer}>
        <Text style={Fonts.subtitle}>Rekomendasi Artikel</Text>
        <TouchableOpacity onPress={goToArticlesScreen}>
          <Text style={styles.seeMore}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      <Spacer height={10} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.featureContainer}>
        {articleLoading ? (
          <ActivityIndicator />
        ) : (
          selectArticles?.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={() =>
                  // @ts-ignore
                  navigation.navigate('ArticleDetailScreen', {id: item.id})
                }
                style={styles.featureItem}>
                {item?.imageUrl && (
                  <Image source={{uri: item.imageUrl}} style={styles.image} />
                )}
                <View style={styles.overlay} />
                <Text
                  style={[
                    styles.text,
                    index % 2 === 0 ? styles.textVariant1 : styles.textVariant2,
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              {index !== selectArticles.length - 1 && <Spacer width={10} />}
            </React.Fragment>
          ))
        )}
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

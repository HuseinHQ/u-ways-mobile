import Colors from '@/utils/Colors';
import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import GlobalStyles from '@/styles/GlobalStyles';
import Spacer from '@/components/Spacer';
import CustomHeader from '@/components/CustomHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getArticles} from '@/store/articleSlice';
import {RootState, useAppDispatch} from '@/store/store';
import {RootStackParamList} from '@/navigator/StackNavigator';

function ArticlesScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispath = useAppDispatch();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const selectArticles = useSelector((state: RootState) => state.article.data);

  useEffect(() => {
    dispath(getArticles({access_token}));
  }, [access_token, dispath]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <CustomHeader
        title="Artikel"
        description="Temukan bacaan tentang kesehatan mental disini"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={selectArticles}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={styles.ListFooterComponentStyle}
        renderItem={({item, index}) => (
          <React.Fragment key={index}>
            <View>
              <View style={styles.topContent}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ArticleDetailScreen', {id: item.id})
                  }
                  style={styles.button}>
                  <Text style={styles.lihat}>Lihat</Text>
                </TouchableOpacity>
              </View>
              <Spacer height={10} />
              <View style={styles.imageContainer}>
                <Image source={{uri: item.imageUrl}} style={styles.image} />
              </View>
              <View>
                <Text style={styles.abstract}>{item.abstract}</Text>
              </View>
            </View>
            <Spacer height={20} />
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 150,
    backgroundColor: Colors.black.default,
    ...GlobalStyles.shadow,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    maxWidth: '80%',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    ...GlobalStyles.shadow,
  },
  lihat: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: Colors.white.default,
  },
  abstract: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    textAlign: 'justify',
  },
  ListFooterComponentStyle: {
    paddingBottom: 80,
  },
});

export default ArticlesScreen;

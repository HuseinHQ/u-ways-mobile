import Colors from '@/utils/Colors';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import article1 from '@/assets/images/article_1.png';
import GlobalStyles from '@/styles/GlobalStyles';
import Spacer from '@/components/Spacer';
import CustomHeader from '@/components/CustomHeader';

const screenHeight = Dimensions.get('screen').height;
const articleData = [
  {
    title: 'Toxic Positivity',
    abstract:
      'Toxic positivity, tentu kamu sering mendengar kata-kata tersebut, baik melalui media sosial maupun percakapan sehari-hari. Lalu sebenarnya, apa sih toxic positivity itu?',
    image: article1,
  },
  {
    title: 'Toxic Positivity',
    abstract:
      'Toxic positivity, tentu kamu sering mendengar kata-kata tersebut, baik melalui media sosial maupun percakapan sehari-hari. Lalu sebenarnya, apa sih toxic positivity itu?',
    image: article1,
  },
];

function ArticlesScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white.default}
      />
      <FlatList
        ListHeaderComponent={
          <CustomHeader
            title="Artikel"
            description="Temukan bacaan tentang kesehatan mental disini"
          />
        }
        data={articleData}
        renderItem={({item, index}) => (
          <React.Fragment key={index}>
            <View>
              <View style={styles.topContent}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.lihat}>Lihat</Text>
                </TouchableOpacity>
              </View>
              <Spacer height={10} />
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
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
    minHeight: screenHeight,
    paddingBottom: 100,
    backgroundColor: Colors.white.default,
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
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default ArticlesScreen;

import Colors from '@/utils/Colors';
import React from 'react';
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
import article1 from '@/assets/images/article_1.png';
import GlobalStyles from '@/styles/GlobalStyles';
import Spacer from '@/components/Spacer';
import CustomHeader from '@/components/CustomHeader';
import {useNavigation} from '@react-navigation/native';

const articleData = [
  {
    title: 'Toxic Positivity',
    abstract:
      'Toxic positivity, tentu kamu sering mendengar kata-kata tersebut, baik melalui media sosial maupun percakapan sehari-hari. Lalu sebenarnya, apa sih toxic positivity itu?',
    image: article1,
    paragraph:
      'Siapa sih di dunia ini, yang hidupnya tidak pernah memiliki masalah? Tentu, di antara kita pasti pernah memiliki sebuah masalah baik masalah ringan maupun masalah berat. Hal tersebut sangatlah wajar terjadi pada setiap fase kehidupan manusia. Akan tetapi, dikala mendapatkan masalah atau mengalami kegagalan, pasti ada perasaan yang mengganjal di dalam dirimu. Berbagai macam cara kamu lakukan untuk menghilangkan hal tersebut, sebagai sebuah bentuk pertahanan diri yang kamu lakukan. Salah satunya dengan tetap berpikir positif dan bersikap optimis atas apa yang telah terjadi. Sikap optimis dan tetap berpikir positif memang merupakan hal yang baik. Namun, jika kamu memaksakan hal tersebut, maka yang terjadi justru sebaliknya. Alih-alih masalah kamu segera terselesaikan, justru membuat kamu mendapatkan masalah yang baru. Sikap penyangkalan atas emosi negatif yang sedang kamu alami dengan menggunakan sikap positif dikenal dengan istilah toxic positivity.',
  },
  {
    title: 'Toxic Positivity',
    abstract:
      'Toxic positivity, tentu kamu sering mendengar kata-kata tersebut, baik melalui media sosial maupun percakapan sehari-hari. Lalu sebenarnya, apa sih toxic positivity itu?',
    image: article1,
    paragraph:
      'Siapa sih di dunia ini, yang hidupnya tidak pernah memiliki masalah? Tentu, di antara kita pasti pernah memiliki sebuah masalah baik masalah ringan maupun masalah berat. Hal tersebut sangatlah wajar terjadi pada setiap fase kehidupan manusia. Akan tetapi, dikala mendapatkan masalah atau mengalami kegagalan, pasti ada perasaan yang mengganjal di dalam dirimu. Berbagai macam cara kamu lakukan untuk menghilangkan hal tersebut, sebagai sebuah bentuk pertahanan diri yang kamu lakukan. Salah satunya dengan tetap berpikir positif dan bersikap optimis atas apa yang telah terjadi. Sikap optimis dan tetap berpikir positif memang merupakan hal yang baik. Namun, jika kamu memaksakan hal tersebut, maka yang terjadi justru sebaliknya. Alih-alih masalah kamu segera terselesaikan, justru membuat kamu mendapatkan masalah yang baru. Sikap penyangkalan atas emosi negatif yang sedang kamu alami dengan menggunakan sikap positif dikenal dengan istilah toxic positivity.',
  },
  {
    title: 'Toxic Positivity',
    abstract:
      'Toxic positivity, tentu kamu sering mendengar kata-kata tersebut, baik melalui media sosial maupun percakapan sehari-hari. Lalu sebenarnya, apa sih toxic positivity itu?',
    image: article1,
    paragraph:
      'Siapa sih di dunia ini, yang hidupnya tidak pernah memiliki masalah? Tentu, di antara kita pasti pernah memiliki sebuah masalah baik masalah ringan maupun masalah berat. Hal tersebut sangatlah wajar terjadi pada setiap fase kehidupan manusia. Akan tetapi, dikala mendapatkan masalah atau mengalami kegagalan, pasti ada perasaan yang mengganjal di dalam dirimu. Berbagai macam cara kamu lakukan untuk menghilangkan hal tersebut, sebagai sebuah bentuk pertahanan diri yang kamu lakukan. Salah satunya dengan tetap berpikir positif dan bersikap optimis atas apa yang telah terjadi. Sikap optimis dan tetap berpikir positif memang merupakan hal yang baik. Namun, jika kamu memaksakan hal tersebut, maka yang terjadi justru sebaliknya. Alih-alih masalah kamu segera terselesaikan, justru membuat kamu mendapatkan masalah yang baru. Sikap penyangkalan atas emosi negatif yang sedang kamu alami dengan menggunakan sikap positif dikenal dengan istilah toxic positivity.',
  },
];

function ArticlesScreen(): React.JSX.Element {
  const navigation = useNavigation();

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
        data={articleData}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{paddingBottom: 80}}
        renderItem={({item, index}) => (
          <React.Fragment key={index}>
            <View>
              <View style={styles.topContent}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() =>
                    // @ts-ignore
                    navigation.navigate('ArticleDetailScreen', item)
                  }
                  style={styles.button}>
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

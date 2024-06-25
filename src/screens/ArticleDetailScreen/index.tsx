import Colors from '@/utils/Colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Dimensions,
  Image,
  ImageProps,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

type RouteParams = {
  abstract: string;
  image: ImageProps;
  title: string;
  paragraph: string;
};

function ArticleDetailScreen() {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {image, title, paragraph} = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.grey.darkest}
      />
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.overlay} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.white.default} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.strip} />
        <Text style={styles.paragraph}>{paragraph}</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('screen').height,
    backgroundColor: Colors.white.default,
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width * 0.7,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black.halfOpacity,
    position: 'absolute',
  },
  title: {
    position: 'absolute',
    top: '45%',
    color: Colors.white.default,
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: Colors.white.default,
    padding: 20,
    alignItems: 'center',
  },
  strip: {
    width: 40,
    height: 5,
    marginBottom: 10,
    marginTop: -10,
    backgroundColor: Colors.grey.default,
    borderRadius: 50,
  },
  back: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    left: 20,
  },
  paragraph: {
    textAlign: 'justify',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});

export default ArticleDetailScreen;

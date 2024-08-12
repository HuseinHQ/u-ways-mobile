import Colors from '@/utils/Colors';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '@/store/store';
import {
  clearArticleDetail,
  deleteArticle,
  getArticleDetail,
  postArticleImage,
} from '@/store/articleSlice';
import GlobalStyles from '@/styles/GlobalStyles';
import Fonts from '@/styles/Fonts';
import {RootStackParamList} from '@/navigator/StackNavigator';
import {DrawerParamList} from '@/navigator/DrawerNavigator';
import BottomSheetPickImage from '@/components/BottomSheetPickImage';
import {ImageOrVideo} from 'react-native-image-crop-picker';

type RouteParams = {
  id: number;
  editMode?: boolean;
};

function ArticleDetailScreen() {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {id, editMode = false} = route.params;
  const navigation =
    useNavigation<NavigationProp<RootStackParamList & DrawerParamList>>();
  const articleDetail = useSelector((state: RootState) => state.article.detail);
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.article.loading);
  const imageLoading = useSelector(
    (state: RootState) => state.article.imageLoading,
  );
  const refRBSheet = useRef();

  useEffect(() => {
    dispatch(clearArticleDetail());
    dispatch(getArticleDetail({access_token, id}));
  }, [dispatch, access_token, id]);

  const handleEdit = () => {
    navigation.navigate('EditArticleScreen', {id});
  };
  const handleDelete = () => {
    Alert.alert(
      'Apakah Anda yakin ingin menghapusnya?',
      'Aksi ini tidak dapat diulang!',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Iya',
          onPress: async () => {
            dispatch(deleteArticle({access_token, id}));
            navigation.navigate('ManageArticleScreen');
          },
        },
      ],
    );
  };
  const dispatchFunction = (image: ImageOrVideo) =>
    postArticleImage({access_token, id, image});

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.grey.darkest}
      />
      <View style={styles.imageContainer}>
        {articleDetail?.imageUrl && !imageLoading && (
          <Image source={{uri: articleDetail.imageUrl}} style={styles.image} />
        )}
        <View style={styles.overlay} />
        <Text style={styles.title}>{articleDetail?.title}</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.white.default} />
        </TouchableOpacity>

        <View style={styles.author}>
          <Text style={styles.authorText}>Oleh {articleDetail?.author}</Text>
        </View>

        {editMode && (
          <TouchableOpacity
            style={styles.cameraButton}
            // @ts-ignore
            onPress={() => refRBSheet.current.open()}>
            <Ionicons name="camera" size={24} color={Colors.black.default} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mainContainer}>
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                dispatch(clearArticleDetail());
                dispatch(getArticleDetail({access_token, id}));
              }}
            />
          }>
          {/* <View style={styles.strip} /> */}
          <Text style={styles.paragraph}>{articleDetail?.description}</Text>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, GlobalStyles.bgBlue]}
            onPress={handleEdit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size={24} color={Colors.white.default} />
            ) : (
              <Text style={[Fonts.white, Fonts.subtitleMontserrat]}>Edit</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, GlobalStyles.bgPrimary]}
            onPress={handleDelete}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size={24} color={Colors.white.default} />
            ) : (
              <Text style={[Fonts.white, Fonts.subtitleMontserrat]}>Hapus</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetPickImage
        refRBSheet={refRBSheet}
        directFetch={true}
        dispatchFunction={dispatchFunction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    top: '50%',
    color: Colors.white.default,
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    textAlign: 'center',
    transform: [{translateY: -50}],
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: Colors.white.default,
    padding: 20,
  },
  strip: {
    width: 40,
    height: 5,
    marginBottom: 10,
    marginTop: -10,
    backgroundColor: Colors.grey.default,
    borderRadius: 50,
    alignSelf: 'center',
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
  cameraButton: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    borderRadius: 100,
    padding: 5,
    backgroundColor: Colors.grey.darker,
    opacity: 0.7,
  },
  author: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: Colors.black.halfOpacity,
    left: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  authorText: {
    fontFamily: 'Montserrat-Regular',
    color: Colors.white.default,
    fontSize: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  button: {
    flex: 1,
    height: 50,
    ...GlobalStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default ArticleDetailScreen;

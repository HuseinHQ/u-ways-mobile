import CustomHeader from '@/components/CustomHeader';
import InputBox from '@/components/InputBox';
import useErrorToast from '@/hooks/useToastError';
import {DrawerParamList} from '@/navigator/DrawerNavigator';
import {clearErrors, editArticle, getArticleDetail} from '@/store/articleSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';

type RouteParams = {
  id: number;
};

type ArticleData = {
  title: string;
  abstract: string;
  description: string;
  author: string;
};

function EditArticleScreen(): React.JSX.Element {
  const [articleData, setArticleData] = useState<ArticleData>({
    title: '',
    abstract: '',
    description: '',
    author: '',
  });
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {id} = route.params;
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const articleDetail = useSelector((state: RootState) => state.article.detail);
  const loading = useSelector((state: RootState) => state.article.loading);
  const errors = useSelector((state: RootState) => state.article.errors);
  useErrorToast({
    title: 'Gagal',
    errors,
    dispatchFunction: clearErrors,
  });

  const submitHandler = () => {
    dispatch(
      editArticle({
        access_token,
        id,
        articleData,
        successCB: () => navigation.goBack(),
      }),
    );
  };

  const setValue = (name: keyof ArticleData) => (value: string) => {
    setArticleData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getArticleDetail({access_token, id}));
  }, [access_token, id, dispatch]);

  useEffect(() => {
    if (articleDetail) {
      setArticleData({
        title: articleDetail.title,
        author: articleDetail.author,
        abstract: articleDetail.abstract,
        description: articleDetail.description,
      });
    }
  }, [articleDetail]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Edit Artikel"
        titleColor={Colors.black.default}
        titleFontSize={20}
      />

      <InputBox
        value={articleData.title}
        label="Judul"
        setValue={setValue('title')}
      />
      <InputBox
        value={articleData.author}
        label="Penulis"
        setValue={setValue('author')}
      />
      <InputBox
        value={articleData.abstract}
        label="Abstrak"
        setValue={setValue('abstract')}
      />
      <InputBox
        value={articleData.description}
        label="Isi Artikel"
        setValue={setValue('description')}
        multiline={true}
      />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flex: 1}} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, GlobalStyles.bgBlue]}
          onPress={submitHandler}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={24} color={Colors.white.default} />
          ) : (
            <Text style={[Fonts.white, Fonts.subtitleMontserrat]}>Simpan</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, GlobalStyles.bgPrimary]}
          onPress={() => navigation.goBack()}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={24} color={Colors.white.default} />
          ) : (
            <Text style={[Fonts.white, Fonts.subtitleMontserrat]}>Batal</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
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

export default EditArticleScreen;

import CustomHeader from '@/components/CustomHeader';
import ImageInput from '@/components/ImageInput';
import InputBox from '@/components/InputBox';
import useErrorToast from '@/hooks/useToastError';
import {clearErrors, postArticle} from '@/store/articleSlice';
import {RootState, useAppDispatch} from '@/store/store';
import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

type ArticleData = {
  title: string;
  abstract: string;
  description: string;
  author: string;
};

function AddQuizScreen(): React.JSX.Element {
  const [articleData, setArticleData] = useState<ArticleData>({
    title: '',
    abstract: '',
    description: '',
    author: '',
  });
  const [image, setImage] = useState<ImageOrVideo | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const loading = useSelector((state: RootState) => state.article.loading);
  const errors = useSelector((state: RootState) => state.article.errors);
  useErrorToast({
    title: 'Gagal',
    errors,
    dispatchFunction: clearErrors,
  });

  const submitHandler = () => {
    dispatch(
      postArticle({
        access_token,
        articleData,
        image,
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.white.default}
        barStyle="dark-content"
      />

      <CustomHeader
        title="Tambah Artikel"
        titleFontSize={20}
        titleColor={Colors.black.default}
      />

      <ScrollView style={styles.scrollView}>
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
        <ImageInput image={image} setImage={setImage} />
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={submitHandler}>
        {loading ? (
          <ActivityIndicator size={20} color={Colors.white.default} />
        ) : (
          <Text style={[Fonts.subtitleMontserrat, Fonts.white]}>Tambahkan</Text>
        )}
      </TouchableOpacity>
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
  scrollView: {flex: 1},
  button: {
    backgroundColor: Colors.green.default,
    height: 50,
    ...GlobalStyles.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
});

export default AddQuizScreen;

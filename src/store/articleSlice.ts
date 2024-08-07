import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/helpers/builderHandler';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

type Article = {
  id: number | null;
  title: string;
  abstract: string;
  description: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type Errors = {
  [key: string]: any;
};

type ArticleState = {
  data: Article[];
  detail: Article;
  loading: boolean;
  imageLoading: boolean;
  pagination: Pagination | {};
  errors: Errors | null;
};

const baseUrl = process.env.BACKEND_URL;

export const getArticles = createAsyncThunk(
  'articles',
  async (
    props: {
      access_token: string;
      limit?: number;
      page?: number;
      search?: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const {access_token, limit, page, search} = props;

      const params = new URLSearchParams();
      if (search) {
        params.append('search', search.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (page) {
        params.append('page', page.toString());
      }

      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/articles?${params.toString()}`,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

      return data;
    } catch (err) {
      return rejectWithValue((err as any)?.reponse?.data?.errors);
    }
  },
);

export const getArticleDetail = createAsyncThunk(
  'articles/detail',
  async (
    props: {
      access_token: string;
      id: number;
    },
    {rejectWithValue},
  ) => {
    try {
      const {access_token, id} = props;

      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/articles/${id}`,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.reponse?.data?.errors);
    }
  },
);

export const postArticle = createAsyncThunk(
  'articles/post',
  async (
    {
      access_token,
      articleData,
      image,
      successCB,
    }: {
      access_token: string;
      articleData: {
        title: string;
        author: string;
        abstract: string;
        description: string;
      };
      image: ImageOrVideo | null;
      successCB: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data: newArticle} = await axios({
        method: 'POST',
        url: baseUrl + '/articles',
        headers: {'X-Access-Token': access_token},
        data: articleData,
        timeout: 5000,
      });

      if (image) {
        const {id} = newArticle.data;
        const imageData = new FormData();
        imageData.append('image', {
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop(),
        });

        await axios({
          method: 'POST',
          url: baseUrl + '/articles/' + id + '/image',
          headers: {
            'X-Access-Token': access_token,
            'Content-Type': 'multipart/form-data',
          },
          data: imageData,
          timeout: 5000,
        });
      }

      dispatch(getArticles({access_token}));
      Toast.show({text1: 'Berhasil', text2: newArticle.data.message});
      successCB();
      return true;
    } catch (err) {
      console.log(JSON.stringify(err));
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const bulkDeleteArticles = createAsyncThunk(
  'articles/bulkdDelte',
  async (
    {
      access_token,
      value,
      callback = () => {},
    }: {
      access_token: string;
      value: number[];
      callback?: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'DELETE',
        url: baseUrl + '/articles',
        headers: {'X-Access-Token': access_token},
        data: value,
        timeout: 5000,
      });

      dispatch(getArticles({access_token}));
      Toast.show({
        text1: 'Berhasil',
        text2: data.data.message,
      });
      callback();
      return true;
    } catch (err) {
      callback();
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const editArticle = createAsyncThunk(
  'articles/edit',
  async (
    {
      access_token,
      id,
      articleData,
      successCB = () => {},
    }: {
      access_token: string;
      id: number;
      articleData: {
        title: string;
        author: string;
        abstract: string;
        description: string;
      };
      successCB?: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        url: baseUrl + '/articles/' + id,
        headers: {'X-Access-Token': access_token},
        data: articleData,
      });

      dispatch(getArticles({access_token}));
      dispatch(getArticleDetail({access_token, id}));
      Toast.show({
        text1: 'Berhasil',
        text2: data.data.message,
      });

      successCB();
      return true;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const deleteArticle = createAsyncThunk(
  'articles/delete',
  async (
    {
      access_token,
      id,
      successCB = () => {},
    }: {access_token: string; id: number; successCB?: () => void},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const {data} = await axios({
        method: 'DELETE',
        url: baseUrl + '/articles/' + id,
        headers: {'X-Access-Token': access_token},
        timeout: 5000,
      });

      dispatch(getArticles({access_token}));
      successCB();
      Toast.show({text1: 'Berhasil', text2: data.data.message});
      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

export const postArticleImage = createAsyncThunk(
  'articles/post/image',
  async (
    {
      access_token,
      image,
      id,
      successCB = () => {},
    }: {
      access_token: string;
      image: ImageOrVideo | null;
      id: number;
      successCB?: () => void;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const imageData = new FormData();
      if (image) {
        imageData.append('image', {
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop(),
        });
      }

      const {data} = await axios({
        method: 'POST',
        url: baseUrl + '/articles/' + id + '/image',
        headers: {
          'X-Access-Token': access_token,
          'Content-Type': 'multipart/form-data',
        },
        data: imageData,
        timeout: 5000,
      });

      dispatch(getArticles({access_token}));
      dispatch(getArticleDetail({access_token, id}));
      Toast.show({text1: 'Berhasil', text2: data});
      successCB();
      return true;
    } catch (err) {
      console.log(JSON.stringify(err));
      return rejectWithValue((err as any)?.response?.data?.errors);
    }
  },
);

const initialState: ArticleState = {
  data: [],
  detail: {
    id: null,
    title: '',
    abstract: '',
    description: '',
    author: '',
    imageUrl: '',
    createdAt: '',
    updatedAt: '',
  },
  pagination: {},
  loading: false,
  imageLoading: false,
  errors: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    clearErrors: state => {
      state.errors = null;
    },
    clearArticleDetail: state => {
      state.detail = initialState.detail;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getArticles.pending, state => {
        state.loading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as Errors;
      })
      .addCase(getArticleDetail.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getArticleDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.loading = false;
      })
      .addCase(getArticleDetail.rejected, (state, action) => {
        state.errors = action.payload as Errors;
      })
      .addCase(postArticle.pending, handlePending)
      .addCase(postArticle.fulfilled, handleFulfilled)
      .addCase(postArticle.rejected, handleRejected)
      .addCase(bulkDeleteArticles.pending, handlePending)
      .addCase(bulkDeleteArticles.fulfilled, handleFulfilled)
      .addCase(bulkDeleteArticles.rejected, handleRejected)
      .addCase(editArticle.pending, handlePending)
      .addCase(editArticle.fulfilled, handleFulfilled)
      .addCase(editArticle.rejected, handleRejected)
      .addCase(deleteArticle.pending, handlePending)
      .addCase(deleteArticle.fulfilled, handleFulfilled)
      .addCase(deleteArticle.rejected, handleRejected)
      .addCase(postArticleImage.pending, state => {
        state.imageLoading = true;
      })
      .addCase(postArticleImage.fulfilled, state => {
        state.imageLoading = false;
      })
      .addCase(postArticleImage.rejected, (state, action) => {
        state.imageLoading = false;
        state.errors = action.payload as any;
      });
  },
});

export const {clearErrors, clearArticleDetail} = articleSlice.actions;
export default articleSlice.reducer;

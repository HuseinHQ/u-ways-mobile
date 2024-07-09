import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

type Article = {
  id?: number | null;
  title?: string;
  abstract?: string;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
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
    },
    {rejectWithValue},
  ) => {
    try {
      const {access_token, limit, page} = props;

      const params = new URLSearchParams();
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (page) {
        params.append('page', page.toString());
      }

      const {data} = await axios({
        method: 'GET',
        url: `${baseUrl}/articles?${params.toString()}`,
        headers: {access_token},
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
        headers: {access_token},
        timeout: 5000,
      });

      return data.data;
    } catch (err) {
      return rejectWithValue((err as any)?.reponse?.data?.errors);
    }
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    data: [],
    detail: {
      id: null,
      title: '',
      abstract: '',
      description: '',
      imageUrl: '',
      createdAt: '',
      updatedAt: '',
    },
    pagination: {},
    loading: false,
    errors: null,
  } as ArticleState,
  reducers: {},
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
      });
  },
});

export default articleSlice.reducer;

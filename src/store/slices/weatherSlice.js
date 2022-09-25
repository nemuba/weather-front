import api from '@/services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  tokens: [],
  loading: false,
}

export const fetchWeathers = createAsyncThunk('weathers/fetchWeathers', async () => {
  const response = await api.get('/weathers')

  return response.data
});

export const currentWeather = createAsyncThunk('weathers/currentWeather', async (location) => {
  const token = window.crypto.getRandomValues(new Uint32Array(1))[0];

  const response = await api.post('weather/current', { weather: { location, token }})

  return response.data
});

export const currentResultWeather = createAsyncThunk('weathers/currentResultWeather', async (token) => {
  const response = await api.get(`weather/current/result?token=${token}`)

  return response.data
});

export const removeWeather = createAsyncThunk('weathers/removeWeather', async (id) => {
  await api.delete(`weathers/${id}`)

  return id
});

export const weatherSlice = createSlice({
  name: 'weathers',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWeathers.fulfilled]: (state, { payload }) => {
      state.data = payload
      state.loading = false
    },
    [fetchWeathers.pending]: (state) => {
      state.loading = true
    },
    [fetchWeathers.rejected]: (state) => {
      state.loading = false
    },
    [currentWeather.fulfilled]: (state, { payload }) => {
      const { token } = payload
      state.tokens.push(token)
    },
    [currentWeather.pending]: (state) => {
      state.loading = true
    },
    [currentWeather.rejected]: (state) => {
      state.loading = false
    },
    [currentResultWeather.fulfilled]: (state, { payload }) =>{
      state.data = [...state.data.filter(t => t.token !== payload.token), payload]
      state.loading = false
      state.tokens = state.tokens.filter(t => t !== payload.token)
    },
    [currentResultWeather.pending]: (state) => {
      state.loading = true
    },
    [currentResultWeather.rejected]: (state) => {
      state.loading = false
    },
    [removeWeather.fulfilled]: (state, { payload }) => {
      state.data = [...state.data.filter(item => item?.id !== payload) ]
      state.loading = false
    },
    [removeWeather.pending]: (state) => {
      state.loading = false
    },
    [removeWeather.rejected]: (state) => {
      state.loading = false
    },
  },
});

export const weatherReducer = weatherSlice.reducer;

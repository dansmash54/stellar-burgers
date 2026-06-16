import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrdersHistoryState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: IOrdersHistoryState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchOrdersHistory = createAsyncThunk(
  'ordersHistory/fetch',
  async () => await getOrdersApi()
);

const ordersHistorySlice = createSlice({
  name: 'ordersHistory',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getOrdersLoadingStatus: (state) => state.loading,
    getOrdersErrorStatus: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      });
  }
});

export const { getOrders, getOrdersLoadingStatus, getOrdersErrorStatus } =
  ordersHistorySlice.selectors;

export default ordersHistorySlice.reducer;

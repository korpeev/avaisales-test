import { State, Ticket } from './../../types/index';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiServices from '../../services/api-services';

const initialState: State<Ticket> = {
  data: [],
  isLoading: false,
  error: null,
};
export const fetchTickets = createAsyncThunk(
  'ticket/fetch-tickets',
  async () => {
    try {
      const response = await apiServices.fetchData();
      return response.data;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(fetchTickets.rejected, (state, { payload }) => {
        console.log(payload);
      });
  },
});

export default ticketSlice.reducer;

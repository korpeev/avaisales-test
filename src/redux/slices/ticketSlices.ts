import { State, Ticket } from './../../types/index';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiServices from '../../services/api-services';
import { v4 as uuid } from 'uuid';
const initialState: State<Ticket> = {
  tickets: [],
  isLoading: false,
  error: null,
};
export const fetchTickets = createAsyncThunk(
  'ticket/fetch-tickets',

  async (searchId: string, { rejectWithValue }) => {
    try {
      const response = await apiServices.fetchData(searchId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    sortByPrice(state) {
      const sortedTickets = state.tickets.sort((a, b) => b.price - a.price);
      state.tickets = sortedTickets;
    },
    sortByFaster(state) {
      const sortedTickets = state.tickets.sort((a, b) => {
        const Asegment = Math.min(
          ...a.segments.map((segment) => segment.duration)
        );
        const Bsegement = Math.max(
          ...b.segments.map((segment) => segment.duration)
        );
        return Asegment - Bsegement;
      });
      state.tickets = sortedTickets;
    },
    filterByTransfer(state, { payload }: PayloadAction<number | null>) {
      const newTickets = state.tickets.filter(({ segments }) =>
        segments.every(({ stops }) => stops.length === payload)
      );
      console.log(newTickets);
      state.tickets = newTickets;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.tickets = payload.map((ticket) => ({ ...ticket, id: uuid() }));
      })
      .addCase(fetchTickets.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as Error;
      });
  },
});
export const { sortByPrice, sortByFaster, filterByTransfer } =
  ticketSlice.actions;
export default ticketSlice.reducer;

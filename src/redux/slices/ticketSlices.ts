import { State, Ticket } from './../../types/index';
import { createSlice } from '@reduxjs/toolkit';

const initialState: State<Ticket> = {
  data: [],
  isLoading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
});

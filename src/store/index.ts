import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from '../redux/slices/ticketSlices';

export const store = configureStore({
  reducer: ticketReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

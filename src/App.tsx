import React, { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';
import { useAppDispatch, useAppSelector } from './hooks/useDispatchAndSelector';
import { fetchTickets } from './redux/slices/ticketSlices';
import apiServices from './services/api-services';
import './App.css';
const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state);
  const [searchId, setSearchId] = useState('');
  useEffect(() => {
    apiServices.fetchSearchId().then((data) => setSearchId(data.searchId));
  }, []);
  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId));
    }
  }, [searchId]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {error?.message.length ? (
        <div className='error'>
          <h1>{error.message}</h1>
        </div>
      ) : (
        <Layout />
      )}
    </div>
  );
};

export default App;

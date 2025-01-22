import {configureStore} from '@reduxjs/toolkit';
import bookListReducer from '../BookSlice';

const Store = configureStore({
  reducer: {
    booksList: bookListReducer
  }
})

export default Store;
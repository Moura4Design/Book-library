import {configureStore} from '@reduxjs/toolkit';
import bookListReducer from './bookListSlice';

const Store = configureStore({
  reducer: {
    books: bookListReducer
  }
})

export default Store;
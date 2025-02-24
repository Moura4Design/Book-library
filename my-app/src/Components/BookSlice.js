import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  loading: true,
}

const bookSlice = createSlice({
  name: 'booksList', 
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
      state.loading = false;
    },
    toggleChecked: (state, action) => {
      const item = state.books.find((item) => item.id === action.payload);
      if (item) {
        item.checked = !item.checked;
      }
    },
    addItem: (state, action) => {
      const newId = state.books.length > 0 ? Math.max(...state.books.map(item => item.id)) + 1 : 1;
      const { title, author } = action.payload;
      state.books.push({id: newId, title, author})
    },
    removeItem: (state, action) => {
      state.books = state.books.filter(item => item.id !== action.payload)
    },
    editItem: (state, action) => {
      const { id, title, author } = action.payload;
      state.books = state.books.map((book) =>
        book.id === id ? { ...book, title, author } : book
      );
    }
  }
})

export const {setBooks, toggleChecked, addItem, removeItem, editItem} = bookSlice.actions;

export default bookSlice.reducer;
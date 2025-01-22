import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setBooks, toggleChecked, addItem, removeItem, editItem } from './BookSlice';

const BookList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookId, setBookId] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const {books, loading} = useSelector((state => state.booksList));

  const handleLogout = () => {
    navigate('/');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await fetch('/books/books.json');
          if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          dispatch(setBooks(data));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setBooks([])); // Handle error by setting an empty list
      }
    }

    fetchData()
  },[dispatch])

  const handleAdd = () => {
    if (title.trim() && author.trim()) {
      dispatch(addItem({title, author}));
      setTitle('');
      setAuthor('');
    } else {
      setErrorMessage(true)
    }
  }

  const handleSave = () => {
    if (title.trim() && author.trim()) {
      dispatch(editItem({ id: bookId, title, author })); // Dispatch edit action
      setBookId(null); // Clear editing state
      setTitle(""); // Reset title input
      setAuthor(""); // Reset author input
    } else {
      setErrorMessage(true); // Show error if inputs are empty
    }
  }

  const handleEditItem = (book) => {
    setBookId(book.id);
    setTitle(book.title)
    setAuthor(book.author)
  }


  if (loading) return <div>Loading...</div>;

  return(
    <React.Fragment>
      <button className='btn btn-secondary mt-5 mb-5' onClick={handleLogout}>Logout</button>
      <h3>List of the books</h3>
      <div className="d-flex justify-content-center mb-4">
        <input className="me-2" placeholder="Add title of the book" value={title} onChange={(e) => {setTitle(e.target.value)}} />
        <input className="me-2" placeholder="Add author of the book" value={author} onChange={(e) => {setAuthor(e.target.value)}} />
        <button className='btn btn-info' onClick={bookId ? handleSave : handleAdd}>{bookId ? 'Save book' : 'Add book'}</button>
      </div>
      {errorMessage ? <p className="text-danger">Please add title and author</p> : null}
      <div className="d-flex justify-content-center">
        <ul className="list-unstyled text-start">
          {console.log('books ==>', books)}
          {books.map((book, index) => {
            return (
              <li key={index} className={`${book.checked ? 'text-danger' : null} p-2`}>
                <input type="checkbox" checked={book.checked} className="me-2" onChange={() => dispatch(toggleChecked(book.id))} aria-label={`Mark ${book.title} as completed`} />
                <span className="fw-bold">"{book.title}" </span>- <span className={`${book.checked ? 'text-danger' : 'text-secondary'}`}>author: </span>{book.author}
                {book.checked ? null :
                  <React.Fragment>
                    <button className={'btn btn-sm ms-2 bi bi-pencil'} onClick={() => handleEditItem(book)} />
                    <button className={'btn btn-sm ms-2 bi bi-trash'} onClick={() => dispatch(removeItem(book.id))} />
                  </React.Fragment>
                }
            
              </li>
            )
          })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default BookList;
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');

  const handleLogout = () => {
    navigate('/');
  }

  return(
    <React.Fragment>
      <button className='btn btn-secondary mt-5 mb-5' onClick={handleLogout}>Logout</button>
      <h3>List of the books</h3>
      <div className="d-flex justify-content-center mb-4">
        <input className="me-2" placeholder="Add title of the book" value={bookTitle} onChange={(e) => {setBookTitle(e.target.value)}} />
        <input className="me-2" placeholder="Add author of the book" />
        <button className='btn btn-info'>Add new book</button>
      </div>
    </React.Fragment>
  )
}

export default BookList;
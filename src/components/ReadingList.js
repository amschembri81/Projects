import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styling/ReadingList.css';

function ReadingList() {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookStatus, setNewBookStatus] = useState('to-read');

  // Handles adding a new book to the reading list
  const handleAddBook = () => {
    if (newBookTitle.trim()) {
      setBooks([
        ...books,
        { id: uuidv4(), title: newBookTitle, status: newBookStatus },
      ]);
      // Resets input fields after adding the book
      setNewBookTitle('');
      setNewBookStatus('to-read');
    }
  };

  // Filters books by their status
  const filterBooksByStatus = (status) => {
    return books.filter((book) => book.status === status);
  };

  return (
    <div className="reading-list-container">
      <h2>Reading List</h2>
      <div className="add-book">
        <input
          type="text"
          placeholder="Enter book title"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <select
          value={newBookStatus}
          onChange={(e) => setNewBookStatus(e.target.value)}
        >
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <div className="book-sections">
        <div className="book-section">
          <h3>To Read</h3>
          <ul>
            {filterBooksByStatus('to-read').map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>

        <div className="book-section">
          <h3>Reading</h3>
          <ul>
            {filterBooksByStatus('reading').map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>

        <div className="book-section">
          <h3>Finished</h3>
          <ul>
            {filterBooksByStatus('completed').map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReadingList;
import React from "react";
import { Link } from "react-router-dom";

import Book from "./Book";

const LibraryPage = (props) => {
  const { bookList, onUpdateShelf } = props;

  const categorizeBooks = (category) => {
    const booksWithCategory = bookList.map((book) => {
      if (book.shelf === category) {
        return (
          <Book key={book.title} book={book} onUpdateShelf={onUpdateShelf} />
        );
      }
    });
    if (booksWithCategory.every((elm) => elm === undefined)) {
      return [];
    }
    return booksWithCategory;
  };

  // Search for currently reading books.
  const lstCurrentlyBooks = categorizeBooks("currentlyReading");

  // Search for read books.
  const lstReadBooks = categorizeBooks("read");

  // search for want-to-read books.
  const lstWantToReadBooks = categorizeBooks("wantToRead");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              {lstCurrentlyBooks.length > 0 && (
                <ol className="books-grid">{lstCurrentlyBooks}</ol>
              )}
              {lstCurrentlyBooks.length === 0 && (
                <div>No books on the currently bookshelf.</div>
              )}
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              {lstReadBooks.length > 0 && (
                <ol className="books-grid">{lstReadBooks}</ol>
              )}
              {lstReadBooks.length === 0 && (
                <div>No books on the read bookshelf.</div>
              )}
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <div className="bookshelf-books">
              {lstWantToReadBooks.length > 0 && (
                <ol className="books-grid">{lstWantToReadBooks}</ol>
              )}
              {lstWantToReadBooks.length === 0 && (
                <div>No books on the want to read bookshelf.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default LibraryPage;

import React from "react";

import ShelfClassification from "./ShelfClassification";

const Book = (props) => {
  const { book, onUpdateShelf } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          {book.imageLinks !== undefined ? (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`,
              }}
            ></div>
          ) : (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: "",
              }}
            ></div>
          )}
          <ShelfClassification book={book} onUpdateShelf={onUpdateShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors !== undefined &&
            book.authors.map((author, idx) =>
              book.authors.length - 1 !== idx ? author + ", " : author
            )}
        </div>
      </div>
    </li>
  );
};

export default Book;

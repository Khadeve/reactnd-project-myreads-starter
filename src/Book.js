import React from "react";

import ShelfType from "./ShelfType";

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
                width: 130,
                height: 195,
                backgroundImage: `url(${book.imageLinks.thumbnail})`,
              }}
            ></div>
          ) : (
            <div
              className="book-cover"
              style={{
                width: 130,
                height: 195,
                backgroundImage: '',
              }}
            ></div>
          )}
          <ShelfType book={book} onUpdateShelf={onUpdateShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors !== undefined &&
            book.authors.map((author, currIndex) =>
              currIndex !== book.authors.length - 1 ? author + ", " : author
            )}
        </div>
      </div>
    </li>
  );
};

export default Book;

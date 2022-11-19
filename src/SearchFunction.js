import React from "react";
import { Link } from "react-router-dom";

import _debounce from "lodash/debounce";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchFunction extends React.Component {
  state = {
    strQuery: "",
    booksFound: [],
  };

  render() {
    const { bookList, onUpdateShelf } = this.props;

    const updateQuery = (newStrQuery) => {
      this.setState(() => ({
        strQuery: newStrQuery,
      }));
    };

    const updateBookList = (result) => {
      this.setState(() => ({
        booksFound: result,
      }));
    };

    const handleSearch = _debounce((event) => {
      let newStrQuery = event.target.value.trim();
      updateQuery(newStrQuery);
      BooksAPI.search(newStrQuery)
        .then((result) => {
          if (result && result.length > 0) {
            updateBookList(result);
          } else {
            updateBookList([]);
          }
        }, 150)
        .catch((err) => {
          console.err("Something's wrong happened in server: " + err);
          updateBookList([]);
        });
    });

    // Getting book's shelf from book list.
    let searchResult = [];
    if (this.state.booksFound.length > 0) {
      searchResult = this.state.booksFound.map((bookFound) => {
        const bookInList = bookList.find((book) => bookFound.id === book.id);
        bookFound.shelf = bookInList ? bookInList.shelf : "none";
        return (
          <Book
            key={bookFound.id}
            book={bookFound}
            onUpdateShelf={onUpdateShelf}
          />
        );
      });
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by book's title or author..."
              onInput={handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult.length > 0 && searchResult}
          </ol>

          {this.state.booksFound.length === 0 && this.state.strQuery !== "" && (
            <div>Not found</div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchFunction;

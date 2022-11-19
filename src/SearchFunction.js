import React from "react";
import { Link } from "react-router-dom";

import _debounce from "lodash/debounce";
import * as BooksAPI from "../BooksAPI";
import Book from "../Book";

class SearchFunction extends React.Component {
  state = {
    query: "",
    searchBooks: [],
  };

  render() {
    const { onUpdateShelf, books } = this.props;

    const updateResultSearch = (result) => {
      this.setState(() => ({
        searchBooks: result,
      }));
    };

    const updateQuery = (str) => {
      this.setState(() => ({
        query: str,
      }));
    };

    // Funtion handle search book
    const handleSearch = _debounce(function (event) {
      const strQuery = event.target.value.trim();
      updateQuery(strQuery);
      if (strQuery) {
        BooksAPI.search(strQuery).then((searchBooks) => {
          updateResultSearch(searchBooks);
        });
      } else {
        updateResultSearch([]);
      }
    }, 200);

    // Return list search books result
    let lstSearchResults = [];
    if (this.state.searchBooks.error !== "empty query") {
      lstSearchResults = this.state.searchBooks.map((book) => {
        const foundBook = books.find((bookSearch) => book.id === bookSearch.id);
        if (foundBook) {
          book.shelf = foundBook.shelf;
        } else {
          book.shelf = "none";
        }
        return <Book key={book.id} book={book} onUpdateShelf={onUpdateShelf} />;
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
              placeholder="Search by title or author"
              onInput={handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {lstSearchResults.length > 0 && lstSearchResults}
          </ol>

          {/* Show Not Found */}
          {this.state.searchBooks.error === "empty query" &&
            this.state.query !== "" && <div>Not found</div>}
        </div>
      </div>
    );
  }
}

export default SearchFunction;

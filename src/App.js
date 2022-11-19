import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import * as BooksAPI from "./BooksAPI.js";

import LibraryPage from "./LibraryPage";
import SearchFunction from "./SearchFunction";
import NoPageFound from "./NoPageFound";

class BooksApp extends React.Component {
  state = {
    bookList: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      this.setState(() => ({
        bookList: response,
      }));
    });
  }

  render() {
    // On update shelf event
    const onUpdateShelf = (book, shelfType) => {
      BooksAPI.update(book, shelfType).then(() => {
        book.shelf = shelfType;
        this.setState((currentState) => ({
          bookList: currentState.bookList
            .filter((elm) => {
              return elm.id !== book.id;
            })
            .concat([book]),
        }));
      });
    };

    return (
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LibraryPage
              bookList={this.state.bookList}
              onUpdateShelf={onUpdateShelf}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchFunction
              bookList={this.state.bookList}
              onUpdateShelf={onUpdateShelf}
            />
          }
        />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    );
  }
}

export default BooksApp;

import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import EditBookmark from "./EditBookmark/EditBookmark";
import Nav from "./Nav/Nav";
import { headers, ApiEndpoint } from "./headers";
import "./App.css";
import BookmarksContext from "./BookmarksContext";

class App extends Component {
  state = {
    bookmarks: [],
    error: null
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null
    });
  };

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  };

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(
      bm => bm.id !== bookmarkId
    );
    this.setState({
      bookmarks: newBookmarks
    });
  };

  componentDidMount() {
    console.log(ApiEndpoint);
    fetch(ApiEndpoint, {
      method: "GET",
      headers: headers
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }));
  }

  updateBookmark = updatedBookmark => {
    this.setState({
      bookmarks: this.state.bookmarks.map(bm =>
        bm.id !== updatedBookmark.id ? bm : updatedBookmark
      )
    });
  };

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark
    };
    return (
      <main className="App">
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className="content" aria-live="polite">
            <Route path="/add-bookmark" component={AddBookmark} />
            <Route exact path="/" component={BookmarkList} />
            <Route path="/edit/:bookmarkId" component={EditBookmark} />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;

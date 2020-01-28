import React, { Component } from "react";
import BookmarksContext from "../BookmarksContext";
import BookmarksForm from "../BookmarksForm/BookmarksForm";
import { headers, ApiEndpoint } from "../headers";

export default class EditBookmark extends Component {
  static contextType = BookmarksContext;
  state = {
    title: null,
    url: null,
    description: null,
    rating: null,
    error: null
  };

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId;
    fetch(ApiEndpoint + `/${bookmarkId}`, {
      method: "GET",
      headers: headers
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          id: data.id,
          title: data.title,
          url: data.url,
          description: data.description,
          rating: data.rating
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  handleSubmit = (bookmark, cb) => {
    this.setState({ error: null });
    const { bookmarkId } = this.props.match.params;
    fetch(ApiEndpoint + `/${bookmarkId}`, {
      method: "PATCH",
      body: JSON.stringify(bookmark),
      headers: headers
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
      })
      .then(() => {
        cb(cb);
        this.context.updateBookmark(bookmark);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { id, title, url, description, rating, error } = this.state;
    const bookmark = { id, title, url, description, rating };
    return (
      <section className="EditBookmarkForm">
        <h2>Edit Bookmark</h2>
        {id && (
          <BookmarksForm
            onSubmit={this.handleSubmit}
            onClickCancel={this.handleClickCancel}
            error={error}
            bookmark={bookmark}
          />
        )}
      </section>
    );
  }
}

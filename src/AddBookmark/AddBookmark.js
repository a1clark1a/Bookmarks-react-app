import React, { Component } from "react";
import BookmarksContext from "../BookmarksContext";
import { headers, ApiEndpoint } from "../headers";
import PropTypes from "prop-types";
import BookmarksForm from "../BookmarksForm/BookmarksForm";

class AddBookmark extends Component {
  static contextType = BookmarksContext;
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };
  state = {
    error: null
  };

  handleSubmit = (bookmark, cb) => {
    console.log(ApiEndpoint);
    this.setState({ error: null });
    fetch(ApiEndpoint, {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: headers
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        cb(data);
        this.context.addBookmark(data);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { error } = this.state;
    return (
      <section className="AddBookmark">
        <h2>Create a bookmark</h2>
        <BookmarksForm
          error={error}
          onSubmit={this.handleSubmit}
          onClickCancel={this.handleClickCancel}
        />
      </section>
    );
  }
}

export default AddBookmark;

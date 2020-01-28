import React, { Component } from "react";
import Proptypes from "prop-types";
import "./BookmarksForm.css";

const Required = () => <span className="EditBookmark__required">*</span>;

export default class BookmarksForm extends Component {
  static propTypes = {
    onSubmit: Proptypes.func,
    onClickCancel: Proptypes.func,
    bookmark: Proptypes.shape({
      id: Proptypes.oneOfType([Proptypes.number, Proptypes.string]),
      title: Proptypes.string,
      url: Proptypes.string,
      description: Proptypes.string,
      rating: Proptypes.oneOf([1, 2, 3, 4, 5])
    })
  };

  static defaultProps = {
    onSubmit: () => {},
    onClickCancel: () => {},
    bookmark: {}
  };

  state = {
    id: this.props.bookmark.id || undefined,
    title: this.props.bookmark.title || "",
    url: this.props.bookmark.url || "",
    description: this.props.bookmark.description || "",
    rating: this.props.bookmark.rating || 1
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, title, url, description, rating } = this.state;
    this.props.onSubmit(
      {
        id,
        title,
        url,
        description,
        rating: Number(rating)
      },
      this.updateBookmark
    );
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleChangeUrl = e => {
    this.setState({ url: e.target.value });
  };

  handleChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  handleChangeRating = e => {
    this.setState({ rating: e.target.value });
  };

  updateBookmark = newInputs => {
    this.setState({
      id: newInputs.id || undefined,
      title: newInputs.title || "",
      url: newInputs.url || "",
      description: newInputs.description || "",
      rating: newInputs.rating || 1
    });
  };

  render() {
    const { error, onClickCancel } = this.props;
    const { id, title, url, description, rating } = this.state;
    return (
      <form className="EditBookmark_Form" onSubmit={this.handleSubmit}>
        <div className="EditBookmark_error" role="alert">
          {error && <p>{error.message}</p>}
        </div>
        {id && <input type="hidden" name="id" value={id} />}
        <div>
          <label htmlFor="title">
            Title <Required />
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Great website!"
            value={title}
            onChange={this.handleChangeTitle}
            required
          />
        </div>
        <div>
          <label htmlFor="url">
            URL <Required />
          </label>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="https://www.great-website.com/"
            value={url}
            onChange={this.handleChangeUrl}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={this.handleChangeDescription}
          />
        </div>
        <div>
          <label htmlFor="rating">
            Rating <Required />
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={this.handleChangeRating}
            required
          />
        </div>
        <button type="button" onClick={onClickCancel}>
          Cancel
        </button>{" "}
        <button type="submit">Save</button>
      </form>
    );
  }
}

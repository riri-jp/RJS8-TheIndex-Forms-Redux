import React, { Component } from "react";

import * as actionCreators from "./store/actions";
import { connect } from "react-redux";
import { error } from "util";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.author, this.props.closeModal);
  };

  render() {
    let colors = [
      "red",
      "blue",
      "green",
      "white",
      "yellow",
      "orange",
      "black"
    ].map(color => <option value={color}>{color}</option>);
    return (
      <form onSubmit={this.handleSubmit}>
        {!!this.props.errors.length && (
          <div className="alert alert-danger" role="alert">
            {this.props.errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Title</span>
          </div>
          <input
            placeholder="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Color</span>
          </div>

          <select name="color" onChange={this.handleChange}>
            {colors}
          </select>
        </div>
        <input type="submit" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    author: state.rootAuthor.author,
    errors: state.rootErrors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook, author, closeModal) =>
      dispatch(actionCreators.postAuthor(newBook, author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);

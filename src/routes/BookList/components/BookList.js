import React, { Component } from 'react'
import BookGrid from 'components/BookGrid'

class BookList extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  render() {
    // If not full view, load child route
    if (this.props.children) {
      return this.props.children
    }

    return (
      <BookGrid books={this.props.books} />
    )
  }
}

BookList.propTypes = {

}

export default BookList

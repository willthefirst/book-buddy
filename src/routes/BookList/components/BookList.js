import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import BookThumbnail from 'components/BookThumbnail'

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
        <Row>
          {
            this.props.books.map((book, key) => {
              return (
                <BookThumbnail
                  title={ book.title }
                  authors={ book.authors }
                  thumbnailUrl={ book.thumbnailUrl }
                  linkTo= { `/book/id/${book._id}/progress` }
                  key={key} />
              )
            })
          }
        </Row>
    )
  }
}

BookList.propTypes = {

}

export default BookList

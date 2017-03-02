import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import BookThumbnail from 'components/BookThumbnail'

class BookList extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  render() {
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
  books: React.PropTypes.array
}

export default BookList

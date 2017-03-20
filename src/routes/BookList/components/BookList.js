import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import { Row } from 'react-flexbox-grid'
import BookThumbnail from 'components/BookThumbnail'

class BookList extends Component {
  componentWillMount () {
    this.props.fetchBooks()
  }

  renderBookThumbnail () {
    return (book, key) => {
      return (
        <BookThumbnail
          title={book.title}
          authors={book.authors}
          thumbnailUrl={book.thumbnailUrl}
          linkTo={`/book/id/${book.book_id}/progress`}
          key={key} />
      )
    }
  }

  render () {
    return (
      <div>
        <Panel header={<h2>Current</h2>} bsStyle='primary'>
          <Row>
            { this.props.booksCurrent.map(this.renderBookThumbnail()) }
          </Row>
        </Panel>
        <Panel header={<h2>Queue</h2>} bsStyle='info'>
          <Row>
            { this.props.booksQueue.map(this.renderBookThumbnail()) }
          </Row>
        </Panel>
        <Panel header={<h2>Finished</h2>} bsStyle='success'>
          <Row>
            { this.props.booksFinished.map(this.renderBookThumbnail()) }
          </Row>
        </Panel>
      </div>

    )
  }
}

BookList.propTypes = {
  booksCurrent: React.PropTypes.array,
  booksFinished: React.PropTypes.array,
  booksQueue: React.PropTypes.array,
  fetchBooks: React.PropTypes.func.isRequired
}

export default BookList

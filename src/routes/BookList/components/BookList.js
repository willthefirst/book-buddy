import React, { Component } from 'react'
import { Col, Row, Panel } from 'react-bootstrap'
import BookThumbnail from 'components/BookThumbnail'

class BookList extends Component {
  componentWillMount () {
    this.props.fetchBooks()
  }

  // #todo REFACTOR PLEASEEEE a refactor DESPERATELY
  render () {
    let results = {
      current: [],
      queue: [],
      finished: []
    }

    this.props.books.map((book, key) => {
      switch (book.status[0]) {
        case 'Current':
          results.current.push(book)
          break
        case 'Finished':
          results.finished.push(book)
          break
        case 'Queue':
          results.queue.push(book)
          break
      }
    })

    return (
      <div>
        <Panel header={<h2>Current</h2>} bsStyle='primary'>
          <Row>
            {
              results.current.map((book, key) => {
                return (
                  <BookThumbnail
                    title={book.title}
                    authors={book.authors}
                    thumbnailUrl={book.thumbnailUrl}
                    linkTo={`/book/id/${book._id}/progress`}
                    key={key} />
                )
              })
            }
          </Row>
        </Panel>
        <Panel header={<h2>Queue</h2>} bsStyle='info'>
          <Row>
            {
              results.queue.map((book, key) => {
                return (
                  <BookThumbnail
                    title={book.title}
                    authors={book.authors}
                    thumbnailUrl={book.thumbnailUrl}
                    linkTo={`/book/id/${book._id}/progress`}
                    key={key} />
                )
              })
            }
          </Row>
        </Panel>
        <Panel header={<h2>Finished</h2>} bsStyle='success'>
          <Row>
            {
              results.finished.map((book, key) => {
                return (
                  <BookThumbnail
                    title={book.title}
                    authors={book.authors}
                    thumbnailUrl={book.thumbnailUrl}
                    linkTo={`/book/id/${book._id}/progress`}
                    key={key} />
                )
              })
            }
          </Row>
        </Panel>
      </div>

    )
  }
}

BookList.propTypes = {
  books: React.PropTypes.array
}

export default BookList

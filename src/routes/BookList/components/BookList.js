import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'

class BookList extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  render() {
    return (
      <div>
        <Row>
          {
            this.props.books.map((book) => {
              console.log(book);
              return (
                <Col xs={4} sm={2} key={book._id}>
                  <Link to={`/book/${book._id}`}>
                    <img src="http://placehold.it/200x300" className="img-responsive" style={{ marginBottom: '24px' }} />
                    <h4>{book.title}</h4>
                  </Link>
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }

}

BookList.propTypes = {

}

export default BookList

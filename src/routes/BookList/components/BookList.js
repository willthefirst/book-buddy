import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router'

class BookList extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  render() {
    if (this.props.children) {
      return this.props.children
    }
    return (
      <div>
        <Row>
          {
            this.props.books.map((book) => {
              return (
                <Col xs={4} sm={2} key={book._id}>
                  <Link to={`/books/${book._id}`}>
                    <img src="/placeholder.png" className="img-responsive" style={{ marginBottom: '24px' }} />
                    <h4>{book.title}</h4>
                  </Link>
                </Col>
              )
            })
          }
        </Row>
        { console.log(this.props) }
        {this.props.children}
      </div>
    )
  }
}

BookList.propTypes = {

}

export default BookList

import React, { Component } from 'react'
import Modal from 'components/Modal'
import { Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router'
import moment from 'moment'
import SearchInput from 'components/SearchForm'
import DailySingle from './DailySingle'
import Heatmap from './Heatmap'
import './Daily.scss'

class Daily extends Component {
  componentWillMount () {
    // Initial load
    this.props.fetchDailies(this.props.date)
    this.props.fetchCurrent()
  }

  componentWillReceiveProps (nextProps) {
    // If component current date changes, fetch again.
    if (nextProps.routeParams.date !== this.props.routeParams.date) {
      this.props.fetchDailies(nextProps.date)
    }
  }

  render () {
    return (
      <div className='full-width'>
        <Row>
          <Col sm={6} style={{marginBottom: 20}}>
            <h3 style={{marginTop:0}}>{moment(this.props.date).format('dddd, MMMM Do')} Progress</h3>
            {
              this.props.dailiesMatch.map((daily, key) => {
                return (
                  <DailySingle
                    bookId={daily.book_id}
                    formId={`daily_${this.props.date}_${daily.book_id}`}
                    title={daily.title}
                    authors={daily.authors}
                    thumbnailUrl={daily.thumbnailUrl}
                    key={`daily_${this.props.date}_${daily.book_id}`}
                    date={this.props.date}
                    currentPage={daily.currentPage}
                    handleSubmit={this.props.handleSubmit}
                    handleDelete={this.props.handleDelete}
                    horizontal
                    />
                )
              })
            }
            {
              this.props.currentMatch.map((book, key) => {
                return (
                  <DailySingle
                    bookId={book.book_id}
                    formId={`curr_${this.props.date}_${book.book_id}`}
                    title={book.title}
                    authors={book.authors}
                    thumbnailUrl={book.thumbnailUrl}
                    key={`curr_${this.props.date}_${book.book_id}`}
                    date={this.props.date}
                    handleSubmit={this.props.handleSubmit}
                    horizontal
                    className='suggested'
                    />
                )
              })
            }
            <Modal className='daily__add' btnText={
                <span>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  {'  '}Add a book
                </span>
              }>
              <SearchInput form='addToDailyForm' handleChange={this.props.handleAddDailySearch} />
              <Row>
                {
                  this.props.booksUserCanAdd.map((book, key) => {
                    // set formId here so that form doesn't get conflated with dailiesmatch forms
                    return (
                      <DailySingle
                        bookId={book.book_id}
                        formId={`new_${this.props.date}_${book.book_id}`}
                        title={book.title}
                        authors={book.authors}
                        thumbnailUrl={book.thumbnailUrl}
                        key={`new_${this.props.date}_${book.book_id}`}
                        date={this.props.date}
                        currentPage={book.currentPage}
                        handleSubmit={this.props.handleSubmit}
                        />
                    )
                  })
                }
              </Row>
              <span>Don't see your book? Then <Link to='/book/new'>add it to your library...</Link></span>
            </Modal>
          </Col>
          <Col sm={6}>
            <Heatmap
              dailiesMatch={this.props.dailiesMatch}
              dailiesRange={this.props.dailiesRange}
              currentDate={this.props.date} />
          </Col>
        </Row>
      </div>
    )
  }
}

Daily.propTypes = {
  date: React.PropTypes.string.isRequired,
  dailiesRange: React.PropTypes.array.isRequired,
  dailiesMatch: React.PropTypes.array.isRequired,
  fetchDailies: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
  handleAddDailySearch: React.PropTypes.func.isRequired,
  booksUserCanAdd: React.PropTypes.array.isRequired,
  routeParams: React.PropTypes.object
}

export default Daily

import React, { Component } from 'react'
import BookThumbnail from 'components/BookThumbnail'
import Modal from 'components/Modal'
import { Row, Col, Button, Form, FormGroup, InputGroup, Clearfix } from 'react-bootstrap'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import moment from 'moment'
import SearchInput from 'components/SearchForm'
import DailySingle from './DailySingle'

class Daily extends Component {
  componentWillMount () {
    // Initial load
    this.props.fetchDailies(this.props.date)
  }
  componentWillReceiveProps(nextProps) {
    // If component current date changes, fetch again.
    if (nextProps.routeParams.date !== this.props.routeParams.date) {
      this.props.fetchDailies(nextProps.date)
    }
  }

  render () {
    // Next up:
    // 2) dailies:
    // from both /daily and /progress, user can CRUD dailies
    // If any dailies exists
      // render dailies
    // else no dailies AT all
      // render current, with most recent daily page as placeholder text
    // always render + sign add ability.
      // on click, user can


    return (
      <div>
        <h2>{moment(this.props.date).format('MMMM Do, YYYY')}</h2>
        <Row>
          {
            this.props.dailiesMatch.map((daily, key) => {
              return (
                <DailySingle
                  bookId={daily.book_id}
                  title={daily.title}
                  authors={daily.authors}
                  thumbnailUrl={daily.thumbnailUrl}
                  key={key}
                  date={this.props.date}
                  currentPage={daily.currentPage}
                  handleSubmit={this.props.handleSubmit}
                />
              )
            })
          }
          <Modal btnText="Add another book...">
            <SearchInput form="addToDailyForm" handleChange={this.props.handleAddDailySearch} />
              {
                this.props.booksUserCanAdd.map((book, key) => {
                  // set formId here so that form doesn't get conflated with dailiesmatch forms
                  return (
                    <DailySingle
                      bookId={book.book_id}
                      formId={book.book_id + '_new'}
                      title={book.title}
                      authors={book.authors}
                      thumbnailUrl={book.thumbnailUrl}
                      key={key}
                      date={this.props.date}
                      currentPage={book.currentPage}
                      handleSubmit={this.props.handleSubmit}
                    />
                  )
                })
              }
              <Clearfix />
              <span>Don't see your book? Then <Link to="/book/new">add it to your library...</Link></span>
          </Modal>
        </Row>
        <Row>
          <ul>
            {
              this.props.dailiesRange.map((daily, key) => {
                const formattedDate = moment(daily.date).format('YYYY-MM-DD')
                return (
                  <li key={key}>
                    <span>
                      <Link to={`/daily/${formattedDate}`}>{formattedDate}</Link>
                    </span>
                    <span>
                      - <Link to={`/book/id/${daily.book_id}/progress`}>{daily.title}</Link>
                  </span>
                  <span> - {daily.currentPage}</span>
                </li>
              )
            })
          }
        </ul>
      </Row>
    </div>
    )
  }
}

Daily.propTypes = {
  fetchDailies: React.PropTypes.func.isRequired
}

export default Daily

import React, { Component } from 'react'
import Modal from 'components/Modal'
import { Well } from 'react-bootstrap'
import { Row } from 'react-flexbox-grid'
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
  }

  componentWillReceiveProps (nextProps) {
    // If component current date changes, fetch again.
    if (nextProps.routeParams.date !== this.props.routeParams.date) {
      this.props.fetchDailies(nextProps.date)
    }
  }

  render () {
    return (
      <div className='daily-container full-width'>
        <h3>{moment(this.props.date).format('MMMM Do, YYYY')}</h3>
        <div className='daily-add'>
          <Well className='add-daily-well'>
            <Row
              middle='xs'
              style={{ height: '100%', flexWrap:'nowrap', overflowY: 'hidden', overflowX:'scroll' }}>
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
                      handleDelete={this.props.handleDelete}
                      horizontal
                      />
                  )
                })
              }
              <div>
                <Modal btnText='Add another book'>
                  <SearchInput form='addToDailyForm' handleChange={this.props.handleAddDailySearch} />
                  <Row>
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
                  </Row>
                  <span>Don't see your book? Then <Link to='/book/new'>add it to your library...</Link></span>
                </Modal>
              </div>
            </Row>
          </Well>
        </div>
        <div className='daily-show'>
          <Heatmap
            dailiesRange={this.props.dailiesRange}
            currentDate={this.props.date} />
        </div>
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

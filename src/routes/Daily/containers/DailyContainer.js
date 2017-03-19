import { connect } from 'react-redux'
import Daily from '../components/Daily'
import {
  setCurrentDate,
  fetchDailiesRequest,
  fetchDailiesSuccess,
  fetchDailiesFailure,
  queryRequest,
  querySuccess,
  queryFailure,
  addToDailies } from '../modules/daily'
import { errorHandler, applyAuthToken } from 'util/common'
import axios from 'axios'
import APP_SETTINGS from 'config'
import moment from 'moment'
import { createSelector } from 'reselect'

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddDailySearch: (keyword) => {
      if (keyword.length > 2) {
        dispatch(queryRequest())
        axios.get(`${APP_SETTINGS.API_BASE}/books?q=${keyword}`, applyAuthToken())
        .then((result) => {
          dispatch(querySuccess(result.data))
        }).catch((error) => {
          errorHandler(dispatch, error, queryFailure)
        })
      }
    },
    fetchDailies: (date) => {
      // Add current date to state so we can use it with reselect later
      dispatch(setCurrentDate(date))

      // Get full range of dailies based off today's date
      dispatch(fetchDailiesRequest())
      axios.get(`${APP_SETTINGS.API_BASE}/dailies?date=${date}`, applyAuthToken())
      .then((result) => {
        dispatch(fetchDailiesSuccess(result.data))
      }).catch((error) => {
        errorHandler(dispatch, error, fetchDailiesFailure)
      })
    },
    handleSubmit: (values) => {
      const newDaily = {
        date: values.date,
        book_id: values.bookId,
        currentPage: values.currentPage
      }

      // If daily doesn't exists, create it
      axios.post(`${APP_SETTINGS.API_BASE}/dailies`, newDaily, applyAuthToken())
      .then((result) => {
        dispatch(fetchDailiesSuccess(result.data))
      }).catch((error) => {
        errorHandler(dispatch, error, fetchDailiesFailure)
      })
    },
    handleDelete: (values) => {
      const dailyToDelete = {
        book_id: values.bookId,
        date: values.date
      }

      const config = {
        data: dailyToDelete,
        headers: applyAuthToken().headers
      }

      axios.delete(`${APP_SETTINGS.API_BASE}/dailies`, config).then((result) => {
        dispatch(fetchDailiesSuccess(result.data))
      }).catch((error) => {
        errorHandler(dispatch, error, fetchDailiesFailure)
      })
    }
  }
}

// Selector: select dailies from dailiesRange that match current date
const getDailiesRange = (state) => state.daily.dailiesRange
const getCurrentDate = (state) => state.daily.currentDate

const dailiesMatch = createSelector([getDailiesRange, getCurrentDate], (dailiesRange, currentDate) => {
  return dailiesRange.filter((daily) => {
    return daily.date === currentDate
  })
})

// Selector: returns books that user can add to daily (that don't already exist as dailies)
const getBookQueryResults = (state) => state.daily.bookQueryResults
const bookUserCanAdd = createSelector(dailiesMatch, getBookQueryResults, (currentDailies, bookResults) => {
  const canAdd = []

  bookResults.forEach((result) => {
    const existsInCurrent = currentDailies.find((daily) => {
      return daily.book_id === result.book_id
    })

    if (!existsInCurrent) {
      canAdd.push(result)
    }
  })
  return canAdd
})

const mapStateToProps = (state, ownProps) => {
  // Set date if specified in route, otherwise default to today.
  let date = new Date()

  if (ownProps.routeParams.date) {
    date = ownProps.routeParams.date
  }

  date = moment(date).format('YYYY-MM-DD')

  return {
    dailiesRange: state.daily.dailiesRange,
    dailiesMatch: dailiesMatch(state),
    booksUserCanAdd: bookUserCanAdd(state),
    date: date
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Daily)

import { connect } from 'react-redux'
import Daily from '../components/Daily'
import { fetchDailiesRequest,
  fetchDailiesSuccess,
  fetchDailiesFailure,
  fetchCurrentRequest,
  fetchCurrentSuccess,
  fetchCurrentFailure,
  queryRequest,
  querySuccess,
  queryFailure,
  addToDailies } from '../modules/daily'
import { errorHandler, applyAuthToken } from 'util/common'
import axios from 'axios'
import APP_SETTINGS from 'config'
import moment from 'moment'

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
    addBookToDaily: (book) => {
      dispatch(addToDailies(book))
    },
    fetchBooksByDay: (date) => {
      dispatch(fetchDailiesRequest())
      axios.get(`${APP_SETTINGS.API_BASE}/dailies?date=${date}`, applyAuthToken())
        .then((result) => {
          dispatch(fetchDailiesSuccess(result.data, date))
        }).catch((error) => {
          errorHandler(dispatch, error, fetchDailiesFailure)
        })

      dispatch(fetchCurrentRequest())
      axios.get(`${APP_SETTINGS.API_BASE}/books?status=current`, applyAuthToken())
        .then((result) => {
          dispatch(fetchCurrentSuccess(result.data))
        }).catch((error) => {
          errorHandler(dispatch, error, fetchCurrentFailure)
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
          dispatch(fetchDailiesSuccess(result.data, newDaily.date))
        }).catch((error) => {
          errorHandler(dispatch, error, fetchDailiesFailure)
        })
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let date = new Date()

  if (ownProps.routeParams.date) {
    date = ownProps.routeParams.date
  }

  date = moment(date).format('YYYY-MM-DD')

  let queryResults
  if (state.daily.query.length === 0) {
    queryResults = state.daily.currentBooks
  } else {
    queryResults = state.daily.query
  }

  let dailyForms
  if (state.daily.dailiesMatch.length === 0) {
    dailyForms = state.daily.currentBooks
  } else {
    dailyForms = state.daily.dailiesMatch
  }

  return {
    dailiesRange: state.daily.dailiesRange,
    dailyForms:  dailyForms,
    queryResults: queryResults,
    date: date
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Daily)

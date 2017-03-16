import { connect } from 'react-redux'
import Daily from '../components/Daily'
import { fetchDailiesRequest, fetchDailiesSuccess, fetchDailiesFailure } from '../modules/daily'
import { errorHandler, applyAuthToken } from 'util/common'
import axios from 'axios'
import APP_SETTINGS from 'config'
import moment from 'moment'

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooksByDay: (date) => {
      dispatch(fetchDailiesRequest())
      axios.get(`${APP_SETTINGS.API_BASE}/dailies?date=${date}`, applyAuthToken())
        .then((result) => {
          dispatch(fetchDailiesSuccess(result.data, date))
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

  moment(date).format('YYYY-MM-DD')

  return {
    dailiesRange: state.daily.dailiesRange,
    dailiesMatch: state.daily.dailiesMatch,
    currentBooks: state.daily.currentBooks,
    date: date
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Daily)
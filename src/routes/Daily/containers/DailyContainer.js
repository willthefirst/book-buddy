import { connect } from 'react-redux'
import Daily from '../components/Daily'
import { fetchDailiesRequest, fetchDailiesSuccess, fetchDailiesFailure } from '../modules/daily'
import { errorHandler, applyAuthToken } from 'util/common'
import axios from 'axios'
import APP_SETTINGS from 'config'

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
      if (values.dailyId) {
        // If daily already exists, update it.
        const update = {
          currentPage: values.currentPage
        }
        axios.put(
          `${APP_SETTINGS.API_BASE}/dailies/${values.daily_id}`,
          update,
          applyAuthToken())
          .then((result) => {
            console.log(result);
          }).catch((error) => {
            console.log(error);
          })
      } else {
        const newDaily = {
          date: values.date,
          book_id: bookId,
          currentPage: values.currentPage
        }
        // If daily doesn't exists, create it
        axios.post(`${APP_SETTINGS.API_BASE}/dailies`, newDaily, applyAuthToken())
          .then((result) => {
            console.log('Success', result);
          }).catch((error) => {
            console.log(error);
          })
      }



    }
  }
}

const mapStateToProps = (state) => {
  return {
    dailiesRange: state.daily.dailiesRange,
    dailiesMatch: state.daily.dailiesMatch,
    currentBooks: state.daily.currentBooks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Daily)

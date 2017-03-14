import { connect } from 'react-redux'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import axios from 'axios'
import { errorHandler, applyAuthToken } from 'util/common'
import Progress from '../components/Progress'
import APP_SETTINGS from 'config'
import moment from 'moment'

const mapDispatchToProps = (dispatch) => {
  return {
    updateProgress: (values, bookId) => {
      const newDaily = {
        date: values.date,
        book_id: bookId,
        currentPage: values.currentPage,
        filterByThisBook: true // IMPORTANT for getting right kind of response
      }

      //  #todo dailies api calls
      // /dailies?book-id=BOOK_ID_HERE&sort=-date
        // book-id: default to all books of user
        // sort: default to newer dates first
        // limit: number of entries returned, default to all
        // date-range: range to retrieve entries for


      // here i need the all dailies back
      axios.post(`${APP_SETTINGS.API_BASE}/dailies`, newDaily, applyAuthToken())
        .then((result) => {
          console.log(result);
          const update = {
            dailies: result.data
          }
          dispatch(updateBookSuccess(update))
        }).catch((error) => {
          errorHandler(dispatch, error, updateBookFailure)
        })


        // const update = {
        //   date: values.date,
        //   book_id: bookId,
        //   currentPage: values.currentPage
        // }

      // dispatch(updateBookRequest())
      // axios.put(`${APP_SETTINGS.API_BASE}/book/${bookId}/dailies`, update, applyAuthToken()).then((result) => {
      //   const update = {
      //     dailies: result.data
      //   }
      //   dispatch(updateBookSuccess(update))
      // }).catch((error) => {
      //   errorHandler(dispatch, error, updateBookFailure)
      // })
    }
  }
}

const mapStateToProps = (state) => {
  let dailies = []
  if (state.activeBook.data.dailies) {
    dailies = state.activeBook.data.dailies
  }

  return {
    dailies: dailies,
    latestEntry: dailies[0] ? dailies[0].currentPage : 0,
    initialValues: {
      date: moment().format('YYYY-MM-DD')
    },
    loading: state.activeBook.loading,
    errorMessage: state.activeBook.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress)

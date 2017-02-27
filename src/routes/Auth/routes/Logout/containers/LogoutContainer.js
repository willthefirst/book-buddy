import { connect } from 'react-redux'
import Logout from '../components/Logout'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'
import { resetBook } from 'routes/Book/modules/book'
import { resetBookList } from 'routes/BookList/modules/bookList'
import { unauthUser, setRedirectUrl } from 'layouts/CoreLayout/modules/coreLayout'

const mapDispatchToProps = (dispatch) => {
  // #todo: ADMIN VERSION refactor the getting of the rooturk
  const AUTH_ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api/auth' : '/api/auth';

  return {
    handleLogout: () => {
      dispatch(unauthUser());
      dispatch(resetBook());
      dispatch(resetBookList());
      
      cookie.remove('token', { path: '/' });
      setRedirectUrl('');
      browserHistory.push(`/auth/login`);
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)

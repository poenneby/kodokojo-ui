import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Login from '../components/Login'
import { sendEmail } from '../actions/login'


const mapStateProps = (state) => {
  return {
    email: state.login.email
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    sendEmail: (email) => dispatch(sendEmail(email))
  }
}

const HomePage = connect(
    mapStateProps,
    mapDispatchProps
)(Login)

export default HomePage

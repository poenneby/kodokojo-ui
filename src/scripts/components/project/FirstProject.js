import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//import { sendEmail } from './loginActions'

// Login component
export const FirstProject = class FirstProject extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { account } = this.props

    return (
      <div>
        {JSON.stringify(account)}
      </div>
    )
  }

}

FirstProject.propTypes = {
  account: PropTypes.object.isRequired
}

// FirstProject container
const mapStateProps = (state) => {
  console.log(state)
  return {
    account: state.login.account
  }
}

//const mapDispatchProps = (dispatch) => {
//  return {
//    sendEmail: (email) => dispatch(sendEmail(email))
//  }
//}

const FirstProjectContainer = connect(
    mapStateProps
    //mapDispatchProps
)(FirstProject)

export default FirstProjectContainer

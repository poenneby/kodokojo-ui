import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// UI
import TableRow from 'material-ui/Table/TableRow'
import TableRowColumn from 'material-ui/Table/TableRowColumn'

// TODO TU
// User component
export class User extends Component {

  static propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { user } = this.props

    return (
      <TableRow>
        <TableRowColumn>{ user ? user.userName : '-' }</TableRowColumn>
        <TableRowColumn>{ user ? 'admin' : '-' }</TableRowColumn>
        <TableRowColumn>{ user ? user.email : '-' }</TableRowColumn>
      </TableRow>
    )
  }
}

// User container
const mapStateProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchProps = (dispatch) => {
  return {

  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    user: stateProps.users[ownProps.userId]
  }
}

const UserContainer = connect(
  mapStateProps,
  mapDispatchProps,
  mergeProps
)(User)

export default UserContainer

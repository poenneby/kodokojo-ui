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
    userId: PropTypes.string
  }

  render() {
    const { user } = this.props // eslint-disable-line no-shadow

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
const mapStateProps = (state) => (
  {
    users: state.users
  }
)

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...ownProps,
    user: stateProps.users[ownProps.userId]
  }
)

const UserContainer = connect(
  mapStateProps,
  {},
  mergeProps
)(User)

export default UserContainer

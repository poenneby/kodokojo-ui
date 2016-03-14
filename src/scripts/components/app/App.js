import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

class App extends Component {
  render() {
    const { children } = this.props

    return (
        <div>
          <header>
            {'>> '}
            <Link to="/">Home</Link>
            {' > '}
            <Link to="/users">Users</Link>
          </header>
          <div style={{ marginTop: '2em' }}>
            <button onClick={() => browserHistory.push('/users')}>Go to /users</button>
          </div>
          <div style={{ marginTop: '4em' }}>{children}</div>
        </div>
    )
  }

}

export default App

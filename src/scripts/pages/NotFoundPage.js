import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import DocumentMeta from 'react-document-meta'

//const metaData = {
//  title: '404 Page Not Found',
//  description: 'Homecare',
//  meta: {
//    charset: 'utf-8',
//    name: {
//      keywords: 'homecare, bla, bla',
//    },
//  },
//}

export const NotFound = class NotFound extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { status, dataTypePage } = this.props
    return (
        <div>
          {/* <DocumentMeta {...metaData} /> */}
          <h3>{ status } NotFound</h3>
          <p>{ dataTypePage }</p>
        </div>
    )
  }
}

NotFound.propTypes = {
  status: PropTypes.number.isRequired,
  dataTypePage: PropTypes.string.isRequired
}

// NotFounPage container
const mapStateProps = (state, ownProps) => {
  return {
    status: ownProps.route.status,
    dataTypePage: ownProps.route.dataTypePage
  }
}

const NotFoundPage = connect(
    mapStateProps
)(NotFound)

export default NotFoundPage

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import DocumentMeta from 'react-document-meta'

// UI
import Paper from 'material-ui/Paper'

// Component
import { centerPaper } from '../../styles/commons'

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

export class NotFound extends Component {

  static propTypes = {
    dataTypePage: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { status, dataTypePage } = this.props
    return (
        <div>
          <Paper style={ centerPaper } zDepth={1}>
            {/* <DocumentMeta {...metaData} /> */}
            <h3>{ status } NotFound</h3>
            <p>{ dataTypePage }</p>
          </Paper>
        </div>
    )
  }
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

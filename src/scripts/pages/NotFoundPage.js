import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import DocumentMeta from 'react-document-meta'

// Component
import Card from '../components/_ui/card/Card.component'
import CardContent from '../components/_ui/card/CardContent.component'
import CardContainer from '../components/_ui/card/CardContainer.component'

// const metaData = {
//  title: '404 Page Not Found',
//  description: 'KodoKojo',
//  meta: {
//    charset: 'utf-8',
//    name: {
//      keywords: 'test, keyword, other',
//    }
//  }
// }

export class NotFound extends Component {

  static propTypes = {
    contentFromRoute: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired
  }

  render() {
    const { status, contentFromRoute } = this.props
    return (
      <CardContainer>
        <Card
          title={ `${status} NotFound` }
        >
          <CardContent>
              <p>{ contentFromRoute }</p>
          </CardContent>
        </Card>
      </CardContainer>
    )
  }
}

// NotFounPage container
const mapStateProps = (state, ownProps) => (
  {
    status: ownProps.route.status,
    contentFromRoute: ownProps.route.contentFromRoute
  }
)

const NotFoundPage = connect(
    mapStateProps
)(NotFound)

export default NotFoundPage

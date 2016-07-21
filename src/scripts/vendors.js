// core
import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { Provider, connect } from 'react-redux'

// router
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// intl
import { intlShape, injectIntl, addLocaleData } from 'react-intl'

// ui
import { themr } from 'react-css-themr'

// DOM, browser
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

// form
import { reduxForm } from 'redux-form'

// other
import Promise from 'bluebird'

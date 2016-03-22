import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from '../components/auth/authReducer'

const rootReducer = combineReducers({
  auth,
  routing: routerReducer
})

export default rootReducer
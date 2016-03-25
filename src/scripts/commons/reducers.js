import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from '../components/auth/authReducer'
import prefs from '../components/app/appReducer'

const rootReducer = combineReducers({
  auth,
  prefs,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
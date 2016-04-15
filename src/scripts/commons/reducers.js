import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from '../components/auth/authReducer'
import prefs from '../components/app/appReducer'
import project from '../components/project/projectReducer.js'

const rootReducer = combineReducers({
  auth,
  prefs,
  project,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
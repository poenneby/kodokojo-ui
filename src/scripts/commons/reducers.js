import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from '../components/auth/authReducer'
import prefs from '../components/app/appReducer'
import projectConfig from '../components/projectConfig/projectConfigReducer'

const rootReducer = combineReducers({
  auth,
  prefs,
  projectConfig,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
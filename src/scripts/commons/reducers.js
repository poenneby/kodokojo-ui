import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from '../components/auth/authReducer'
import prefs from '../components/app/appReducer'
import projectConfig from '../components/projectConfig/projectConfigReducer'
import users from '../components/user/userReducer'

const rootReducer = combineReducers({
  auth,
  prefs,
  projectConfig,
  users,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
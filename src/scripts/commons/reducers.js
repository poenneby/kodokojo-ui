import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from '../components/auth/auth.reducer'
import prefs from '../components/app/appReducer'
import projectConfig from '../components/projectConfig/projectConfig.reducer'
import project from '../components/project/project.reducer'
import users from '../components/user/user.reducer'

const rootReducer = combineReducers({
  auth,
  prefs,
  projectConfig,
  project,
  users,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from '../components/auth/auth.reducer.js'
import bricks from '../components/brick/brick.reducer.js'
import login from '../components/login/login.reducer'
import menu from '../components/menu/menu.reducer'
import prefs from '../components/app/app.reducer'
import projectConfig from '../components/projectConfig/projectConfig.reducer'
import signup from '../components/signup/signup.reducer'
import users from '../components/user/user.reducer'

const rootReducer = combineReducers({
  auth,
  bricks,
  login,
  menu,
  prefs,
  projectConfig,
  signup,
  users,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer

import find from 'lodash/find'

import statusDefault from '../../images/status-default-small.svg'
import statusStarting from '../../images/status-starting-small.svg'
import statusRunning from '../../images/status-running-small.svg'
import statusFailure from '../../images/status-failure-small.svg'

const enumBrickStatus = {
  CONFIGURING: {
    label: 'STARTING',
    image: statusStarting
  },
  STARTING: {
    label: 'STARTING',
    image: statusStarting
  },
  RUNNING: {
    label: 'RUNNING',
    image: statusRunning
  },
  FAILURE: {
    label: 'ONFAILURE',
    image: statusFailure
  }
  // ALLREADYEXIST: {
  //   label: 'exist',
  //   image: ''
  // },
  // STOPPED: {
  //   label: 'stopped',
  //   image: ''
  // }
}

export const getBrickStatus = (state) => (
  find(enumBrickStatus, { label: state }) || {
    label: 'DEFAULT',
    image: statusDefault
  }
)

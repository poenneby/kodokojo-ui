import find from 'lodash/find'

import statusStarting from '../../images/status-starting.svg'
import statusRunning from '../../images/status-running.svg'
import statusFailure from '../../images/status-failure.svg'

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
  // TODO set an other default status image?
  find(enumBrickStatus, { label: state }) || {
    label: 'DEFAULT',
    image: statusStarting
  }
)

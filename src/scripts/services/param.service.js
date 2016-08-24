/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import find from 'lodash/find'

// status
import statusDefault from '../../images/status-default-small.svg'
import statusStarting from '../../images/status-starting-small.gif'
import statusRunning from '../../images/status-running-small.svg'
import statusFailure from '../../images/status-failure-small.svg'

// bricks
import brickGitlab from '../../images/brick-gitlab.svg'
import brickJenkins from '../../images/brick-jenkins.svg'
import brickNexus from '../../images/brick-nexus.svg'
import brickDockerRegistry from '../../images/brick-docker-registry.svg'

export const enumBrickStatus = {
  CONFIGURING: {
    label: 'CONFIGURING',
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

export const enumBrickLogos = {
  GITLAB: {
    name: 'gitlab',
    image: brickGitlab
  },
  JENKINS: {
    name: 'jenkins',
    image: brickJenkins
  },
  NEXUS: {
    name: 'nexus',
    image: brickNexus
  },
  DOCKERREGISTRY: {
    name: 'dockerregistry',
    image: brickDockerRegistry
  }
}

export const getBrickLogo = (state) => (
  find(enumBrickLogos, { name: state.name }) || undefined
)

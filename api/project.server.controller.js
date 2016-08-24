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

import * as projectRepository from './project.server.repository'

export const postProjectConfig = (request, response) => {
  projectRepository
    .postProjectConfig(request.headers, request.body.name, request.body.ownerIdentifier, request.body.userIdentifiers)
    .then(data => response.status(201).send(data))
    .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const getProjectConfig = (request, response) => {
  projectRepository
    .getProjectConfig(request.headers, request.params.projectConfigId)
    .then(data => response.status(201).send(data))
    .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const putUserToProjectConfig = (request, response) => {
  projectRepository
    .putUserToProjectConfig(request.headers, request.params.projectConfigId, request.body)
    .then(data => response.status(200).send(data))
    .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const postProject = (request, response) => {
  projectRepository
    .postProject(request.headers, request.params.projectConfigId)
    .then(data => response.status(201).send(data))
    .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}


export const getProject = (request, response) => {
  projectRepository
    .getProject(request.headers, request.params.projectId)
      .then(data => response.status(200).send(data))
      .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}


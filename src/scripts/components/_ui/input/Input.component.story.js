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

import React from 'react'
import { storiesOf } from '@kadira/storybook'

// contexte

// component to story
import Input from './Input.component'

storiesOf('Input', module)
  .addDecorator((story) => (
    <div style={{ width: '300px', margin: '50px' }}>
      { story() }
    </div>
  ))
  .add('default', () => (
    <Input
      label="input label"
    />
  ))
  .add('with icon', () => (
    <Input
      icon="email"
      label="input label"
      name="inputValue"
    />
  ))
  .add('with value', () => (
    <Input
      icon="email"
      label="input label"
      name="inputValue"
      value="something"
    />
  ))
  .add('required', () => (
    <Input
      icon="email"
      label="input label"
      name="inputValue"
      required
    />
  ))
  .add('disabled', () => (
    <Input
      disabled
      icon="email"
      label="input label"
      name="inputValue"
    />
  ))
  .add('with hint', () => (
    <Input
      hint="This is a hint"
      icon="email"
      label="input label"
      name="inputValue"
    />
  ))
  .add('with hint & value', () => (
    <Input
      hint="This is a hint"
      icon="email"
      label="input label"
      name="inputValue"
      value="some value"
    />
  ))
  .add('on error', () => (
    <Input
      error="error in this input"
      hint="This is a hint"
      icon="email"
      label="input label"
      name="inputValue"
      value="some value"
    />
  ))
  .add('on error - required', () => (
    <Input
      error="error in this input"
      hint="This is a hint"
      icon="email"
      label="input label"
      name="inputValue"
      required
      value="some value"
    />
  ))

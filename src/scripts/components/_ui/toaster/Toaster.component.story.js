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
import { storiesOf, action, linkTo } from '@kadira/storybook'

// contexte

// component to story
import Toaster from './Toaster.component'

storiesOf('Toaster', module)
  .addDecorator((story) => (
    <div style={{ width: '300px', margin: '50px' }}>
      { story() }
    </div>
  ))
  .add('accept', () => (
    <Toaster
      action="Accept"
      active
      icon="question_answer"
      label="Snackbar action accept"
      onClick={ () => {} }
      onTimeout={ () => {} }
      timeout={ 2000 }
      toasterVariant="accept"
      type="accept"
    />
  ))
  .add('cancel', () => ( 
    <Toaster
      action="Cancel"
      active
      icon="question_answer"
      label="Snackbar action cancel"
      onClick={ () => {} }
      onTimeout={ () => {} }
      timeout={ 2000 }
      toasterVariant="cancel"
      type="cancel"
    />
  ))
  .add('warning', () => ( 
    <Toaster
      action="Close"
      active
      icon="question_answer"
      label="Snackbar action warning"
      onClick={ () => {} }
      onTimeout={ () => {} }
      timeout={ 2000 }
      toasterVariant="warning"
      type="warning"
    />
  ))

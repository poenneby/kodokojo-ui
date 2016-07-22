import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import classNames from 'classnames'

// component
import '../../../styles/_commons.less'
import utilsTheme from '../../../styles/_utils.scss'
import Card from '../_ui/card/Card.component'
import CardContent from '../_ui/card/CardContent.component'
import CardContainer from '../_ui/card/CardContainer.component'
import Input from '../_ui/input/Input.component'
import Checkbox from '../_ui/checkbox/Checkbox.component'
import Button from '../_ui/button/Button.component'
import FontIcon from '../_ui/fontIcon/FontIcon.component'
import { createProjectConfig } from './projectConfig.actions'
import { projectNameValidator } from '../../services/validator.service'
import { returnErrorKey } from '../../services/error.service'
import { getBrickLogo } from '../../services/param.service'

// validation function
const validate = combineValidators({
  projectName: projectNameValidator('projectName')
})

// TODO TU
// ProjectConfigForm component
export class ProjectConfigForm extends Component {

  static propTypes = {
    bricks: PropTypes.object,
    createProjectConfig: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    submitting: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired
  }

  handleSubmit = () => {
    const { fields: { projectName }, userId, createProjectConfig } = this.props // eslint-disable-line no-shadow

    const nextProjectName = projectName.value
    const error = validate({ projectName: nextProjectName })

    if (error.projectName) {
      return Promise.reject({ projectName: error.email })
    }
    if (nextProjectName && nextProjectName.trim()) {
      return createProjectConfig(nextProjectName.trim(), userId)
        .then(Promise.resolve())
        .catch(err => Promise.reject({ projectName: returnErrorKey(
          {
            component: 'project',
            code: err.message
          })
        }))
    }
    // TODO add default error message
    return Promise.reject()
  }

  render() {
    const { bricks, fields: { projectName, projectUsers }, handleSubmit, submitting } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    const bricksDetails = bricks && bricks.list && bricks.list.length ? bricks.list : undefined

    return (
      <form id="projectForm"
            name="projectForm"
            onSubmit={ handleSubmit(this.handleSubmit) }
      >
        <CardContainer>
          <div style={{ display: 'block', overflow: 'auto', width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', flexFlow: 'row' }}>
              <Card
                primary
                row
                style={{ flex: '1 100%', marginBottom: '10px' }}
              >
                <CardContent
                  className={ utilsTheme['content-gutter--large'] }
                  raw
                  row
                >
                  <div
                    className={ classNames(utilsTheme['title--default'], utilsTheme['content-spacer--large']) }
                    style={{ flex: '0 220px' }}
                  >
                    <span className={ utilsTheme['text-uppercase'] }>
                      <FormattedMessage id={ 'project-add-label' }/>
                    </span>
                  </div>
                  <div
                    style={{ flex: '0 60%', paddingTop: '20px' }}
                  >
                    <div style={{ width: '50%' }}>
                      <Input
                        { ...projectName }
                        error={
                          projectName.touched && projectName.error ?
                          formatMessage({ id: projectName.error }, { fieldName: formatMessage({ id: 'project-name-label' }) }) :
                          ''
                        }
                        label={ formatMessage({ id: 'project-name-label' }) }
                        name="projectName"
                        required
                        type="text"
                      />
                      <input
                        {...projectUsers}
                        id="projectUsers"
                        name="projectUsers"
                        type="hidden"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'no-wrap', justifyContent: 'stretch' }}>
              <div style={{ display: 'flex', flex: '0 200px', flexFlow: 'column', alignItems: 'stretch', justifyContent: 'stretch' }}>
                <Card
                  style={{ height: '100%', marginRight: '10px' }}
                >
                  <CardContent
                    className={ utilsTheme['content-gutter--large'] }
                    raw
                  >
                    <div
                      className={ utilsTheme['content-spacer--large'] }
                      style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'flex-start' }}
                    >
                      <div
                        style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center', flex: '1 100%' }}
                      >
                        <div
                          className={ classNames(utilsTheme['title--default']) }
                        >
                          <span className={ utilsTheme['text-uppercase'] }>
                            <FormattedMessage id={ 'stack-bricks-label' }/>
                          </span>
                        </div>
                        <FontIcon
                          className={ utilsTheme['icon--large'] }
                          value="layers"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div style={{ display: 'flex', flex: '1 60%', flexFlow: 'column' }} >
                <div style={{ display: 'flex', flexFlow: 'column', flex: '1 100%' }}>
                  { bricksDetails && bricksDetails.length > 0 &&
                    bricksDetails.map((brickType, brickTypeIndex) => (
                      <div
                        key={ brickTypeIndex }
                        style={{ dispay: 'flex', flex: '1 100%', flewFlow: 'column' }}
                      >
                        <Card
                        style={ brickTypeIndex > 0 ?
                          { flex: '1 1 100%', justifyContent: 'center', alignItems: 'stretch', display: 'flex',
                            height: 'calc(100% - 10px)', marginTop: '10px' } :
                          { flex: '1 1 100%', justifyContent: 'center', alignItems: 'stretch', display: 'flex', height: '100%' }
                        }
                      >
                        <CardContent
                          className={ utilsTheme['content-gutter--smaller'] }
                          raw
                          row
                        >
                          <div
                            style={{ flex: '1 30%' }}
                          >
                            <div
                              className={ classNames(utilsTheme['title--default']) }
                            >
                              <FormattedMessage id={ `${brickType[0].type.toLowerCase()}-label` }/>
                            </div>
                          </div>
                          <div
                            style={{ flex: '1 70%' }}
                          >
                            { brickType.length > 0 &&
                              brickType.map((brick, brickIndex) => (
                                <div
                                  key={ brickIndex }
                                  style={{ display: 'flex', minHeight: '70px', alignItems: 'center' }}
                                >
                                  <Checkbox
                                    // TODO wire checkbox value on form when needed (multiple rick choices)
                                    checked
                                    disabled={ brickType.length < 2 }
                                    label={
                                      <span style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
                                        { getBrickLogo(brick).image &&
                                          <img src={ getBrickLogo(brick).image } style={{ width: '70px', height: '70px' }} />
                                        }
                                        <span className={ utilsTheme['text-capitalize'] }>
                                          <FormattedMessage id={ `brick-${getBrickLogo(brick).name}-label` } />
                                          <span className={ utilsTheme['text-normal']}>{ ` ${brick.version}` }</span>
                                        </span>
                                      </span>
                                    }
                                  />
                                </div>
                              ))
                            }
                          </div>
                        </CardContent>
                      </Card>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-end', marginTop: '10px' }}>
              <Button
                disabled={ submitting }
                label={ formatMessage({ id: 'create-label' }) }
                primary
                title={ formatMessage({ id: 'create-label' }) }
                type="submit"
              />
            </div>
          </div>
        </CardContainer>
      </form>
    )
  }
}

// ProjectConfigForm container
const mapStateProps = (state) => (
  {
    bricks: state.bricks,
    userId: state.auth.account && state.auth.account.id ? state.auth.account.id : ''
  }
)

const ProjectConfigFormContainer = compose(
  reduxForm(
    {
      form: 'projectForm',
      fields: ['projectName', 'projectUsers'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    {
      createProjectConfig
    }
  ),
  injectIntl
)(ProjectConfigForm)

export default ProjectConfigFormContainer

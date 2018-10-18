import * as React from 'react'
import { Form, Button, Input, RadioGroup } from '@stardust-ui/react'
import Formsy from 'formsy-react'
import FormsyFormFieldWithErrorMessage from './FormsyFormFieldWithErrorMessage'

class FormValidationOnChange extends React.Component<any, any> {
  state = { buttonDisabled: false }

  render() {
    return (
      <Form
        as={Formsy}
        onSubmit={() => {
          alert('Form submitted')
        }}
        onValid={() => this.setState({ buttonDisabled: false })}
        onInvalid={() => this.setState({ buttonDisabled: true })}
        fields={this.getFields()}
      />
    )
  }

  getFields = () => {
    const { buttonDisabled } = this.state
    const fields = [
      {
        controlType: Input,
        name: 'full-name-on-change',
        id: 'full-name-on-change',
        key: 'full-name',
        required: true,
        label: 'Full Name',
        validations: {
          isExisty: true,
        },
        validationErrors: {
          isExisty: 'You must enter your name.',
        },
      },
      {
        controlType: Input,
        name: 'email-on-change',
        validations: {
          isEmail: true,
          maxLength: 50,
        },
        validationErrors: {
          isEmail: 'You have to type valid email',
          maxLength: 'You can not type in more than 50 characters',
        },
        id: 'email-on-change',
        key: 'last-name',
        label: 'Email',
      },
      {
        controlType: RadioGroup,
        name: 'gender',
        control: {
          items: [
            <RadioGroup.Item key="1" label="Male" value="1" />,
            <RadioGroup.Item key="2" label="Female" value="2" />,
          ],
        },
        id: 'gender',
        key: 'gender',
        label: 'Gender',
      },
      <Button content="Submit" disabled={buttonDisabled} key="submit" />,
    ]
    return fields.map((field, index) => {
      if (index < fields.length - 1) {
        return <FormsyFormFieldWithErrorMessage {...field} />
      }
      // The last item in the fields is the submit button.
      return field
    })
  }
}

export default FormValidationOnChange
import React from 'react'

import {Form} from 'react-bootstrap';

const FormInputError = (props) => {
  return (
    <Form.Control.Feedback type='invalid'>
{props.message}
  </Form.Control.Feedback>
  )
}

export default FormInputError
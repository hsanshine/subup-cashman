import React, { useState } from "react";

import { Form, Col, Row } from "react-bootstrap";

import FormInputError from "./FormInputError";

const FormDomination = (props) => {
  const [qtyError, setQtyError] = useState(false); //or it can come from up props.error
  const [enteredValue, setEnteredValue] = useState(props.initValue);
  const handleQtyChange = (event) => {
    setEnteredValue(event.target.value);
    if (!props.isDepositing && Number(event.target.value) > props.maxQty) {
      setQtyError(true);
      props.onError(true);
    } else {
      setQtyError(false);
      props.onError(false);
      const noteObject = {
        id: props.id,
        value: props.value,
        qty: event.target.value,
      };
      props.onNoteInput(noteObject);
    }
  };

  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label as={Col} column xs="6" md="4" htmlFor="dollars20">
        {" "}
        $ {props.value}{" "}
      </Form.Label>
      <Col xs="6" md="4" lg="3" className="ms-auto">
        <Form.Control
          isInvalid={qtyError}
          type="number"
          min="0"
          onChange={handleQtyChange}
          value={enteredValue}
          step="1"
          className="form-control"
          id="dollars20"
        />
        <FormInputError
          message={`Not enough ${qtyError ? "notes" : "credit"}`}
        />
      </Col>
    </Form.Group>
  );
};

export default FormDomination;

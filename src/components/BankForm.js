import React, { useReducer, useEffect } from "react";

import {
  Form,
  Col,
  Row,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";

import FormDomination from "./FormDomination";
import { notesTotal, adminNotesTotal } from "../utils/notesToCash";
import FormInputError from "./FormInputError";
import CustomCard from "../UI/CustomCard";

import "./BankForm.css";

const stateIntialization = ({
  availableNotes,
  userCredit,
  isDepositing,
  validated,
  isAdmin,
  task,
}) => {
  const bankSlip = {
    amount: isAdmin ? adminNotesTotal(availableNotes) : 0,
    notes: [],
    availableNotes: availableNotes,
    notesError: false,
    creditError: false,
    userCredit,
    isDepositing,
    validated,
    isAdmin,
    task,
  };
  return bankSlip;
};

const reducer = (state, action) => {
  if (action.type === "INTIALIZE") {
    return {
      ...state,
      notes: action.payLoad,
      amount: adminNotesTotal(action.payLoad),
    };
  } else if (action.type === "ADD-NOTES") {
    const notesArray = [...state.notes];
    const newNote = action.payLoad;
    const noteIndex = state.notes.findIndex((note) => note.id === newNote.id);
    if (noteIndex === -1) {
      notesArray.push(newNote);
    } else {
      notesArray[noteIndex] = newNote;
    }
    const newAmount = notesTotal(notesArray);
    return {
      ...state,
      notes: notesArray,
      amount: notesTotal(notesArray),
      creditError: state.isDepositing
        ? false
        : newAmount > Number(state.userCredit),
      validated: state.isDepositing
        ? true
        : !state.notesError && newAmount <= Number(state.userCredit),
    };
  } else if (action.type === "CHECK-NOTES-ERROR") {
    return {
      ...state,
      notesError: action.payLoad,
      validated:
        action.payload && Number(state.amount) <= Number(state.userCredit),
    };
  } else {
    return { ...state };
  }
};

const BankForm = ({
  notes,
  userCredit,
  isDepositing,
  isAdmin,
  onFormSubmit,
  onFormCancel,
  task,
}) => {
  const [slipState, dispatch] = useReducer(
    reducer,
    {
      availableNotes: notes,
      userCredit,
      isDepositing,
      validated: false,
      isAdmin,
      task,
    },
    stateIntialization
  );

  useEffect(() => {
    if (isAdmin) {
      dispatch({
        type: "INTIALIZE",
        payLoad: notes,
      });
    }

    return () => {
      //do some clearing
    };
  }, [isAdmin, notes]);

  function handleCancel() {
    onFormCancel();
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (slipState.amount === 0) {
      onFormCancel();
    }
    if (!slipState.validated) {
    }
    const withdrawReport = {
      amountChange: slipState.amount,
      notesChange: slipState.notes,
    };
    onFormSubmit(withdrawReport);
  };

  const handleNoteInput = (noteObject) => {
    dispatch({ type: "ADD-NOTES", payLoad: noteObject });
  };

  const handleNotesError = (hasError) => {
    dispatch({ type: "CHECK-NOTES-ERROR", payLoad: hasError });
  };
  return (
    <CustomCard>
      <Form
        noValidate
        validated={slipState.validated}
        onSubmit={handleFormSubmit}
        className="p-3 px-4 rounded-3 mt-2 form-body"
      >
        <h4>Notes</h4>

        {slipState.availableNotes.map((note) => (
          <FormDomination
            key={note.id}
            id={note.id}
            value={note.value}
            maxQty={note.maxQty}
            onNoteInput={handleNoteInput}
            defaultValue="0"
            onError={handleNotesError}
            isDepositing={isDepositing}
            initValue={isAdmin ? note.maxQty : 0}
          />
        ))}

        <Form.Group as={Row} className="mb-3 ">
          <Form.Label as={Col} column xs="4" md="4" htmlFor="dollars20">
            {" "}
            Total Amount{" "}
          </Form.Label>

          <Col className="ms-auto col-md-4">
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <FormControl
                isInvalid={slipState.creditError}
                type="number"
                value={slipState.amount}
                disabled
                onChange={() => {}}
              />
              <FormInputError message={"Not enough credit available"} />
            </InputGroup>
          </Col>
        </Form.Group>

        <div className="d-grid gap-2 col-md-6 d-md-flex ms-auto">
          <Button
            className="ms-md-auto btn"
            variant="primary"
            disabled={slipState.notesError || slipState.creditError}
            type="submit"
          >
            {`${slipState.task ? `${slipState.task}` : "Do sth"}`}
          </Button>

          <Button variant="danger" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </CustomCard>
  );
};

export default BankForm;

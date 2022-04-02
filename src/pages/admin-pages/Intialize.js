import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { intialize } from "../../features/admin/adminSlice";

import BankForm from "../../components/BankForm";

const Intialize = () => {
  const machineBalance = useSelector((state) => state.admin.machineBalance);
  console.log("machine balance is ", machineBalance);
  const notes = useSelector((state) => state.admin.notes);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleFormCancel = () => {
    history.push("/user");
  };

  const handleFormSubmit = (initializeReport) => {
    const newState = {
      machineBalance: initializeReport.amountChange,
      notes: initializeReport.notesChange.map((note) => ({
        ...note,
        maxQty: note.qty,
      })),
    };
    dispatch(intialize(newState));

    history.push("/user");
  };

  return (
    <>
      <h2>Intialize</h2>
      <p>
        This is the status of the machine , you can adjust the number of
        available notes.
      </p>
      <BankForm
        notes={notes}
        userCredit={machineBalance}
        isDepositing={true}
        onFormSubmit={handleFormSubmit}
        onFormCancel={handleFormCancel}
        isAdmin={true}
        task="Intialize"
      />
    </>
  );
};

export default Intialize;

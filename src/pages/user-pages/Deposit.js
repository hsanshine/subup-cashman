import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deposit } from "../../features/user/userSlice";
import { updateMachineBalance } from "../../features/admin/adminSlice";

import BankForm from "../../components/BankForm";

const Deposit = () => {
  const userCredit = useSelector((state) => state.user.accountBalance);
  const dispatch = useDispatch();
  const history = useHistory();
  const notes = useSelector((state) => state.admin.notes);
  const handleFormCancel = () => {
    history.push("/user");
  };

  const handleFormSubmit = (depositReport) => {
    dispatch(
      updateMachineBalance({
        notes: depositReport.notesChange,
        isDepositing: true,
      })
    );
    dispatch(deposit({ amountChange: depositReport.amountChange }));
    history.push("/user");
  };

  return (
    <>
      <h2>Desposit Money</h2>
      <BankForm
        notes={notes}
        userCredit={userCredit}
        isDepositing={true}
        onFormSubmit={handleFormSubmit}
        onFormCancel={handleFormCancel}
        task="Deposit"
      />
    </>
  );
};

export default Deposit;

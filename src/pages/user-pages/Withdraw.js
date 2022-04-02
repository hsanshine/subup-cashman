import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withdraw } from "../../features/user/userSlice";
import { updateMachineBalance } from "../../features/admin/adminSlice";
import BankForm from "../../components/BankForm";

const Withdraw = () => {
  const dispatch = useDispatch();
  const userCredit = useSelector((state) => state.user.accountBalance);
  const notes = useSelector((state) => state.admin.notes);
  const history = useHistory();

  const handleFormSubmit = (withdrawReport) => {
    dispatch(
      updateMachineBalance({
        notes: withdrawReport.notesChange,
        isDepositing: false,
      })
    );
    dispatch(withdraw({ amountChange: withdrawReport.amountChange }));
    history.push("/user");
  };

  const handleFormCancel = () => {
    history.push("/user");
  };

  return (
    <>
      <h2>Withdraw money</h2>
      <BankForm
        notes={notes}
        userCredit={userCredit}
        isDepositing={false}
        onFormSubmit={handleFormSubmit}
        onFormCancel={handleFormCancel}
        task="Withdraw"
      />
    </>
  );
};

export default Withdraw;

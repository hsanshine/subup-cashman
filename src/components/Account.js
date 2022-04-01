import React from "react";

import CustomCard from "../UI/CustomCard";

import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Account.css";

const Account = (props) => {
  const balance = useSelector((state) => state.user.accountBalance);
  const history = useHistory();
  const handleWithdraw = () => {
    history.push("/user/withdraw");
  };
  const handleDeposit = () => {
    history.push("/user/deposit");
  };

  return (
    <CustomCard>
      <Card.Body className="p-4 card-body">
        <div className="mb-auto">
          <sup className="text-white">$</sup>{" "}
          <span className="h2 text-white">
            {balance.toLocaleString("en", { useGrouping: true })}
          </span>
          <div className="text-light mt-2 text-sm">Your current balance</div>
        </div>
        <div className="d-grid gap-2 col-md-6 d-md-flex ms-auto mt-5 card-actions">
          <Button
            className="ms-md-auto"
            variant="primary"
            onClick={handleDeposit}
          >
            Deposit
          </Button>
          <Button variant="primary" onClick={handleWithdraw}>
            Withdraw
          </Button>
        </div>
      </Card.Body>
    </CustomCard>
  );
};

export default Account;

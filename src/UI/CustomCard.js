import React from "react";
import { Card } from "react-bootstrap";
import "./CustomCard.css";

const CustomCard = (props) => {
  return (
    <Card className={`custom-card ${props.className}`}>{props.children}</Card>
  );
};

export default CustomCard;

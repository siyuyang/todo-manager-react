/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import styled from "styled-components";
import TxForm from "../Form/TxForm";

const Anchor = styled.a`
  cursor: pointer;
  opacity: 1;
  color: white;
  &:hover {
    opacity: 1;
    color: #fff;
  }
  span:hover {
    text-decoration: underline;
    color: #fff;
  }
`;
// TC: setIsForm open / close 
const renderForm = (listName, setIsFormOpen) => (
  <TxForm onCancel={() => setIsFormOpen(false)} listName={listName} />
);
const renderAddButton = setIsFormOpen => (
  <Anchor className="item" onClick={() => setIsFormOpen(true)}>
    <i aria-hidden="true" className="add square icon"></i>
    <span>Add a Card</span>
  </Anchor>
);

// TC: on load / enderAddButton should get call
const TxAddCardButton = props => {
  const { listName } = props;
  const [isFormOpen, setIsFormOpen] = useState(false);
  return isFormOpen
    ? renderForm(listName, setIsFormOpen)
    : renderAddButton(setIsFormOpen);
};

export default TxAddCardButton;

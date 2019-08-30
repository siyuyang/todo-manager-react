import React from "react";
import styled from "styled-components";
import BillabongFont from "./Billabong.woff";

import { Link } from "react-router-dom";

const H1 = styled.h1`
  font-family: BillabongFont, "BillabongFont";
  text-align: center;
  font-weight: 100;
  font-size: 4rem;
  word-spacing: 0.5rem;

  color: ${props => (props.color ? props.color : "#ccc")};
  text-shadow: 0px 4px 0 black;

 &:hover{
  color: black;
  text-shadow: 0px 4px 0 ${props => (props.color ? props.color : "#ccc")};

 
 }

  @font-face {
    font-family: BillabongFont;
    font-style: normal;
    font-weight: normal;
    src: url( '${BillabongFont}') format("woff");
  }
`;

const TxHeading = ({ content, color, path }) => {
  return (
    <H1 color={color}>
      <Link to={path}>{content}</Link>
    </H1>
  );
};

export default TxHeading;

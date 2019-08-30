import React from "react";
import { Form } from "semantic-ui-react";

const TxInput = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <React.Fragment>
      <Form.Input
        
        {...field}
        {...props}
        error={touched[field.name] && errors[field.name]}
      />
    </React.Fragment>
  );
};

export default TxInput;

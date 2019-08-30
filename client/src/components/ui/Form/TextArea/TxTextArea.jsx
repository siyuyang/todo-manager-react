import React from "react";
import { Form } from "semantic-ui-react";

const TxTextArea = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <React.Fragment>
      <Form.TextArea
        icon="search"
        placeholder="Search..."
        {...field}
        {...props}
        error={touched[field.name] && errors[field.name]}
      />
    </React.Fragment>
  );
};

export default TxTextArea;

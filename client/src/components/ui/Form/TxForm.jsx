import React, { useState, Fragment } from "react";
import { Formik, Field } from "formik";
import { Button, Form, Icon } from "semantic-ui-react";
import * as yup from "yup";
import TxInput from "./Input/TxInput";
import TxTextArea from "./TextArea/TxTextArea";

import { connect } from "react-redux";
import { addCard, editCard } from "../../../redux/actions";

const userSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .min(5),

  description: yup
    .string()
    .required()
    .min(5)
    .max(50)
});
function TxForm(props) {
  const { onCancel, dispatch, listName, editData } = props;
  const [formData, setFormData] = useState(editData);

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    setFormData(values);

    editData
      ? dispatch(editCard(listName, { ...values, id: editData.id }))
      : dispatch(addCard(listName, values));
    actions.setSubmitting(false);
    onCancel();
  };
  return (
    <Fragment>
      <Formik
        initialValues={formData}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        {formikProps =>
          !formikProps.isSubmitting ? (
            <Form onSubmit={formikProps.handleSubmit}>
              <Field
                label="Title"
                type="text"
                placeholder="Title"
                name="title"
                value={formikProps.values.title || ""}
                component={TxInput}
              />

              <Field
                label="Description"
                name="description"
                value={formikProps.values.description || ""}
                type="text"
                placeholder="Description"
                component={TxTextArea}
              />

              <Button
                type="submit"
                positive
                animated="vertical"
                disabled={!formikProps.isValid || !formikProps.dirty}
              >
                <Button.Content hidden>Save</Button.Content>
                <Button.Content visible>
                  <Icon name="send" />
                </Button.Content>
              </Button>
              <Button secondary animated="vertical" onClick={onCancel}>
                <Button.Content hidden>Cancel</Button.Content>
                <Button.Content visible>
                  <Icon name="cancel" />
                </Button.Content>
              </Button>
            </Form>
          ) : null
        }
      </Formik>
    </Fragment>
  );
}

export default connect()(TxForm);

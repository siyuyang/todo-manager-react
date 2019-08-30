import React, { useState, useEffect } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import styled from "styled-components";
import TxForm from "../Form/TxForm";

import { deleteCard } from "../../../redux/actions";
import TxLoader from "../Loader/TxLoader";

const Div = styled.div`
  margin: 1em 0 !important;
`;

const TxCard = props => {
  const { cardData, index, listName } = props;
  const [isEditMode, setIsEditMode] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleDelete = (listName, cardId) => {
    props.dispatch(deleteCard(listName, cardId));
  };

  return isEditMode ? (
    <TxForm
      editData={cardData}
      onCancel={() => setIsEditMode(false)}
      listName={listName}
    />
  ) : loading ? (
    <TxLoader showButton />
  ) : (
    <Draggable draggableId={cardData.id} index={Number(index)}>
      {provided => (
        <Div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card fluid>
            <Card.Content>
              <Card.Header>{cardData.title}</Card.Header>
              <Card.Description>{cardData.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                color="violet"
                animated="vertical"
                floated="left"
                onClick={handleEdit}
              >
                <Button.Content hidden>Edit</Button.Content>
                <Button.Content visible>
                  <Icon name="edit" />
                </Button.Content>
              </Button>
              <Button
                color="pink"
                animated="vertical"
                floated="right"
                onClick={() => handleDelete(listName, cardData.id)}
              >
                <Button.Content hidden>Delete</Button.Content>
                <Button.Content visible>
                  <Icon name="trash" />
                </Button.Content>
              </Button>
            </Card.Content>
          </Card>
        </Div>
      )}
    </Draggable>
  );
};

export default connect()(TxCard);

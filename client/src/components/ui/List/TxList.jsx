import React, { useState, useEffect } from "react";
import { Segment, Grid } from "semantic-ui-react";
import TxCard from "../Card/TxCard";
import TxAddCardButton from "../AddCardButton/TxAddCardButton";
import { Droppable } from "react-beautiful-dnd";
import TxLoader from "../Loader/TxLoader";

import styled from "styled-components";

const StyledGridColumn = styled(Grid.Column)`
  background-color: ${props =>
    props["custom-color"] ? props["custom-color"] : "#ccc"} !important;
  padding: 1em;
  border-radius: 1em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  :hover {
    box-shadow: 0 16px 12px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const renderCards = (cards, listName) => {
  return (
    cards &&
    Object.keys(cards).map((cardId, index) => (
      <TxCard
        key={cardId}
        cardData={cards[cardId]}
        cardId={cardId}
        listName={listName}
        index={index}
      />
    ))
  );
};

const TxList = props => {
  const { color, title, cards, listName } = props;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  return loading ? (
    <TxLoader />
  ) : (
    <Droppable droppableId={listName}>
      {provided => (
        <React.Fragment>
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Grid style={{ marginTop: "0" }}>
              <Grid.Row style={{ padding: "1em" }}>
                <StyledGridColumn custom-color={color}>
                  <Segment inverted textAlign="center">
                    {title}
                  </Segment>
                  {renderCards(cards, listName)}
                  {provided.placeholder}
                  {listName === "todo" ? (
                    <TxAddCardButton listName={listName} />
                  ) : null}
                </StyledGridColumn>
              </Grid.Row>
            </Grid>
          </div>
        </React.Fragment>
      )}
    </Droppable>
  );
};

export default TxList;

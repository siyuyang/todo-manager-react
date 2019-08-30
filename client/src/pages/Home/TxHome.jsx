import React from "react";
import { Container, Grid, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import TxHeading from "../../components/ui/Heading/TxHeading";

const Image = styled.img`
  display: inline-block;
  border: 0;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  width: 85%;
`;
const Figure = styled.figure`
  margin: 0;
  padding: 0 10%;
  position: relative;
  text-align: center;
  z-index: 5;
`;
const Div = styled.div`
  height: 100%;
  padding-top: 4%;
  left: 0;
  margin-left: 7%;
  margin-right: 7%;
  padding: 0 7%;
  position: absolute;
  top: 0.5em;
  /* width: 86%; */
  z-index: -1;
`;

const TxHome = () => {
  return (
    <React.Fragment>
      <TxHeading content="Manage Todos" color="#bdbdbd" path="/todo-manager" />
      <Container>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Figure>
                <Image src="./glasses.png" alt="" />
                <Div>
                  <Image alt="" src="./eyes.gif" />
                </Div>
              </Figure>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={6}>
              <Header as="h2" icon>
                <Icon name="tag" />
                Drag and Drop Todos
                <Header.Subheader>
                  Plan smarter, collaborate better and securely manage your
                  daily schedules and preferences
                </Header.Subheader>
              </Header>
              <Link to="/todo-manager">
                <Button size="huge" animated="fade" fluid color="black">
                  <Button.Content visible>
                    <Icon name="arrow right" />
                  </Button.Content>
                  <Button.Content hidden>Todo App</Button.Content>
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default TxHome;

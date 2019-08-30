import React, { Component } from "react";

import { Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import TxList from "../../components/ui/List/TxList";

import { DragDropContext } from "react-beautiful-dnd";

import { reOrder, loadTodoList, updateLists } from "../../redux/actions";
import TxMenu from "../../components/ui/Menu/TxMenu";

class TodoManager extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadTodoList());
  }

  getLists = lists => {
    return (
      lists &&
      Object.keys(lists).map(listName => (
        <Grid.Column key={listName}>
          <TxList listName={listName} {...lists[listName]}></TxList>
        </Grid.Column>
      ))
    );
  };

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) return;
    this.props.dispatch(
      reOrder(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      )
    );

    this.props.dispatch(updateLists(this.props.lists));
  };

  render() {
    const { lists } = this.props;

    return (
      <React.Fragment>
        <TxMenu path="/" />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            <Grid relaxed columns={3} stackable>
              <Grid.Row>{lists && this.getLists(lists.lists)}</Grid.Row>
            </Grid>
          </Container>
        </DragDropContext>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lists: state
});

export default connect(mapStateToProps)(TodoManager);

import React, { Component } from "react";
import styled from "styled-components";
import Letter from "./letter";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const List = styled.div`
  padding: 8px;
`;

export default class Column extends Component {
  render() {
    console.log("this.props");
    console.log(this.props);
    return (
      <Container>
        <Title>this.props.column.title;</Title>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <List 
            ref={provided.innerRef}
            // innerRef={provided.innerRef} 
            {...provided.droppableProps}>

              {this.props.content.map((el, index) => (
                <Letter key={el.id} index={index} letter={el} />
              ))}

              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Container>
    );
  }
}

import React, { Component } from "react";
import styled from "styled-components";
import Letter from "./letter";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 200px;
 
`;
const Title = styled.h3`
  padding: 8px;
`;
const List = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.Component {
  
  shouldComponentUpdate(nextProps){
    if (nextProps.content === this.props.content) return false;
    else return true;
  }
  
  render () {
    return this.props.content.map((el, index) => (
      <Letter key={el.id} index={index} solved={this.props.solved} isDraggingDisabled={this.props.solved} letter={el} />
    ));
  }
}

export default class Column extends Component {

  render() {
    return (
      <Container
      className={this.props.column.solved ? 'solved' : 'unsolved'}
      >

        <Title>{this.props.column.title}</Title>
        <Droppable 
        droppableId={this.props.column.id}
        isDropDisabled = { this.props.column.solved }

        
        >
          {(provided, snapshot) => (
            <List 
            ref={provided.innerRef}
            // innerRef={provided.innerRef} 
            {...provided.droppableProps}>

              <InnerList content={this.props.content} solved={this.props.solved}/>
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Container>
    );
  }
}

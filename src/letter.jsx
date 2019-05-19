import React, { Component } from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 5px;
padding: 8px;
margin-bottom: 8px;
text-align: center;
background-color: ${ props => 
  props.solved ?
  'lightgreen' :
  props.isDragging 
  ? 'white' 
  : 'lightblue'};

`;

export default class task extends Component {
  render() {
    const isDragDisable = this.props.solved;

    return (
      <Draggable 
      draggableId={this.props.letter.id} 
      index={this.props.index}
      isDragDisabled={isDragDisable}
      >
      {(provided, snapshot) => (
        // snapshot.isDragging  // isDraggingOver
        <Container

        className = {this.props.solved ? "solved-letter" : "unsolved-letter"}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        // innerRef={provided.innerRef}
        isDragging={snapshot.isDragging}
        >
        <p> {this.props.letter.content}</p>
      </Container>
      )}
      </Draggable>
    )
  }
}

import React, { Component } from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
background-color: ${props => 
  props.isDragDisabled ?
  'lightgreen' :
  props.isDragging 
  ? 'white' 
  : 'lightblue'};

`;

export default class task extends Component {
  render() {
    // console.log(this.props)
    const isDragDisable = this.props.letter.correct;
    return (
      <Draggable 
      draggableId={this.props.letter.id} 
      index={this.props.index}
      isDragDisabled={isDragDisable}
      >
      {(provided, snapshot) => (
        // snapshot.isDragging  // isDraggingOver
        <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        // innerRef={provided.innerRef}
        isDragging={snapshot.isDragging}
        >
        {this.props.letter.content}
      </Container>
      )}
      </Draggable>
    )
  }
}

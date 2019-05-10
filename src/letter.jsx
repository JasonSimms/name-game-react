import React, { Component } from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
background: blue;

`;

export default class task extends Component {
  render() {
    // console.log(this.props)
    return (
      <Draggable draggableId={this.props.letter.id} index={this.props.index}>
      {(provided) => (
        <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        // innerRef={provided.innerRef}
        >
        {this.props.letter.content}
      </Container>
      )}
      </Draggable>
    )
  }
}

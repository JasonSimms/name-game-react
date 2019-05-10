import { DragDropContext} from "react-beautiful-dnd";

import React, { Component } from "react";

import Column from "./Column";

const initialData = {
  // letters : [ 'J' , 'O', "H", 'N' , 'D', 'O', 'E'],
  letters: {
    J: { id: "J", content: "J" },
    O: { id: "O", content: "O" },
    H: { id: "H", content: "H" },
    N: { id: "N", content: "N" },
    D: { id: "D", content: "D" },
    O2: { id: "O2", content: "O" },
    E: { id: "E", content: "E" },
    "#": { id: "#", content: "#" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Letter Bank",
      contentIds: ["J", "O", "H", "N", "D", "O2", "E"]
    }
  },

  columnOrder: ["column-1"]
};

export default class gameField extends Component {
  state = initialData;

  onDragEnd = result => {
    // console.log( result)
    // console.error(this.state)
    const { destination , source, draggableId } = result;

    if (!destination){ return ;}

    if(
      destination.droppableId === source.droppableId && destination.index === source.index
    ) { return; }

    const column = this.state.columns[source.droppableId];

    const newLetterIds = Array.from(column.contentIds);
    newLetterIds.splice(source.index, 1);
    
    newLetterIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      contentIds: newLetterIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id] : newColumn,
      }
    }

    this.setState(newState);
  }

  render() {
    return (
      <DragDropContext
      // onDragStart
      // onDragUpdate
      onDragEnd = {this.onDragEnd}
      
      >
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const myLetters = column.contentIds.map(el => this.state.letters[el]);

          return (
            <Column key={column.title} column={column} content={myLetters} />
          );
        })}
        ;
      </DragDropContext>
    );
  }
}

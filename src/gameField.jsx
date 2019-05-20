import { DragDropContext } from "react-beautiful-dnd";

import React, { Component } from "react";

import Column from "./Column";
import GameOver from "./GameOver";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  font-family: "Pacifico", cursive, "Helvetica Neue", sans-serif;
`;

const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const checkWin = state => {
  if (
    state["column-4"].solved &&
    state["column-3"].solved &&
    state["column-2"].solved
  )
    return true;
  else return false;
};

// BUILD LETTERS FOR LETTER BANK FROM A NAME
let name = "BENNETTNICHOLASSIMMS";
name = name.split("");
let letters = {};
let bank = [];
name.forEach((el, index) => {
  let id = el.concat(index);
  bank.push(id);
  letters[id] = { id, content: el };
});

let initialData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "Letter Bank",
      contentIds: shuffle(bank),
      solved: false
    },

    "column-2": {
      id: "column-2",
      title: "First",
      contentIds: [],
      solved: false
    },
    "column-3": {
      id: "column-3",
      title: "Middle",
      contentIds: [],
      solved: false
    },
    "column-4": {
      id: "column-4",
      title: "Last",
      contentIds: [],
      solved: false
    }
  },
  letterBank: ["column-1"],
  columnOrder: ["column-2", "column-3", "column-4"],
  win: false
};

initialData.letters = letters;

export default class gameField extends Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newLetterIds = Array.from(start.contentIds);
      newLetterIds.splice(source.index, 1);

      newLetterIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        contentIds: newLetterIds
      };

      let newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      let names = ["column-2", "column-3", "column-4"];

      names.forEach(col => {
        if (newState.columns[col].contentIds.length > 1)
          newState.columns[col].guess = newState.columns[col].contentIds
            .join("")
            .replace(/[0-9]/g, "");
        if (col === "column-2" && newState.columns[col].guess === "BENNETT")
          newState.columns[col].solved = true;

        if (col === "column-3" && newState.columns[col].guess === "NICHOLAS")
          newState.columns[col].solved = true;

        if (col === "column-4" && newState.columns[col].guess === "SIMMS")
          newState.columns[col].solved = true;
      });

      newState.win = checkWin(newState.columns);

      this.setState(newState);
      return;
    }

    // move one column to another

    const newLetterIds = Array.from(start.contentIds);
    newLetterIds.splice(source.index, 1);

    const newStart = {
      ...start,
      contentIds: newLetterIds
    };

    const finishLetterIds = Array.from(finish.contentIds);
    finishLetterIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      contentIds: finishLetterIds
    };

    let newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    let names = ["column-2", "column-3", "column-4"];
    names.forEach(col => {
      if (newState.columns[col].contentIds.length > 1)
        newState.columns[col].guess = newState.columns[col].contentIds
          .join("")
          .replace(/[0-9]/g, "");
      if (col === "column-2" && newState.columns[col].guess === "BENNETT")
        newState.columns[col].solved = true;
      if (col === "column-3" && newState.columns[col].guess === "NICHOLAS")
        newState.columns[col].solved = true;
      if (col === "column-4" && newState.columns[col].guess === "SIMMS")
        newState.columns[col].solved = true;
    });

    newState.win = checkWin(newState.columns);

    this.setState(newState);
  };

  render() {
    if(this.state.win) return <GameOver />
    else return ( 
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={this.onDragEnd}
      >
        <Container>
          <div className="column">
            {this.state.letterBank.map(columnId => {
              const column = this.state.columns[columnId];
              const myLetters = column.contentIds.map(
                el => this.state.letters[el]
              );

              return (
                <Column
                  key={column.title}
                  title={column.title}
                  column={column}
                  content={myLetters}
                />
              );
            })}
          </div>
          <div className="column">
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId];
              const myLetters = column.contentIds.map(
                el => this.state.letters[el]
              );

              return (
                <Column
                  className="row"
                  key={column.title}
                  title={column.title}
                  column={column}
                  content={myLetters}
                  // isDragDisabled ={ true}
                  solved={column.solved}
                />
              );
            })}
          </div>
        </Container>
      </DragDropContext>
    );
  }
}

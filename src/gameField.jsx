import { DragDropContext } from "react-beautiful-dnd";

import React, { Component } from "react";

import Column from "./Column";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
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
  // letters: {
  //   J: { id: "J", content: "J" },
  //   O: { id: "O", content: "O" },
  //   H: { id: "H", content: "H" },
  //   N: { id: "N", content: "N" },
  //   D: { id: "D", content: "D" },
  //   O2: { id: "O2", content: "O" },
  //   E: { id: "E", content: "E" }
  // },

  columns: {
    "column-1": {
      id: "column-1",
      title: "Letter Bank",
      contentIds: shuffle(bank)
    },

  solved: {
    first: false,
    second : false,
    third: false,

  }
    // "column-2": {
    //   id: "column-2",
    //   title: "First",
    //   contentIds: []
    // },
    // "column-3": {
    //   id: "column-2",
    //   title: "Middle",
    //   contentIds: []
    // },
    // "column-4": {
    //   id: "column-2",
    //   title: "Last",
    //   contentIds: []
    // },
  },

  columnOrder: [
    "column-1"
    // ,
    // "column-2", "column-3", "column-4"
  ]
};

initialData.letters = letters;
console.log(initialData.letters);

export default class gameField extends Component {
  state = initialData;

  onDragEnd = result => {
    // console.log( result)
    // console.error(this.state)
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

      let guess = newLetterIds.map(el => {
        return el.content;
      });

      const newColumn = {
        ...start,
        contentIds: newLetterIds,
        guess
      };

      //CHECK COLUMN FOR GUESSES
      var guessName = newColumn.contentIds.join("").replace(/[0-9]/g, "");
      console.log(guessName, guessName.includes("BENNETT"),guessName.includes("NICHOLAS"),guessName.includes("SIMMS") );
      
      let solved = this.state.solved

      if (
        guessName.includes("BENNETT") ||
        guessName.includes("NICHOLAS") ||
        guessName.includes("SIMMS")
      ) {
        console.log("bingo");
        let pos = 0;
        let length = 0;
        

        const removeName = () => {
          newColumn.contentIds.splice(pos, length);
        };

        if (guessName.includes("BENNETT")) {
        console.log("BENNETT");

          length = 7;
          pos = guessName.indexOf("BENNETT");
          removeName();
          solved.first = true;
        }

        if (guessName.includes("NICHOLAS")) {
          length = 8;
          pos = guessName.indexOf("NICHOLAS");
          removeName();
          solved.second = true;
        }

        if (guessName.includes("SIMMS")) {
          length = 5;
          pos = guessName.indexOf("SIMMS");
          removeName();
          solved.third = true;
        }

        // newColumn.contentIds.splice(newColumn.contentIds.indexOf("J"), 4);
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        },
        solved 
      
      };

      this.setState(newState);
      return;
    }

    // move one column to another

    // const newLetterIds = Array.from(start.contentIds);
    // newLetterIds.splice(source.index, 1)

    //   const newStart = {
    //     ...start,
    //     taskIds: newLetterIds,
    //   };

    //   const finishLetterIds = Array.from(finish.contentIds);
    //   finishLetterIds.splice(destination.index, 0 , draggableId);
    //   const newFinish = {
    //     ...finish,
    //     taskIds: finishLetterIds,
    //   };

    //   const newState= {
    //     ...this.state,
    //     columns: {
    //       ...this.state.columns,
    //       [newStart.id]: newStart,
    //       [newFinish.id]: newFinish,
    //     }
    //   };
    //   this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map(columnId => {
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
          ;
        </Container>
      </DragDropContext>
    );
  }
}

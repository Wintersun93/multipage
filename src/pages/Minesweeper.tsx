import React from "react";
import "./home.scss";
import { useReducer, useState } from "react";

type Cell = {
  id: number;
  mine: boolean;
  revealed: boolean;
  neighbors?: number;
  row: number;
  col: number;
};

type Action = {
  type: string;
  payload: {
    id: number;
    mine: boolean;
    revealed: boolean;
    neighbors?: number;
    row?: number;
    col?: number;
    counter?: number;
  };
};

export const ACTIONS = {
  REVEAL_FIELD: "reveal-field",
  RESET_FIELD: "reset-field",
  INIT_FIELD: "init_field"
};

const reducer = (cells: Cell[][], action: Action): any => {
  switch (action.type) {
    case ACTIONS.REVEAL_FIELD:
      return cells.map((rows) =>
        rows.map((cell) => {
          if (cell.id === action.payload.id) {
            if (cell.neighbors === 0) {
              revealNeighbors(cells, cell.row, cell.col);
              return { ...cell, revealed: true };
            }
            if (cell.mine) {
              gameOver(cells, cell);
            }
            return { ...cell, revealed: true };
          }
          return cell;
        })
      );
    case ACTIONS.RESET_FIELD:
      return cells.map((rows) =>
        rows.map((cell) => {
          return { ...cell, revealed: false, mine: Math.random() < 0.8 ? false : true }
        })
      )
    case ACTIONS.INIT_FIELD:
      return cells.map((rows) =>
        rows.map((cell) => {
          return { ...cell, mine: Math.random() < 0.8 ? false : true }
        })
      )
  };
}
const gameOver = (cells: Cell[][], cell: Cell) => {
  
  cells.map((row) => row.map((cell) => cell.revealed = true))
};

const revealNeighbors = (grid: Cell[][], row: number, col: number) => {
  if (grid[row][col].mine) {
    return -1;
  }
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let checkRow = row + xoff;
      let checkCol = col + yoff;
      if (
        checkRow > -1 &&
        checkRow < grid.length &&
        checkCol > -1 &&
        checkCol < grid.length
      )
        if (
          !grid[checkRow][checkCol].mine &&
          grid[checkRow][checkCol].revealed === false
        ) {
          grid[checkRow][checkCol].revealed = true;
          if (grid[checkRow][checkCol].neighbors === 0) {
            revealNeighbors(grid, checkRow, checkCol);
          }
        }
    }
  }
};

const createField = (rows: number, cols: number): Cell[][] => {
  let grid: Cell[][] = new Array(rows);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(cols);
  }
  return grid;
};

const populateField = (): Cell[][] => {
  let grid: Cell[][] = createField(10, 10);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      grid[row][col] = {
        id: Date.now() + Math.random() * 10,
        mine: Math.random() < 0.8 ? false : true,
        revealed: false,
        row: row,
        col: col,
      };
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      grid[row][col].neighbors = countNeighbors(grid, row, col);
    }
  }
  return grid;
};

const countNeighbors = (grid: Cell[][], row: number, col: number): number => {
  let neighbors: number = 0;
  if (grid[row][col].mine) {
    return -1;
  }
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let checkRow = row + xoff;
      let checkCol = col + yoff;
      if (
        checkRow > -1 &&
        checkRow < grid.length &&
        checkCol > -1 &&
        checkCol < grid.length
      )
        if (grid[checkRow][checkCol].mine) {
          neighbors++;
        }
    }
  }
  return neighbors;
};

const Minesweeper: React.FC = () => {
  const [grids, dispatch] = useReducer(reducer, populateField());
  const [timer, settimer] = useState<string>("00:00")
  const [counter, setCounter] = useState<number>(0)
  return (
    <>
      <div className="reset" onClick={() => dispatch({ type: ACTIONS.RESET_FIELD, payload: { id: 1, mine: false, revealed: false } })}>
        <button>Reset</button>
      </div>
      <div className="timer">{timer} , {counter}</div>
      <div className="MinesweeperField">
        {grids.map((row: Cell[]) =>
          row.map((cell: Cell) => (
            <div
              key={cell.id}
              className="Cell"
              style={{ background: cell.revealed === false ? "grey" : "" }}
              onClick={() => {
                dispatch({
                  type: ACTIONS.REVEAL_FIELD,
                  payload: {
                    id: cell.id,
                    mine: cell.mine,
                    revealed: cell.revealed,
                    counter: counter,
                  },
                })
                setCounter(counter + 1)
              }

              }

            >
              {cell.mine ? (
                <span className="circle cat"></span>
              ) : (
                <span className="neighborText">
                  {cell.neighbors ? cell.neighbors > 0 ? cell.neighbors : "" : ""}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Minesweeper;

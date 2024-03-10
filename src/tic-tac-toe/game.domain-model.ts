export namespace GameDomainModel {
  export enum Square {
    X = "X",
    O = "O",
    Empty = "",
  }

  export type Squares = [
    Square,
    Square,
    Square,
    Square,
    Square,
    Square,
    Square,
    Square,
    Square
  ];

  export type Board = {
    squares: Squares;
  };

  export type Player = Square.X | Square.O;

  export type Winner = Player | null | "draw";

  export type GameState = {
    winner: Winner;
    history: Squares[];
    xIsNext: boolean;
    step: number;
  };
}

import { Entity } from "../../common/entity";
import { GameDomainModel } from "../game.domain-model";

export class Board extends Entity<GameDomainModel.Board> {
  get squares() {
    return this._data.squares;
  }

  getStep() {
    return this.squares.filter((square) => !!square).length;
  }

  xIsNext() {
    return this.getStep() % 2 === 0;
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a] as GameDomainModel.Player;
      }
    }

    if (this.squares.every((square) => !!square)) return "draw" as const;

    return null;
  }
}

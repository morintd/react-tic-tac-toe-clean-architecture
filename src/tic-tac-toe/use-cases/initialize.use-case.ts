import { GameDomainModel } from "../game.domain-model";
import { Executable } from "../../common/use-case";
import { Board } from "../entities/board.entity";
import { IBoardRepository } from "../ports/board-repository.port";

export type Input = void;

export type Output = {
  winner: GameDomainModel.Winner;
  history: GameDomainModel.Squares[];
  xIsNext: boolean;
  step: number;
};

export class Initialize implements Executable<Input, Output> {
  constructor(private boardRepository: IBoardRepository) {}

  async execute() {
    const history = await this.boardRepository.findHistory();

    if (history.length > 0) {
      const board = history[history.length - 1];

      return {
        winner: board.calculateWinner(),
        history: history.map((board) => board.squares),
        xIsNext: board.xIsNext(),
        step: board.getStep(),
      };
    }

    const board = this.getInitialBoard();
    this.boardRepository.setHistory([board]);

    return {
      winner: board.calculateWinner(),
      history: [board.squares],
      xIsNext: board.xIsNext(),
      step: 0,
    };
  }

  getInitialBoard() {
    return new Board({
      squares: [
        GameDomainModel.Square.Empty,
        GameDomainModel.Square.Empty,
        GameDomainModel.Square.Empty,
        GameDomainModel.Square.Empty,
        GameDomainModel.Square.Empty,
        GameDomainModel.Square.Empty,
        GameDomainModel.Square.Empty,
        GameDomainModel.Square.Empty,
        GameDomainModel.Square.Empty,
      ],
    });
  }
}

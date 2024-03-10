import { Executable } from "../../common/use-case";
import { Board } from "../entities/board.entity";
import { CellAlreadyTakenException } from "../exceptions/cell-already-taken.exception";
import { StepDoesNotExistException } from "../exceptions/step-does-not-exist.exception";
import { GameDomainModel } from "../game.domain-model";
import { IBoardRepository } from "../ports/board-repository.port";

export type Input = {
  square: number;
  step: number;
};

export type Output = {
  winner: GameDomainModel.Winner;
  history: GameDomainModel.Squares[];
  xIsNext: boolean;
  step: number;
};

export class Play implements Executable<Input, Output> {
  constructor(private boardRepository: IBoardRepository) {}

  async execute(input: Input) {
    const { square, step } = input;
    const history = await this.boardRepository.findHistory();
    const currentBoard = history[step];

    if (!currentBoard) {
      throw new StepDoesNotExistException();
    }

    const xIsNext = currentBoard.xIsNext();
    const winner = currentBoard.calculateWinner();

    if (winner) {
      return {
        winner,
        history: history.map((board) => board.squares),
        xIsNext,
        step,
      };
    }

    if (currentBoard.squares[square]) {
      throw new CellAlreadyTakenException();
    }

    const board = new Board({
      squares: currentBoard.squares.slice() as GameDomainModel.Squares,
    });

    if (xIsNext) {
      board.squares[square] = GameDomainModel.Square.X;
    } else {
      board.squares[square] = GameDomainModel.Square.O;
    }

    this.boardRepository.setHistory([...history.slice(0, step + 1), board]);

    return {
      history: [
        ...history.slice(0, step + 1).map((board) => board.squares),
        board.squares,
      ],
      winner: board.calculateWinner(),
      xIsNext: board.xIsNext(),
      step: step + 1,
    };
  }
}

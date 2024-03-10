import { GameDomainModel } from "../game.domain-model";
import { Executable } from "../../common/use-case";
import { StepDoesNotExistException } from "../exceptions/step-does-not-exist.exception";
import { IBoardRepository } from "../ports/board-repository.port";

type Input = {
  step: number;
};

type Output = {
  winner: GameDomainModel.Winner;
  history: GameDomainModel.Squares[];
  xIsNext: boolean;
  step: number;
};

export class JumpTo implements Executable<Input, Output> {
  constructor(private boardRepository: IBoardRepository) {}

  async execute({ step }: Input) {
    const history = await this.boardRepository.findHistory();
    const board = history[step];

    if (!board) {
      throw new StepDoesNotExistException();
    }

    return {
      history: history.map((board) => board.squares),
      winner: board.calculateWinner(),
      xIsNext: board.xIsNext(),
      step,
    };
  }
}

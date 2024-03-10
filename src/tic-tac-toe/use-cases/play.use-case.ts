import { Executable } from "../../common/use-case";
import { GameDomainModel } from "../game.domain-model";

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
  async execute(input: Input) {}
}

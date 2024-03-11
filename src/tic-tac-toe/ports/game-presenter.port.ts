import { IPresenter } from "../../common/presenter";
import { GameDomainModel } from "../game.domain-model";

export type Input = {
  history: GameDomainModel.Squares[];
  winner: GameDomainModel.Winner;
  xIsNext: boolean;
  step: number;
};

export type Output = {
  moves: Array<{ move: number; description: string }>;
  status: string;
  squares: GameDomainModel.Squares;
};

export interface IGamePresenter extends IPresenter<Input, Output> {}

import { GameDomainModel } from "../game.domain-model";
import { Board } from "../entities/board.entity";
import { IBoardRepository } from "../ports/board-repository.port";

export class InMemoryBoardRepository implements IBoardRepository {
  private history: GameDomainModel.Squares[] = [];

  findHistory() {
    return Promise.resolve(
      this.history.map((squares) => new Board({ squares }))
    );
  }

  async setHistory(boards: Board[]) {
    this.history = boards.map((board) => board.squares);
  }
}

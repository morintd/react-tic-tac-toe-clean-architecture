import { Board } from "../entities/board.entity";

export interface IBoardRepository {
  findHistory(): Promise<Board[]>;
  setHistory(boards: Board[]): Promise<void>;
}

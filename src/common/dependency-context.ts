import { createContext, useContext } from "react";
import { type IBoardRepository } from "../tic-tac-toe/ports/board-repository.port";

type ContextType = {
  board: IBoardRepository;
};

export const DependencyContext = createContext<ContextType>({} as ContextType);

export const useDependencyContext = () => useContext(DependencyContext);

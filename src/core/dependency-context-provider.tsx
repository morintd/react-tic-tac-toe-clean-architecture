import { ReactNode } from "react";

import { DependencyContext } from "../common/dependency-context";
import { InMemoryBoardRepository } from "../tic-tac-toe/adapters/in-memory-board.repository";

type Props = {
  children: ReactNode;
};

const board = new InMemoryBoardRepository();

export function DependencyContextProvider(props: Props) {
  const { children } = props;

  return (
    <DependencyContext.Provider value={{ board }}>
      {children}
    </DependencyContext.Provider>
  );
}

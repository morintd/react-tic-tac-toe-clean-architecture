import { useQuery } from "@tanstack/react-query";
import { useDependencyContext } from "../common/dependency-context";
import { useMemo } from "react";
import { GameDomainModel } from "./game.domain-model";
import { Initialize } from "./use-cases/initialize.use-case";

export function useInitializeQuery() {
  const dependencies = useDependencyContext();

  const initialize = useMemo(() => {
    return new Initialize(dependencies.board);
  }, [dependencies.board]);

  const query = useQuery<GameDomainModel.GameState>({
    queryKey: ["initialize"],
    queryFn: () => initialize.execute(),
  });

  return {
    data: query.data,
    error: query.error,
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
}

export function useHomeController() {
  const initialize = useInitializeQuery();

  return {
    initialize,
  };
}

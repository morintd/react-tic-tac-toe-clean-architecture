import { useCallback, useMemo, useState } from "react";
import { GameDomainModel } from "./game.domain-model";
import { JumpTo } from "./use-cases/jump-to.use-case";
import { Play } from "./use-cases/play.use-case";
import { useDependencyContext } from "../common/dependency-context";
import { IGamePresenter } from "./ports/game-presenter.port";
import { useMutation } from "@tanstack/react-query";

export function useJumpToMutation(
  onSuccess: (game: GameDomainModel.GameState) => void
) {
  const dependencies = useDependencyContext();

  const jumpTo = useMemo(() => {
    return new JumpTo(dependencies.board);
  }, [dependencies.board]);

  const mutation = useMutation({
    mutationKey: ["jumpTo"],
    mutationFn: (step: number) => jumpTo.execute({ step }),
    onSuccess,
  });

  return {
    data: mutation.data,
    error: mutation.error,
    isPending: mutation.isPending,
    isError: mutation.isError,
    mutate: mutation.mutate,
  };
}

export function usePlayMutation(
  onSuccess: (game: GameDomainModel.GameState) => void
) {
  const dependencies = useDependencyContext();

  const play = useMemo(() => {
    return new Play(dependencies.board);
  }, [dependencies.board]);

  const mutation = useMutation({
    mutationKey: ["play"],
    mutationFn: ({ step, square }: { step: number; square: number }) =>
      play.execute({ step, square }),
    onSuccess,
  });

  return {
    data: mutation.data,
    error: mutation.error,
    isPending: mutation.isPending,
    isError: mutation.isError,
    mutate: mutation.mutate,
  };
}

export function useGameController(
  defaultGame: GameDomainModel.GameState,
  presenter: IGamePresenter
) {
  const [currentGame, setCurrentGame] =
    useState<GameDomainModel.GameState>(defaultGame);

  const jumpTo = useJumpToMutation((game) => setCurrentGame(game));
  const play = usePlayMutation((game) => setCurrentGame(game));

  const { moves, status, squares } = useMemo(() => {
    return presenter.format({
      history: currentGame.history,
      winner: currentGame.winner,
      xIsNext: currentGame.xIsNext,
      step: currentGame.step,
    });
  }, [currentGame, presenter]);

  const onPlay = useCallback(
    (square: number) => {
      play.mutate({ step: currentGame.step, square });
    },
    [currentGame.step, play]
  );

  const onJumpTo = useCallback(
    (step: number) => {
      jumpTo.mutate(step);
    },
    [jumpTo]
  );

  return {
    moves,
    status,
    squares,
    onPlay,
    onJumpTo,
  };
}

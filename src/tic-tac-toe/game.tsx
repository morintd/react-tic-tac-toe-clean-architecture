import { GameDomainModel } from "./game.domain-model";
import { Board } from "./components";
import { useGameController } from "./game-controller";
import "./app.css";
import { GamePresenter } from "./adapters/game.presenter";

type Props = {
  game: GameDomainModel.GameState;
};

const presenter = new GamePresenter();

export function Game(props: Props) {
  const { game } = props;
  const controller = useGameController(game, presenter);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={controller.squares}
          onClick={controller.onPlay}
          status={controller.status}
        />
      </div>
      <div className="game-info">
        <ol>
          {controller.moves.map(({ move, description }) => (
            <li key={move}>
              <button onClick={() => controller.onJumpTo(move)}>
                {description}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

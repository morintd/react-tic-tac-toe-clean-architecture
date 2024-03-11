import { Game } from "./game";
import { useHomeController } from "./home-controller";

export function Home() {
  const controller = useHomeController();

  if (controller.initialize.isPending) {
    return <div>Loading</div>;
  }

  if (controller.initialize.isSuccess) {
    return <Game game={controller.initialize.data!} />;
  }
}

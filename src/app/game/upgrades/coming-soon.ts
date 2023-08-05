import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class ComingSoon extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "ComingSoon", -1, 0);
  }

  override buyUpgrade(): boolean {
    return false;
  }
}

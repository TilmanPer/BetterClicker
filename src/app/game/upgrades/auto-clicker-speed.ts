import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class AutoClickerSpeed extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Faster Workers", 10000, 0);
    effect(() => {
      super.description = `Increases the speed which Auto Clickers operate by 5%.
    (${(1 / (1 + (gameService._autoClickerSpeed()) / 100)).toFixed(2) }/s → ${(1 / (1 + (gameService._autoClickerSpeed() + 5) /100)).toFixed(2)}/s)`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._autoClickerSpeed.update(value => value + 5);
    return true;
  }
}

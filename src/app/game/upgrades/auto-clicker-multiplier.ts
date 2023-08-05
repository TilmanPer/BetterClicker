import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class AutoClickerMultiplier extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Robot Factory", 10000000, 0);
    effect(() => {
      super.description = `Increases the multiplier of Auto Clickers by 1.
    (${this.gameService._autoClickerMultiplier()} → ${this.gameService._autoClickerMultiplier() + 1})`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._autoClickerMultiplier.update(value => value + 1);
    return true;
  }
}

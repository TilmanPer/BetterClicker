import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class ClickMultiplier extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Harder Hits", 100, 0);
    effect(() => {
      super.description = `Increases the multiplier of cookies per click by 0.1. (${this.gameService._clickMultiplier().toFixed(1)} → ${(this.gameService._clickMultiplier() + 0.1).toFixed(1)})`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._clickMultiplier.update(value => value + 0.1);
    return true;
  }
}

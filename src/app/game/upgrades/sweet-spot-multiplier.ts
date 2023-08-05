import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class SweetSpotMultiplier extends Upgrade {
  constructor(gameService: GameService) {
    super(gameService, "Bigger Chips", 1000000, 0);
    this.purchased = 1;
    effect(() => {
      super.description = `Increases the sweet spot multiplier by 5. (${gameService._sweetSpotMultiplier()} → ${gameService._sweetSpotMultiplier() + 5})`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._sweetSpotMultiplier.update(value => value + 5);
    return true;
  }
}

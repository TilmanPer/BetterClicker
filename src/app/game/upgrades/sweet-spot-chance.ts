import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class SweetSpotChance extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Chocolate Chip", 100000, 0);
    this.purchased = 1;
    effect(() => {
      super.description = `Increases the sweet spot chance by 1% per purchase. (${this.gameService._sweetSpotChance()}% → ${this.gameService._sweetSpotChance() + 1}%)`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._sweetSpotChance.update(value => value + 1);
    return true;
  }
}

import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class DecreaseComboDecay extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Combo Decay", 45000000, 0);
    effect(() => {
      super.description = `Decreases the combo decay by 3%. (${(this.gameService._comboDecay()).toFixed(2)}/s → ${(this.gameService._comboDecay() * 0.99).toFixed(2)}/s)`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._comboDecay.update(value => value * 0.97);
    return true;
  }
}

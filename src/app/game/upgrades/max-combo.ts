import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class MaxCombo extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Combo Maximum", 35000000, 0);
    effect(() => {
      super.description = `Increases the maximum combo by 1. (${this.gameService._maxCombo()} → ${this.gameService._maxCombo() + 1})`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._maxCombo.update(value => value + 1);
    return true;
  }
}

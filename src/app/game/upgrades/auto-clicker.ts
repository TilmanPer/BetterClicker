import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";
import { PopUp } from "src/app/popup/popup";

export class AutoClicker extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Auto Clicker", 1000, 0);
    effect(() => {
      super.description = `Increases the amount of Auto Clickers by ${1 * this.gameService._autoClickerMultiplier()}.
    (${this.gameService._autoClickers()} → ${this.gameService._autoClickers() + 1 * this.gameService._autoClickerMultiplier()})`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._autoClickers.update(value => value + 1);
    return true;
  }
}

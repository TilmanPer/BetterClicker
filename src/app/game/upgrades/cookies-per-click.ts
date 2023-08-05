import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";

export class CookiesPerClick extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Crumbles", 10, 0);
    this.purchased = 1;
    effect(() => {
      super.description = `Increases the amount of cookies you get per click by ${this.gameService._comboMultiplier()}. (${this.gameService._currentCookiesPerClick()} → ${this.gameService._currentCookiesPerClick() + this.gameService._comboMultiplier()})`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._cookiesPerClick.update(value => value + 1);
    return true;
  }
}

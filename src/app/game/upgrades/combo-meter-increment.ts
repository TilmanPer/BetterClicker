import { effect } from "@angular/core";
import { GameService } from "src/app/_shared/services/game.service";
import { Upgrade } from "./upgrade";
import { PopUp } from "src/app/popup/popup";
import { comboPopUp } from "src/app/popup/popups";

export class ComboMeterIncrement extends Upgrade {

  constructor(gameService: GameService) {
    super(gameService, "Combo Per Click", 30000000, 0, comboPopUp);
    effect(() => {
      super.description = `Increases how much you fill the Combo Meter per click by 0.01. (${this.gameService._comboMeterIncrement().toFixed(2)} → ${(this.gameService._comboMeterIncrement() + 0.01).toFixed(2)})`;
    });
  }

  override buyUpgrade(): boolean {
    if (!super.buyUpgrade()) return false;
    this.gameService._comboMeterIncrement.update(value => value + 0.01);
    return true;
  }
}

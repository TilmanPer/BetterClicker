import { GameService } from "src/app/_shared/services/game.service";
import { PopUp } from "src/app/popup/popup";

export abstract class Upgrade {
  public name: string;
  public cost: number;
  public purchased: number;
  public description: string | undefined;
  public popUpContent: PopUp | undefined;
  public showPopUp: boolean = false;

  constructor(public gameService: GameService, name: string, cost: number, purchased: number, popUpContent?: PopUp) {
    this.name = name;
    this.cost = cost;
    this.purchased = purchased;
    this.popUpContent = popUpContent;
  }

  buyUpgrade() {

    if (this.cost > this.gameService._cookies()) return false;
    this.gameService._cookies.update(value => value - this.cost);
    this.purchased++;
    this.cost = this.cost * 1.15;
    this.popUpConditions();
    return true;
  }

  popUpConditions() {
    this.showPopUp = this.purchased == 1;
  }
}


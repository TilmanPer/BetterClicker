import { Component, effect } from '@angular/core';
import { PopUp } from 'src/app/popup/popup';
import { comboPopUp } from 'src/app/popup/popups';
import { GameService } from 'src/app/_shared/services/game.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent {
  public comboPopUp: PopUp = comboPopUp;
  comboMeter = this.gameService._comboMeter();
  comboMultiplier = this.gameService._comboMultiplier();
  clicksPerSecond = this.gameService._clicksPerSecond();
  showComboInfo = false;

  constructor(private gameService: GameService) {
    effect(() => {
      this.comboMeter = this.gameService._comboMeter();
      this.comboMultiplier = this.gameService._comboMultiplier();
      this.clicksPerSecond = this.gameService._clicksPerSecond();
      this.comboMeter = this.comboMeter < 0 ? 0 : this.comboMeter;
    });
  }

  checkComboMeter(comboMeter: number) {
    if (comboMeter >= 100) this.increaseComboMultiplier(1);
    if (comboMeter <= 0) this.resetComboMeter();
  }

  increaseComboMultiplier(amount: number) {
    this.gameService.modifyComboMultiplier(amount);
    this.gameService.modifyComboMeter(-85);
  }

  resetComboMeter() {
    this.gameService.modifyComboMeter(-100);
  }
}

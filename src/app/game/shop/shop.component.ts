import { Component, effect, signal } from '@angular/core';
import { GameService } from 'src/app/_shared/services/game.service';
import { AutoClicker } from '../upgrades/auto-clicker';
import { AutoClickerMultiplier } from '../upgrades/auto-clicker-multiplier';
import { AutoClickerSpeed } from '../upgrades/auto-clicker-speed';
import { ClickMultiplier } from '../upgrades/click-multiplier';
import { ComboMeterIncrement } from '../upgrades/combo-meter-increment';
import { ComingSoon } from '../upgrades/coming-soon';
import { CookiesPerClick } from '../upgrades/cookies-per-click';
import { DecreaseComboDecay } from '../upgrades/decrease-combo-decay';
import { MaxCombo } from '../upgrades/max-combo';
import { SweetSpotChance } from '../upgrades/sweet-spot-chance';
import { SweetSpotMultiplier } from '../upgrades/sweet-spot-multiplier';
import { Upgrade } from '../upgrades/upgrade';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent {

  constructor(public gameService: GameService) {
  }

  triggerComboInfo() {
  }

  ngOnInit(): void {
  }
}

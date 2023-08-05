import { Component, computed, effect, signal } from '@angular/core';
import { GameService } from 'src/app/_shared/services/game.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  constructor(public gameService: GameService) {
    //setInterval(() => {
    //  gameService.addCookies(112589.9906842624);
    //}, 164);
  }


  public convertNumber(value: number): string {
    return this.gameService.convertNumber(value);
  }
}

import { Component, Input, Renderer2 } from '@angular/core';
import { GameService } from 'src/app/_shared/services/game.service';
import { SoundService } from 'src/app/_shared/services/sound.service';
import { Upgrade } from '../../upgrades/upgrade';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent {

  @Input()
  item: Upgrade | undefined;

  isDisabled: boolean = false;

  tooltipVisible = false;
  private timeoutId: any;

  constructor(private renderer: Renderer2, private gameService: GameService, private soundService: SoundService) { }

  ngOnInit(): void {
    if (!this.item) return;

    if (this.item?.cost < 0) this.isDisabled = true;
  }

  public convertNumber(value: number): string {
    return this.gameService.convertNumber(value);
  }

  showTooltip() {
    this.timeoutId = setTimeout(() => {
      this.tooltipVisible = true;
    }, 1000);
  }

  hideTooltip() {
    clearTimeout(this.timeoutId);
    this.tooltipVisible = false;
  }

  clickHandler() {
    this.tooltipVisible ? clearTimeout(this.timeoutId) : this.hideTooltip();
    this.item?.buyUpgrade();
    this.soundService.playUpgrade();
  }

  onClick() {
  }

}

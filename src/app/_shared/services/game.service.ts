import { computed, effect, Injectable, signal, Signal } from '@angular/core';
import { AutoClicker } from 'src/app/game/upgrades/auto-clicker';
import { AutoClickerMultiplier } from 'src/app/game/upgrades/auto-clicker-multiplier';
import { AutoClickerSpeed } from 'src/app/game/upgrades/auto-clicker-speed';
import { ClickMultiplier } from 'src/app/game/upgrades/click-multiplier';
import { ComboMeterIncrement } from 'src/app/game/upgrades/combo-meter-increment';
import { ComingSoon } from 'src/app/game/upgrades/coming-soon';
import { CookiesPerClick } from 'src/app/game/upgrades/cookies-per-click';
import { DecreaseComboDecay } from 'src/app/game/upgrades/decrease-combo-decay';
import { MaxCombo } from 'src/app/game/upgrades/max-combo';
import { SweetSpotChance } from 'src/app/game/upgrades/sweet-spot-chance';
import { SweetSpotMultiplier } from 'src/app/game/upgrades/sweet-spot-multiplier';
import { Upgrade } from 'src/app/game/upgrades/upgrade';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public _cookies = signal(0);
  public _cookiesPerClick = signal(1);
  public _currentCookiesPerClick = computed(() => this._cookiesPerClick() * (this._comboMultiplier()));
  public _clickMultiplier = signal(1);
  public _autoClickers = signal(0);
  public _autoClickerSpeed = signal(0);
  public _autoClickerMultiplier = signal(1);
  public _sweetSpotChance = signal(1);
  public _sweetSpotMultiplier = signal(5);

  public _comboMeter = signal(0);
  public _comboMultiplier = signal(1);

  public _comboMeterIncrement = signal(1);
  public _maxCombo = signal(3);
  public _comboThreshold = signal(15);
  public _comboDecay = signal(5);
  private _currentDecay = computed(() => this._comboDecay() + this._comboDecay() * ((this._comboMultiplier() - 1) * 0.5));

  public _cookiesPerSecond = signal(0);
  public _cookiesText = computed(() => this.convertNumber(this._cookies()));

  public _clicksPerSecond = signal(0);
  private _totalClicks = signal(0);
  private _previousClicks = signal(0);

  public _upgrades: Upgrade[] | undefined;

  private previousCookies = 0;
  constructor() {

    setInterval(() => {
      let value = this._cookies();
      this._cookiesPerSecond.set(value - this.previousCookies);
      this.previousCookies = value;

    }, 1000);

    setInterval(() => {
      if (this._comboMeter() > 0) {
        this.modifyComboMeter(-this._currentDecay());
      }
      else {
        this._comboMultiplier.set(1);
      }
    }, 1000);

    setInterval(() => {
      let value = this._totalClicks();
      this._clicksPerSecond.set(value - this._previousClicks());
      this._previousClicks.set(value);
    }, 1000);

    this.loadFromLocalStorage();

    //TODO: SAVE SYSTEM
    effect(() => {

    });


    this._upgrades = [
      new CookiesPerClick(this),
      new ClickMultiplier(this),
      new AutoClicker(this),
      new AutoClickerSpeed(this),
      new SweetSpotChance(this),
      new SweetSpotMultiplier(this),
      new AutoClickerMultiplier(this),
      new ComboMeterIncrement(this),
      new MaxCombo(this),
      new DecreaseComboDecay(this),
      new ComingSoon(this),
    ];
  }

  ngOnInit() {
  }



  public click() {
    this._totalClicks.update(value => value + 1);
  }

  public addCookies(amount: number) {
    this._cookies.update(value => value + amount);
  }

  public convertNumber(number: number) {
    let suffixes = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    if (number < 1000000) {
      return number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
      let suffixIndex = Math.floor(Math.log10(number) / 6);
      let suffix = suffixes[suffixIndex];
      let formattedNumber = (number / Math.pow(10, suffixIndex * 6)).toFixed(2);
      return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + suffix;
    }
  }

  public modifyComboMeter(amount: number = this._comboMeterIncrement()) {
    this._comboMeter.update(value => value + amount);
    if (this._comboMeter() < 0) {
      this._comboMeter.set(0);
    }
    else if (this._comboMeter() >= 100 && this._comboMultiplier() == this._maxCombo()) {
      this._comboMeter.set(100);
    }
    else if (this._comboMeter() >= 100) {
      this._comboMeter.set(this._comboThreshold());
      this.modifyComboMultiplier(1);
    }
  }

  public modifyComboMultiplier(amount: number) {
    this._comboMultiplier.update(value => value + amount);
    if (this._comboMultiplier() < 1) {
      this._comboMultiplier.set(1);
    }
    else if (this._comboMultiplier() > this._maxCombo()) {
      this._comboMultiplier.set(this._maxCombo());
    }
  }

  public modifyMaxCombo(amount: number) {
    this._maxCombo.update(value => value + amount);
    if (this._maxCombo() < 3) {
      this._maxCombo.set(3);
    }
  }

  saveToLocalStorage() {
    let save = {
      cookies: this._cookies(),
      cookiesPerClick: this._cookiesPerClick(),
      clickMultiplier: this._clickMultiplier(),
      autoClickers: this._autoClickers(),
      autoClickerSpeed: this._autoClickerSpeed(),
      autoClickerMultiplier: this._autoClickerMultiplier(),
      sweetSpotChance: this._sweetSpotChance(),
      sweetSpotMultiplier: this._sweetSpotMultiplier(),
      comboMeter: this._comboMeter(),
      comboMultiplier: this._comboMultiplier(),
      comboMeterIncrement: this._comboMeterIncrement(),
      maxCombo: this._maxCombo(),
      comboThreshold: this._comboThreshold(),
      comboDecay: this._comboDecay(),
      upgrades: this._upgrades
    };
    localStorage.setItem("save", JSON.stringify(save));
  }

  loadFromLocalStorage() {
    if (this.checkForLegacySave()) return;
    this.checkForSave();
  }

  checkForLegacySave() {
    let hasLegacySave = false;
    let legacy = ["cookies", "pointsPerClick", "clickMultiplier", "autoClickerAmount", "autoClickerSpeed", "autoClickerMultiplier", "sweetSpotChance", "sweetSpotMultiplier"];
    for (let i = 0; i < legacy.length; i++) {
      if (localStorage.getItem(legacy[i])) {
        switch (legacy[i]) {
          case "cookies":
            this._cookies.set(Number(localStorage.getItem(legacy[i])));
            localStorage.removeItem(legacy[i]);
            break;
          case "pointsPerClick":
            this._cookiesPerClick.set(Number(localStorage.getItem(legacy[i])));
            localStorage.removeItem(legacy[i]);
            break;
          case "clickMultiplier":
            this._clickMultiplier.set(Number(localStorage.getItem(legacy[i])));
            localStorage.removeItem(legacy[i]);
            break;
          case "autoClickerAmount":
            this._autoClickers.set(Number(localStorage.getItem(legacy[i])));
            localStorage.removeItem(legacy[i]);
            break;
          case "autoClickerSpeed":
            this._autoClickerSpeed.set(Number(localStorage.getItem(legacy[i])));
            localStorage.removeItem(legacy[i]);
            break;
          case "autoClickerMultiplier":
            this._autoClickerMultiplier.set(Number(localStorage.getItem(legacy[i])));
            localStorage.removeItem(legacy[i]);
            break;
          case "sweetSpotChance":
            this._sweetSpotChance.set(Number(localStorage.getItem(legacy[i])));
            localStorage.removeItem(legacy[i]);
            break;
          case "sweetSpotMultiplier":
            this._sweetSpotMultiplier.set(Number(localStorage.getItem(legacy[i])));
            localStorage.removeItem(legacy[i]);
            break;
          default:
            break;
        }
        hasLegacySave = true;
      }
    }
    return hasLegacySave;
  }

  checkForSave() {
    let save = JSON.parse(localStorage.getItem("save") || "{}");
    if (save) {
      this._cookies.set(save.cookies || 0);
      this._cookiesPerClick.set(save.cookiesPerClick || 1);
      this._clickMultiplier.set(save.clickMultiplier || 1);
      this._autoClickers.set(save.autoClickers || 0);
      this._autoClickerSpeed.set(save.autoClickerSpeed || 0);
      this._autoClickerMultiplier.set(save.autoClickerMultiplier || 1);
      this._sweetSpotChance.set(save.sweetSpotChance || 1);
      this._sweetSpotMultiplier.set(save.sweetSpotMultiplier || 5);
      this._comboMeter.set(save.comboMeter || 0);
      this._comboMultiplier.set(save.comboMultiplier || 1);
      this._comboMeterIncrement.set(save.comboMeterIncrement || 1);
      this._maxCombo.set(save.maxCombo || 3);
      this._comboThreshold.set(save.comboThreshold || 15);
      this._comboDecay.set(save.comboDecay || 5);
      if (save.upgrades)
        this._upgrades = save.upgrades;
    }
  }
}

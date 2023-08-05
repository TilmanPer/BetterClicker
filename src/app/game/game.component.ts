import { Component, effect, HostListener, ViewEncapsulation } from '@angular/core';
import { PopUp } from '../popup/popup';
import { GameService } from '../_shared/services/game.service';
import { SoundService } from '../_shared/services/sound.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameComponent {

  cookiesPerClick = 0;
  trueCookiesPerClick = 0;
  gameContainer: any;
  autoClickerInterval: any;
  infoPopup: boolean = true;


  mouseX: number = 0;
  mouseY: number = 0;
  cookie: HTMLElement | undefined;

  constructor(private gameService: GameService, private soundService: SoundService) {
    effect(() => {
      this.cookiesPerClick = this.gameService._currentCookiesPerClick();
      this.trueCookiesPerClick = this.gameService._currentCookiesPerClick() + this.gameService._clickMultiplier();
      this.restartAutoClickerInterval(this.gameService._autoClickerSpeed());
    });
  }

  ngOnInit(): void {
    this.gameContainer = document.querySelector(".game");
    this.gameContainer.addEventListener("mousemove", (e: MouseEvent) => {
      //mousepos on component
      this.mouseX = e.clientX - this.gameContainer.getBoundingClientRect().left;
      this.mouseY = e.clientY - this.gameContainer.getBoundingClientRect().top;
    });

    this.cookie = document.querySelector(".clicker") as HTMLElement;
  }

  handleCookieClick() {
    let amount = 0;
    let sweetSpot = false;
    amount += this.gameService._currentCookiesPerClick() * this.gameService._clickMultiplier();

    if (this.gameService._sweetSpotChance() > Math.random() * 100) {
      amount *= this.gameService._sweetSpotMultiplier();
      sweetSpot = true;
      this.gameContainer.classList.add("sweet-spot");
      setTimeout(() => {
        this.gameContainer.classList.remove("sweet-spot");
      }, 100);
    }

    this.createPopupNumberAtMousePos(amount, sweetSpot);
    this.soundService.playCookieClick();
    this.gameService.modifyComboMeter();
    this.gameService.click();
    return amount;
  }

  //TODO: fix autoclicker not appearing and not adding cookies
  handleAutoClickers() {
    let amount = 0;
    amount += this.gameService._autoClickers() * this.gameService._autoClickerMultiplier() * this.gameService._currentCookiesPerClick();
    this.soundService.playCookieClick(0.03);
    this.createPopUpNumberOnCookie(amount);
    return amount;
  }

  restartAutoClickerInterval(speed: number) {
    if (this.gameService._autoClickers() == 0) return;
    if (this.autoClickerInterval) {
      clearInterval(this.autoClickerInterval);
    }
    this.autoClickerInterval = setInterval(() => {
      this.gameService.addCookies(this.handleAutoClickers());
    }, 1000 / (1 + speed / 100));
  }

  onClick() {
    let cookies = this.handleCookieClick();
    this.gameService.addCookies(cookies);
  }

  createPopupNumberAtMousePos(value: number, sweetSpot: boolean = false) {
    this.createPopUpNumberAtPos(this.mouseX, this.mouseY, value, sweetSpot);
  }

  createPopUpNumberOnCookie(value: number, sweetSpot: boolean = false) {
    if (!this.cookie) {
      console.error("cookie is undefined");
      return;
    };
    let x = this.cookie?.offsetLeft + Math.random() * this.cookie?.offsetWidth;
    let y = this.cookie?.offsetTop + Math.random() * this.cookie?.offsetHeight;
    this.createPopUpNumberAtPos(x, y, value, sweetSpot);
  }

  createPopUpNumberAtPos(x: number, y: number, value: number, sweetSpot: boolean = false) {
    let popup = document.createElement("div");
    popup.classList.add("popup-number");
    if (sweetSpot) {
      this.soundService.playSweetSpot();
      popup.classList.add("sweet-spot");
    }
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.innerText = `+${this.gameService.convertNumber(value)}`;
    document.querySelector(".clicker")?.appendChild(popup);
    setTimeout(() => {
      popup.remove();
    }, 1000);
  }

  createCookieRain() {
    for (let i = 0; i < 100; i++) {
      let cookie = document.createElement("div");
      let duration = Math.random() * 3 + 2;
      cookie.classList.add("cookie-rain");
      cookie.style.left = `${Math.random() * 100}vw`;
      cookie.style.top = `calc(${Math.random() * 30}vh - 100vh)`;
      cookie.style.animation = `cookie-rain ${duration}s linear`;
      document.body.appendChild(cookie);
    }
  }

  triggerComboInfo() {
    this.gameContainer.classList.add("combo-info");
  }
}

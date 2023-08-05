import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  public popSound = new Audio('assets/sounds/pop.mp3');
  public pingSound = new Audio('assets/sounds/ping.mp3');
  public upgradeSound = new Audio('assets/sounds/upgrade.mp3');

  private _muted = false;

  constructor() { }

  playSound(audio: HTMLAudioElement, volume: number = 0.1) {
    let clone = audio.cloneNode(true) as HTMLAudioElement;
    clone.volume = this._muted ? 0 : volume;
    clone.play();
  }

  muteAudio() {
    this._muted = true;
  }

  unmuteAudio() {
    this._muted = false;
  }

  toggleMute() {
    this._muted = !this._muted;
  }

  get muted() {
    return this._muted;
  }

  playCookieClick(volume: number = 0.1) {
    this.playSound(this.popSound, volume);
  }

  playSweetSpot(volume: number = 0.005) {
    this.playSound(this.pingSound, volume);
  }

  playUpgrade() {
    this.playSound(this.upgradeSound);
  }
}

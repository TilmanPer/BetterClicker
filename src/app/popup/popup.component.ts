import { Component, Input } from '@angular/core';
import { PopUp } from './popup';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input()
  popUp: PopUp | undefined;

  showPopUp: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (!this.popUp) return;
  }
}

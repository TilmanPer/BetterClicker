export class PopUp {

  constructor(public title: string, public text: string) {
    this.title = title || "Popup";
    this.text = text || "Popup text";
  }
}

export default class Section {
  constructor({items, renderer}, cardSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._cardElement = document.querySelector(cardSelector);
  }

  renderer() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._cardElement.append(element);
  }
}
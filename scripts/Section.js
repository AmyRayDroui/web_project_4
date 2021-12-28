export default class Section {
  constructor({items, renderer}, cardContainerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(cardContainerSelector);
  }

  renderer() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
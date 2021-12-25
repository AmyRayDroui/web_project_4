export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_visible');
    this.setEventListeners();
  }

  close() {
    const closeButton = this._popupSelector.querySelector('.popup__close-button');
    closeButton.removeEventListener("click", this._handleButtonClose);
    document.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupSelector.classList.remove('popup_visible');
  }

  setEventListeners() {
    document.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);

    const closeButton = this._popupSelector.querySelector('.popup__close-button');
    closeButton.addEventListener("click", this._handleButtonClose);
  }

  _handleButtonClose() {
    this.close();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains("popup_visible")) {
      this.close();
    }
  }
}
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
  }

  open() {
    this._popupSelector.classList.add('popup_visible');
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_visible');
    document.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
    this._closeButton.addEventListener("click", this._handleButtonClose);
  }

  setEventListeners() {
    document.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
    this._closeButton.addEventListener("click", this._handleButtonClose);
  }

  _handleButtonClose = () => {
    this.close();
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose = (evt) => {
    if (evt.target.classList.contains("popup_visible")) {
      this.close();
    }
  }
}
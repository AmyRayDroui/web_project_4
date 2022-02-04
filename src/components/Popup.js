export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    document.addEventListener("click", this._handleClickClose);
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
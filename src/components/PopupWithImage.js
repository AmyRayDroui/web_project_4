import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);

    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__card-title');
  }

  open = (imageSrc, imageCaption) => {
    this._popupImage.src = imageSrc;
    this._popupImage.alt = imageCaption;
    this._popupTitle.textContent = imageCaption;
    super.open();
  }
}
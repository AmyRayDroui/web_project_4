import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupTitle = this._popupSelector.querySelector('.popup__card-title');
  }

  open = (imageSrc, imageCaption) => {
    
    this._popupImage.src = imageSrc;
    this._popupImage.alt = imageCaption;
    this._popupTitle.textContent = imageCaption;
    super.open();
  }
}
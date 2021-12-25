import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor( popupSelector) {
    super(popupSelector);
  }

  open(imageSrc, imageCaption) {
    const popupViewCard = document.querySelector('.popup_type_card-view');
    const popupImage = popupViewCard.querySelector('.popup__image');
    const popupTitle = popupViewCard.querySelector('.popup__card-title');

    popupImage.src = imageSrc;
    popupImage.alt = imageCaption;
    popupTitle.textContent = imageCaption;
    super.open();
  }
}
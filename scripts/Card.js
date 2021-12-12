import {openForm} from './utils.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardElement = cardSelector.querySelector('.image-card').cloneNode(true);
  }

  createCard() {
    const cardName = this._cardElement.querySelector('.image-card__name');
    const cardImage = this._cardElement.querySelector('.image-card__image');
  
    cardName.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;
  
    this._setEventListeners();

    return this._cardElement;
  } 

  _setEventListeners() {
    const cardLike = this._cardElement.querySelector('.image-card__love-button');
    const cardImage = this._cardElement.querySelector('.image-card__image');
    const cardRemove = this._cardElement.querySelector('.image-card__remove-button');

    cardLike.addEventListener('click', this._handleLike);

    this._handlepopup(cardImage);
    
    cardRemove.addEventListener('click', () => this._handleremove());
  }

  _handleLike(evt) {
    evt.target.classList.toggle('image-card__love-button_active');
  }

  _handlepopup(cardImage) {
    const popupViewCard = document.querySelector('.popup_type_card-view');
    const popupImage = popupViewCard.querySelector('.popup__image');
    const popupTitle = popupViewCard.querySelector('.popup__card-title');

    cardImage.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupTitle.textContent = this._name;
      openForm(popupViewCard);
    })
  }

  _handleremove() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}


export default class Card {
  constructor(data, cardSelector, handleCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardElement = cardSelector.querySelector('.image-card').cloneNode(true);
    this._handleCardClick = handleCard;
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
    
    cardImage.addEventListener('click', this._handlePopup);
    
    cardRemove.addEventListener('click', this._handleRemove);
  }

  _handleLike(evt) {
    evt.target.classList.toggle('image-card__love-button_active');
  }

  _handlePopup = () => {
    this._handleCardClick(this._link, this._name);
  }

  _handleRemove = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }
}


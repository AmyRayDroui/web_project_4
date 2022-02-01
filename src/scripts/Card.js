export default class Card {
  constructor(data, cardSelector, handleCardClick, userId, handleDeletePopup, handleLikeButton) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._ownerId = this._owner._id;
    this._cardId = data._id;
    this._userId = userId;
    this._cardElement = cardSelector.querySelector('.image-card').cloneNode(true);
    this._handleDeletePopup = handleDeletePopup;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
  }

  createCard() {
    const cardName = this._cardElement.querySelector('.image-card__name');
    const cardImage = this._cardElement.querySelector('.image-card__image');
    const cardLikes = this._cardElement.querySelector('.image-card__love-count');
  
    cardName.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;
    cardLikes.textContent = this._likes.length;
  
    this._setEventListeners();

    return this._cardElement;
  } 

  _setEventListeners() {
    const cardLike = this._cardElement.querySelector('.image-card__love-button');
    const cardImage = this._cardElement.querySelector('.image-card__image');
    const cardRemove = this._cardElement.querySelector('.image-card__remove-button');

    this._likes.forEach(user => {
      if(this._userId === user._id) {
        cardLike.classList.add('image-card__love-button_active');
      }
    });

    cardLike.addEventListener('click', this._handleLike);
    
    cardImage.addEventListener('click', this._handlePopup);
    
    if(this._ownerId === this._userId) {
      cardRemove.addEventListener('click', this._handleRemove);
    } else {
      cardRemove.remove();
    }
    
  }

  _handleLike = (evt) => {
    this._likes = this._handleLikeButton(this._cardId, this._cardElement, this._likes);
  }

  _handlePopup = () => {
    this._handleCardClick(this._link, this._name);
  }

  _handleRemove = () => {
    this._handleDeletePopup(this._cardId, this._cardElement);
  }
}


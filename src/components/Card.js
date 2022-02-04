export default class Card {
  constructor(data, cardSelector, userId, handleCardClick, handleDeletePopup, handleLikeButton) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._ownerId = this._owner._id;
    this._cardId = data._id;
    this._userId = userId;
    this._cardElement = cardSelector.querySelector('.image-card').cloneNode(true);
    this._cardNameElement = this._cardElement.querySelector('.image-card__name');
    this._cardImageElement = this._cardElement.querySelector('.image-card__image');
    this._cardCounterElement = this._cardElement.querySelector('.image-card__love-count');
    this._cardLikeButtonElement = this._cardElement.querySelector('.image-card__love-button');
    this._cardRemoveButtonElement = this._cardElement.querySelector('.image-card__remove-button');
    this._activeLikeButtonSelector = 'image-card__love-button_active';
    this._handleDeletePopup = handleDeletePopup;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
  }

  createCard() {
    this._cardNameElement.textContent = this._name;
    this._cardImageElement.style.backgroundImage = `url(${this._link})`;
    this._cardCounterElement.textContent = this._likes.length;
  
    this._setEventListeners();

    return this._cardElement;
  } 

  _setEventListeners() {
    this._likes.forEach(user => {
      if(this._userId === user._id) {
        this._cardLikeButtonElement.classList.add(this._activeLikeButtonSelector);
      }
    });

    this._cardLikeButtonElement.addEventListener('click', this._handleLike);
    
    this._cardImageElement.addEventListener('click', this._handlePopup);
    
    if(this._ownerId === this._userId) {
      this._cardRemoveButtonElement.addEventListener('click', this._handleRemove);
    } else {
      this._cardRemoveButtonElement.remove();
    }
    
  }

  getId() {
    return this._cardId;
  }

  updateLikes(likes) {
    this._likes = likes;
    this._cardCounterElement.textContent = likes.length;
  }

  toggleMarkupLike() {
    this._cardLikeButtonElement.classList.toggle(this._activeLikeButtonSelector);
  }

  _handleLike = (evt) => {
    const addLiked = this._cardLikeButtonElement.classList.contains(this._activeLikeButtonSelector) ? false : true;
    this._handleLikeButton(this, addLiked);
  }

  _handlePopup = () => {
    this._handleCardClick(this._link, this._name);
  }

  _handleRemove = () => {
    this._handleDeletePopup(this._cardId, this._cardElement);
  }
}


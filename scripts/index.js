const openEditButton = document.querySelector('.profile__button_type_edit');
const openAddButton = document.querySelector('.profile__button_type_add-image');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupViewCard = document.querySelector('.popup_type_card-view');
const allCloseButtons = document.querySelectorAll('.popup__close-button');

const submitEditForm = popupEditProfile.querySelector('.popup__form');
const submitAddForm = popupAddCard.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const inputEditName = popupEditProfile.querySelector('.popup__input_type_name');
const inputEditInfo = popupEditProfile.querySelector('.popup__input_type_info'); 
const inputAddName = popupAddCard.querySelector('.popup__input_type_card-name');
const inputAddLink = popupAddCard.querySelector('.popup__input_type_card-link'); 

const cardsContainer = document.querySelector('.images-container');

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.image-card').cloneNode(true);
  const cardName = cardElement.querySelector('.image-card__name');
  const cardImage = cardElement.querySelector('.image-card__image');
  const cardLike = cardElement.querySelector('.image-card__love-button');
  const popupImage = popupViewCard.querySelector('.popup__image');
  const popupTitle = popupViewCard.querySelector('.popup__card-title')

  cardName.textContent = card.name;
  cardImage.style.backgroundImage = `url(${card.link})`;

  //like button event
  cardLike.addEventListener('click', handleLikeIcon);

  //view card popup event
  cardImage.addEventListener('click', () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupTitle.textContent = card.name;
    openForm(popupViewCard);
  })

  //deconste card event
  cardElement.querySelector('.image-card__remove-button').addEventListener('click', () => cardElement.remove());

  return cardElement;
} 

function handleLikeIcon(evt) {
  evt.target.classList.toggle('image-card__love-button_active');
}

initialCards.forEach((card)=>{
  cardsContainer.append(createCard(card));
});

//adding document event listeners for closing forms
function openForm(popup) {
  document.addEventListener("click", handleCloseClick);
  document.addEventListener("keydown", handleCloseEscape);
  popup.classList.add('popup_visible');
}

function handleCloseClick(evt) {
  if (evt.target.classList.contains("popup_visible")) {
    closeForm(document.querySelector(".popup_visible"));
  }
}

function handleCloseEscape(evt) {
  if (evt.key === "Escape") {
    closeForm(document.querySelector(".popup_visible"));
  }
}

function closeForm(popup) {
  document.removeEventListener("click", handleCloseClick);
  document.removeEventListener("keydown", handleCloseEscape);
  popup.classList.remove('popup_visible');
}

function openProfilePopup() { 
  inputEditName.value = profileName.textContent;
  inputEditInfo.value = profileInfo.textContent;
  openForm(popupEditProfile);
  } 

function handleEditProfileSubmit(event, popup) {
  event.preventDefault();
  profileName.textContent = inputEditName.value;
  profileInfo.textContent = inputEditInfo.value;
  closeForm(popup);
}

function handleAddCardSubmit(event, popup) {
  event.preventDefault();
  const saveButton = popup.querySelector('.popup__save-button');
  const card = {name: inputAddName.value,
              link: inputAddLink.value};
  cardsContainer.prepend(createCard(card));
  closeForm(popup);
  saveButton.disabled = true;
  saveButton.classList.add('popup__save-button_disabled');
  inputAddName.value = '';
  inputAddLink.value = '';
}

openEditButton.addEventListener('click',() => openProfilePopup());
openAddButton.addEventListener('click',() => openForm(popupAddCard));


allCloseButtons.forEach(button => button.addEventListener('click', () => {
  const allPopups = document.querySelectorAll('.popup');
  allPopups.forEach(popup => closeForm(popup));
}));



//submitting forms events
submitEditForm.addEventListener('submit', () => handleEditProfileSubmit(event, popupEditProfile));
submitAddForm.addEventListener('submit', () => handleAddCardSubmit(event, popupAddCard));

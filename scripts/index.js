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
  cardElement.querySelector('.image-card__name').textContent = card.name;
  cardElement.querySelector('.image-card__image').style.backgroundImage = `url(${card.link})`;

  //like button event
  cardElement.querySelector('.image-card__love-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('image-card__love-button_active');
  });

  //view card popup event
  cardElement.querySelector('.image-card__image').addEventListener('click', () => {
    popupViewCard.querySelector('.popup__image').src = card.link;
    popupViewCard.querySelector('.popup__image').alt = card.name;
    popupViewCard.querySelector('.popup__card-title').textContent = card.name;
    popupViewCard.classList.toggle('popup_visible');
  })

  //deconste card event
  cardElement.querySelector('.image-card__remove-button').addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  })

  return cardElement;
} 

initialCards.forEach((card)=>{
  cardsContainer.append(createCard(card));
});



function openForm(popup) {
  popup.classList.add('popup_visible');
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
  popup.classList.remove('popup_visible');
}

function handleAddCardSubmit(event, popup) {
  event.preventDefault();
  const card = {name: inputAddName.value,
              link: inputAddLink.value};
  cardsContainer.prepend(createCard(card));
  popup.classList.remove('popup_visible');
}

openEditButton.addEventListener('click',() => openProfilePopup());
openAddButton.addEventListener('click',() => openForm(popupAddCard));


allCloseButtons.forEach(button => button.addEventListener('click', () => {
  const allPopups = document.querySelectorAll('.popup');
  allPopups.forEach(popup => popup.classList.remove('popup_visible'));
}));

//submitting forms events
submitEditForm.addEventListener('submit', () => handleEditProfileSubmit(event, popupEditProfile));
submitAddForm.addEventListener('submit', () => handleAddCardSubmit(event, popupAddCard));





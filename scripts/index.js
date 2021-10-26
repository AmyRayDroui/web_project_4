const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
]; 


let openEditButton = document.querySelector('.profile__button_type_edit');
let openAddButton = document.querySelector('.profile__button_type_add-image');

let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupAddCard = document.querySelector('.popup_type_add-card');
let allCloseButtons = document.querySelectorAll('.popup__close-button');

let submitEditForm = popupEditProfile.querySelector('.popup__form');
let submitAddForm = popupAddCard.querySelector('.popup__form');

let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__info');

let inputEditName = popupEditProfile.querySelector('.popup__input_type_name');
let inputEditInfo = popupEditProfile.querySelector('.popup__input_type_info'); 
let inputAddName = popupAddCard.querySelector('.popup__input_type_card-name');
let inputAddLink = popupAddCard.querySelector('.popup__input_type_card-link'); 

let cardsContainer = document.querySelector('.images-container');

initialCards.forEach((card)=>{
  cardsContainer.append(createCard(card));
});

function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.image-card').cloneNode(true);
  cardElement.querySelector('.image-card__name').textContent = card.name;
  cardElement.querySelector('.image-card__image').style.backgroundImage = `url(${card.link})`;

  cardElement.querySelector('.image-card__love-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('image-card__love-button_active');
  });

  cardElement.querySelector('.image-card__remove-button').addEventListener('click', function(evt) {
    evt.target.parentElement.parentElement.remove();
  })

  return cardElement;
} 

function openForm(popup) {
  inputEditName.value = profileName.textContent;
  inputEditInfo.value = profileInfo.textContent;
  popup.classList.toggle('popup_visible');
}

function handleEditSubmit(event, popup) {
  event.preventDefault();
  profileName.textContent = inputEditName.value;
  profileInfo.textContent = inputEditInfo.value;
  popup.classList.toggle('popup_visible');
}

function handleAddSubmit(event, popup) {
  event.preventDefault();
  let card = {name: inputAddName.value,
              link: inputAddLink.value};
  cardsContainer.prepend(createCard(card));
  popup.classList.toggle('popup_visible');
}

openEditButton.addEventListener('click',() => openForm(popupEditProfile));
openAddButton.addEventListener('click',() => openForm(popupAddCard));


allCloseButtons.forEach(button => button.addEventListener('click', () => {
  let allPopups = document.querySelectorAll('.popup');
  allPopups.forEach(popup => popup.classList.remove('popup_visible'));
}));

submitEditForm.addEventListener('submit', () => handleEditSubmit(event, popupEditProfile));
submitAddForm.addEventListener('submit', () => handleAddSubmit(event, popupAddCard));





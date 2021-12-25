//imports
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js'
import { openForm, closeForm} from './utils.js';
import PopupWithImage from './PopupWithImage.js';


//constants
const openEditButton = document.querySelector('.profile__button_type_edit');
const openAddButton = document.querySelector('.profile__button_type_add-image');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const allCloseButtons = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const submitEditForm = popupEditProfile.querySelector('.popup__form');
const submitAddForm = popupAddCard.querySelector('.popup__form');
const cardsContainer = document.querySelector('.images-container');
const cardTemplate = document.querySelector('#card-template').content;
const inputAddName = popupAddCard.querySelector('.popup__input_type_card-name');
const inputAddLink = popupAddCard.querySelector('.popup__input_type_card-link'); 
const inputEditName = popupEditProfile.querySelector('.popup__input_type_name');
const inputEditInfo = popupEditProfile.querySelector('.popup__input_type_info'); 
//form validator config
const configObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
const formList = Array.from(document.querySelectorAll(configObject.formSelector));

initialCards.forEach((data)=>{
  const card = new Card(data, cardTemplate);
  cardsContainer.append(card.createCard());
});


function openProfilePopup() { 
  inputEditName.value = profileName.textContent;
  inputEditInfo.value = profileInfo.textContent;
  openForm(popupEditProfile);
} 

//open buttons events
openEditButton.addEventListener('click',() => openProfilePopup());
openAddButton.addEventListener('click',() => openForm(popupAddCard));

//close buttons events
allCloseButtons.forEach(button => button.addEventListener('click', () => {
  const allPopups = document.querySelectorAll('.popup');
  allPopups.forEach(popup => closeForm(popup));
}));

//validate forms
formList.forEach((formElement) => {
  const form = new FormValidator(configObject, formElement);
  form.enableValidation();
});

//submit handlers
function handleEditProfileSubmit(event, popup) {
  event.preventDefault();
  profileName.textContent = inputEditName.value;
  profileInfo.textContent = inputEditInfo.value;
  closeForm(popup);
}

function handleAddCardSubmit(event, popup) {
  event.preventDefault();
  const saveButton = popup.querySelector('.popup__save-button');
  const data = {name: inputAddName.value,
              link: inputAddLink.value};
  const card = new Card (data, cardTemplate)
  cardsContainer.prepend(card.createCard());
  closeForm(popup);
  saveButton.disabled = true;
  saveButton.classList.add('popup__save-button_disabled');
  inputAddName.value = '';
  inputAddLink.value = '';
}

//submitting forms events
submitEditForm.addEventListener('submit', () => handleEditProfileSubmit(event, popupEditProfile));
submitAddForm.addEventListener('submit', () => handleAddCardSubmit(event, popupAddCard));

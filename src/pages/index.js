//css import
import "./index.css";

//imports
import Api from'../scripts/Api';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import initialCards from '../scripts/initialCards.js'
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';


//constants
const openEditButton = document.querySelector('.profile__button_type_edit');
const openAddButton = document.querySelector('.profile__button_type_add-image');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupEditProfileSelector = '.popup_type_edit-profile';
const popupAddCardSelector = '.popup_type_add-card';
const popupImageViewSelector = '.popup_type_card-view';
const cardsContainerSelector = '.images-container';
const cardTemplate = document.querySelector('#card-template').content;

const inputEditName = document.querySelector(popupEditProfileSelector).querySelector('.popup__input_type_name');
const inputEditInfo = document.querySelector(popupEditProfileSelector).querySelector('.popup__input_type_info');
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

//validate forms
formList.forEach((formElement) => {
  const form = new FormValidator(configObject, formElement);
  form.enableValidation();
});


const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-42",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json"
  }
}); 

const userData = new UserInfo(profileName, profileInfo);

const popupEditProfile = new PopupWithForm(handleProfileFormSubmit, popupEditProfileSelector);
const popupAddCard = new PopupWithForm(handleAddCardFormSubmit, popupAddCardSelector);
const popupImage = new PopupWithImage(popupImageViewSelector);
const openImage = popupImage.open;


popupAddCard.setEventListeners();
popupImage.setEventListeners();

openEditButton.addEventListener('click', () => {
  popupEditProfile.open();
  const userElement = userData.getUserInfo();
  inputEditName.value = userElement.name;
  inputEditInfo.value = userElement.job;
});
openAddButton.addEventListener('click', () => {
  popupAddCard.open();
});

const cardList = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, cardTemplate, openImage);
    cardList.addItem(card.createCard());
  }},
  cardsContainerSelector
)
cardList.renderer();

function handleProfileFormSubmit(submissionData){
  userData.setUserInfo(submissionData.name, submissionData.info);
  profileName.textContent = submissionData.name;
  profileInfo.textContent = submissionData.info;
  popupEditProfile.close();
}

function handleAddCardFormSubmit(cardData){
  const card = new Card(cardData, cardTemplate, openImage);
  cardList.addItem(card.createCard());
  popupAddCard.close();
}

//imports
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js'
//import { openForm, closeForm} from './utils.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';


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


const userData = new UserInfo(profileName, profileInfo);

const popupEditProfile = new PopupWithForm(profileInfoHandler, popupEditProfileSelector);
const popupAddCard = new PopupWithForm(addCardHandler, popupAddCardSelector);
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

const initialRender = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, cardTemplate, openImage);
    initialRender.addItem(card.createCard());
  }},
  cardsContainerSelector
)
initialRender.renderer();

function profileInfoHandler(submissionData){
  userData.setUserInfo(submissionData.name, submissionData.info);
  profileName.textContent = submissionData.name;
  profileInfo.textContent = submissionData.info;
  popupEditProfile.close();
}

function addCardHandler(submission){
  const card = new Card(submission, cardTemplate, openImage);
  const renderNewCard = new Section({
    items: [card],
    renderer: () => {
      renderNewCard.addItem(card.createCard());
    }
  },cardsContainerSelector);
  renderNewCard.renderer();
  popupAddCard.close();
}

//css import
import "./index.css";

//imports
import Api from'../scripts/Api';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';


//constants
const openEditButton = document.querySelector('.profile__button_type_edit');
const openEditImgButton = document.querySelector('.profile__button_type_edit-img');
const openAddButton = document.querySelector('.profile__button_type_add-image');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const profilePicture = document.querySelector('#profile-image');
const popupEditProfileSelector = '.popup_type_edit-profile';
const popupEditProfileImgSelector = '.popup_type_edit-profile-image';
const popupAddCardSelector = '.popup_type_add-card';
const popupImageViewSelector = '.popup_type_card-view';
const cardsContainerSelector = '.images-container';
const cardTemplate = document.querySelector('#card-template').content;

const inputEditName = document.querySelector(popupEditProfileSelector).querySelector('.popup__input_type_name');
const inputEditInfo = document.querySelector(popupEditProfileSelector).querySelector('.popup__input_type_info');
const inputEditImg = document.querySelector(popupEditProfileImgSelector).querySelector('.popup__input_type_profile-img-link');
const userData = new UserInfo(profileName, profileInfo);

const popupEditProfile = new PopupWithForm(handleProfileFormSubmit, popupEditProfileSelector);
const popupEditProfileImg = new PopupWithForm(handleProfileImgForSubmit, popupEditProfileImgSelector);
const popupAddCard = new PopupWithForm(handleAddCardFormSubmit, popupAddCardSelector);
const popupImage = new PopupWithImage(popupImageViewSelector);
const openImage = popupImage.open;

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
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "9b1558af-91ea-493b-ada9-7496ba6fa8e8",
    "Content-Type": "application/json"
  }
}); 


const cardList = new Section({
  renderer: (cardData) => {
    const card = new Card(cardData, cardTemplate, openImage);
    cardList.addItem(card.createCard());
  }},
  cardsContainerSelector
)


api.getUserInfo()
.then((result) => {
  userData.setUserInfo(result.name, result.about);
  profileName.textContent = result.name;
  profileInfo.textContent = result.about;
  profilePicture.src = result.avatar;
  profilePicture.alt = `${result.name}'s avatar`;
})
.catch((error) => {
  console.log(error);
});


api.getInitialCards()
.then((result) => {
  cardList.renderer(result);
})
.catch((error) => {
  console.log(error);
});


popupAddCard.setEventListeners();
popupImage.setEventListeners();

openEditButton.addEventListener('click', () => {
  popupEditProfile.open();
  const userElement = userData.getUserInfo();
  inputEditName.value = userElement.name;
  inputEditInfo.value = userElement.job;
});
openEditImgButton.addEventListener('click', () => {
  const imgUrl = profilePicture.src;
  popupEditProfileImg.open();
  inputEditImg.value = imgUrl;
});
openAddButton.addEventListener('click', () => {
  popupAddCard.open();
});




function handleProfileFormSubmit(submissionData){
  userData.setUserInfo(submissionData.name, submissionData.info);
  api.setUserInfo(submissionData)
  .then((result) => { 
    userData.setUserInfo(result.name, result.about);
    profileName.textContent = result.name;
    profileInfo.textContent = result.about;
  })
  .catch((error) => {
    console.log(error);
  });
  popupEditProfile.close();
}

function handleProfileImgForSubmit(imgUrl){
  profilePicture.src = imgUrl.link;
  popupEditProfileImg.close();
}


function handleAddCardFormSubmit(cardData){
  api.addNewCard(cardData)
  .then((result) => {
    const card = new Card(result, cardTemplate, openImage);
    cardList.addItem(card.createCard());
  })
  .catch((error) => {
    console.log(error);
  })
  popupAddCard.close();
}

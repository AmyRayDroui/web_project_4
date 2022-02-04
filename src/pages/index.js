//css import
import "./index.css";

//imports
import Api from'../components/Api';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithVerification from "../components/PopupWithVerification";
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { elements } from "../utils/constants";
import { selectors } from "../utils/constants";
import { configObject } from "../utils/constants";


//components instants
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "9b1558af-91ea-493b-ada9-7496ba6fa8e8",
    "Content-Type": "application/json"
  }
}); 

const cardList = new Section({
  renderer: (cardData) => {
    cardList.addItem(createCard(cardData));
  }},
  selectors.cardsContainerSelector
);

const userData = new UserInfo(elements.profileName, elements.profileInfo, elements.profilePicture);

const popupEditProfile = new PopupWithForm(handleProfileFormSubmit, selectors.popupEditProfileSelector);
const popupEditProfileImg = new PopupWithForm(handleProfileImgFormSubmit, selectors.popupEditProfileImgSelector);
const popupAddCard = new PopupWithForm(handleAddCardFormSubmit, selectors.popupAddCardSelector);
const popupDeleteCard = new PopupWithVerification(handleDeleteCard, selectors.popupDeleteVerificationSelector, '', '');
const popupImage = new PopupWithImage(selectors.popupImageViewSelector);
const openImage = popupImage.open;


const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configObject);


Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, cards]) => {
  userData.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar, userInfo._id);
  cardList.renderer(cards);
})
.catch((error) => {
  console.log(error);
});

popupEditProfile.setEventListeners();
popupEditProfileImg.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupDeleteCard.setEventListeners();


function handleProfileFormSubmit(submissionData){
  popupEditProfile.renderLoading(true, 'Saving...');
  api.setUserInfo(submissionData)
  .then((result) => { 
    userData.setUserInfo(result.name, result.about, result.avatar, result._id);
    popupEditProfile.close();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupEditProfile.renderLoading(false, 'Save');
  });
}

function handleProfileImgFormSubmit(submissionData){
  popupEditProfileImg.renderLoading(true, 'Saving...');
  api.setUserAvatar(submissionData)
  .then((result) => {
    userData.setUserInfo(result.name, result.about, result.avatar, result._id); 
    popupEditProfileImg.close();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupEditProfileImg.renderLoading(false, 'Save');
  });
}


function handleAddCardFormSubmit(cardData){
  popupAddCard.renderLoading(true, 'Creating...');
  api.addNewCard(cardData)
  .then((result) => {
    cardList.addItem(createCard(result));
    popupAddCard.close();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupAddCard.renderLoading(false, 'Create');
  });
  
}

function handleDeletePopup(cardId, cardElement) {
  popupDeleteCard.setInfo(cardId, cardElement);
  popupDeleteCard.open();
}


function handleDeleteCard(cardId, cardElement) {
  popupDeleteCard.renderLoading(true, 'Deleting...');
  api.removeCard(cardId)
  .then((result) => {
    cardElement.remove();
    cardElement = null;
    popupDeleteCard.close();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupDeleteCard.renderLoading(false, 'Yes');
  })
}

function handleLike(card, addLiked) {
  api.toggleLike(card.getId(), addLiked)
  .then((result) => {
    card.updateLikes(result.likes);
    card.toggleMarkupLike();
  })
  .catch((error) => {
    console.log(error);
  });
}


function createCard(item) {
  const userId = userData.getUserInfo().id; 
  const cardElement = new Card(item, elements.cardTemplate, userId, openImage, handleDeletePopup, handleLike);
  return cardElement.createCard();
}


elements.openEditButton.addEventListener('click', () => {
  formValidators[elements.formEditProfile.getAttribute('name')].resetValidation();
  popupEditProfile.open();
  const userElement = userData.getUserInfo();
  elements.inputEditName.value = userElement.name;
  elements.inputEditInfo.value = userElement.about;
});
elements.openEditImgButton.addEventListener('click', () => {
  formValidators[elements.formEditProfileImg.getAttribute('name')].resetValidation();
  popupEditProfileImg.open();
});
elements.openAddButton.addEventListener('click', () => {
  formValidators[elements.formAddCard.getAttribute('name')].resetValidation();
  popupAddCard.open();
});

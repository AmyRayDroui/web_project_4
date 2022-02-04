export const selectors = {
  popupEditProfileSelector: '.popup_type_edit-profile',
  popupEditProfileImgSelector: '.popup_type_edit-profile-image',
  popupAddCardSelector: '.popup_type_add-card',
  popupImageViewSelector: '.popup_type_card-view',
  popupDeleteVerificationSelector: '.popup_type_remove-card',
  cardsContainerSelector: '.images-container'
};

export const elements = {
  //button elements
  openEditButton: document.querySelector('.profile__button_type_edit'),
  openEditImgButton: document.querySelector('.profile__image-overlay'),
  openAddButton: document.querySelector('.profile__button_type_add-image'),

  //profile elements
  profileName: document.querySelector('.profile__name'),
  profileInfo: document.querySelector('.profile__info'),
  profilePicture: document.querySelector('#profile-image'),

  //popup elements
  inputEditName: document.querySelector(selectors.popupEditProfileSelector).querySelector('.popup__input_type_name'),
  inputEditInfo: document.querySelector(selectors.popupEditProfileSelector).querySelector('.popup__input_type_info'),
  inputEditImg: document.querySelector(selectors.popupEditProfileImgSelector).querySelector('.popup__input_type_profile-img-link'),
  submitEditButton: document.querySelector(selectors.popupEditProfileSelector).querySelector('.popup__save-button'),
  submitEditImgButton: document.querySelector(selectors.popupEditProfileImgSelector).querySelector('.popup__save-button'),

  //form elements
  formEditProfile: document.querySelector(selectors.popupEditProfileSelector).querySelector('.popup__form'),
  formEditProfileImg: document.querySelector(selectors.popupEditProfileImgSelector).querySelector('.popup__form'),
  formAddCard: document.querySelector(selectors.popupAddCardSelector).querySelector('.popup__form'),

  //card template
  cardTemplate: document.querySelector('#card-template').content
};

//config for forms
export const configObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const inputEditName = popupEditProfile.querySelector('.popup__input_type_name');
const inputEditInfo = popupEditProfile.querySelector('.popup__input_type_info'); 



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

export {openForm, closeForm, openProfilePopup};
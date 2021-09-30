let openEditButton = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let closeEditButton = popup.querySelector('.popup__close-button');
let pageWrapper = document.querySelector('.page__wrapper');

let loveButtons = document.querySelectorAll('.image-card__love-button');

let form = document.querySelector('.popup__form');

let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__info');

let inputName = document.querySelector('.popup__input_type_name');
let inputInfo = document.querySelector('.popup__input_type_info'); 


function openForm() {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  popup.classList.toggle('popup_visible');
}

function closeForm() {
  popup.classList.toggle('popup_visible');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  closeForm();
}

//commented for the reviewer's request
/*loveButtons.forEach((button) => {
  button.addEventListener('click', (event)=> {
    event.target.classList.toggle('image-card__love-button_active');
  })
});*/

openEditButton.addEventListener('click', openForm);
closeEditButton.addEventListener('click', closeForm); 

form.addEventListener('submit', handleFormSubmit);
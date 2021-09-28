const openEditButton = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const closeEditButton = popup.querySelector('.popup__close-button');
const pageWrapper = document.querySelector('.page__wrapper');

const loveButtons = document.querySelectorAll('.image-card__love-button');

const form = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_info'); 


function toggleForm() {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  popup.classList.toggle('popup_visible');
  pageWrapper.classList.toggle('page__wrapper_opaque');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
}

loveButtons.forEach((button) => {
  button.addEventListener('click', (event)=> {
    event.target.classList.toggle('image-card__love-button_active');
  })
});

openEditButton.addEventListener('click', toggleForm);
closeEditButton.addEventListener('click', toggleForm); 

form.addEventListener('submit', handleFormSubmit);
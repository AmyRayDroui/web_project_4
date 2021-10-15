let openEditButton = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let closeEditButton = popup.querySelector('.popup__close-button');
let pageWrapper = document.querySelector('.page__wrapper');



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

const cardTemplate = document.querySelector('#card-template').content;
 
let cardsContainer = document.querySelector('.images-container');

function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.image-card').cloneNode(true);
  cardElement.querySelector('.image-card__name').textContent = card.name;
  cardElement.querySelector('.image-card__image').style.backgroundImage = `url(${card.link})`;
  return cardElement;
} 

initialCards.forEach((card)=>{
  cardsContainer.append(createCard(card));
});
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submission, popupSelector) {
    super(popupSelector);
    this._submission = submission;

    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  close() {
    super.close();
    this._form.reset();
    //this._popupSelector.removeEventListener('submit', this._handleSubmission);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._handleSubmission);
  }

  _handleSubmission = (evt) => {
    evt.preventDefault();
    this._submission(this._getInputValues());
  }

  _getInputValues() {
    const formValue = {};

    this._inputList.forEach(input => formValue[input.name] = input.value);
    return formValue;
  }
  

}
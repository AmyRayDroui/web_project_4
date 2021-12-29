import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmission, popupSelector) {
    super(popupSelector);
    this._handleSubmission = handleSubmission;

    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._handleSubmissionFunc);
  }

  _handleSubmissionFunc = (evt) => {
    evt.preventDefault();
    this._handleSubmission(this._getInputValues());
  }

  _getInputValues() {
    const formValue = {};

    this._inputList.forEach(input => formValue[input.name] = input.value);
    return formValue;
  }
}
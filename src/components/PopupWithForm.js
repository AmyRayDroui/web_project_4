import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmission, popupSelector) {
    super(popupSelector);
    this._handleSubmission = handleSubmission;

    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__save-button');
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleSubmissionFunc);
  }

  renderLoading(isLoading, loadingText) {
    this._submitButton.textContent = loadingText;
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
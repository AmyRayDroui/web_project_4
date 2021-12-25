import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submission, popupSelector) {
    super(popupSelector);
    this._submission = submission;

    this._inputList = popupSelector.querySelectorAll('.popup_input');
    this._form = popupSelector.querySelectorAll('.popup__form')
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', () => {
      evt.preventDefault();
      this._submission(this._getInputValues());
    })
    super.setEventListeners();
  }

  _getInputValues() {
    this._formValue = {};

    this._inputList.foreach(input => this._formValue[input.name] = input.value);
    return this._formValue;
  }
  

}
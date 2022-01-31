import Popup from "./Popup.js";

export default class PopupWithVerification extends Popup {
  constructor(handleVerification, popupSelector, id, element) {
    super(popupSelector);
    this._saveBtn = this._popupSelector.querySelector('.popup__save-button');
    this._handleVerification = handleVerification;
    this._id = id;
    this._element = element;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._saveBtn.addEventListener('click', this._handleVerificationFunc);
  }

  _handleVerificationFunc = () => {
    this._handleVerification(this._id, this._element);
  }

  setInfo(id, element) {
    this._id = id;
    this._element = element;
  }
}
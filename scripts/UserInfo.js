export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userNameElement = userNameSelector;
    this._userJobElement = userJobSelector;
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo['name'] = this._userNameElement.textContent;
    this._userInfo['job'] = this._userJobElement.textContent;
    return this._userInfo;
  }

  setUserInfo({userName, userJob}) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
  }
}
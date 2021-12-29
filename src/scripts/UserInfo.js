export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameElement = userNameSelector;
    this._userJobElement = userJobSelector;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent
    };
    return userInfo;
  }

  setUserInfo(userName, userJob) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
  }
}
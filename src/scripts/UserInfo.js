export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userNameElement = userNameSelector;
    this._userJobElement = userJobSelector;
    this._userAvatarElement = userAvatarSelector;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameElement.textContent,
      about: this._userJobElement.textContent,
      avatar: this._userAvatarElement
    };
    return userInfo;
  }

  setUserInfo(userName, userJob, userAvatar) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
    this._userAvatarElement.src = userAvatar;
    this._userAvatarElement.alt = `${userName}'s avatar`;
  }
}
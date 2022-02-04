export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector, userId) {
    this._userNameElement = userNameSelector;
    this._userJobElement = userJobSelector;
    this._userAvatarElement = userAvatarSelector;
    this._userId = userId;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameElement.textContent,
      about: this._userJobElement.textContent,
      avatar: this._userAvatarElement,
      id: this._userId
    };
    return userInfo;
  }

  setUserInfo(userName, userJob, userAvatar, userId) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
    this._userAvatarElement.src = userAvatar;
    this._userAvatarElement.alt = `${userName}'s avatar`;
    this._userId = userId;
  }
}
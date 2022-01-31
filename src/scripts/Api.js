export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
  }

  toggleLike(cardId, addLike) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: addLike ? 'PUT' : 'DELETE',
      headers: this._headers
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
  }
}
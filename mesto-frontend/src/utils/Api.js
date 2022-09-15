const token = localStorage.getItem("token");

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._token = config.headers.authorization;
    this._headers = config.headers;
  }

    // Метод проверки ответ от сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Что то пошло не так.')
  }

    // Метод получения карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }

    // Метод получения данных о пользователе с сервера
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }

    // Метод обновления данных пользователя на сервере
  updateUserData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._handleResponse)
  }

    // Метод обновления аватар на сервере
  updateAvatar(newUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newUrl
      })
    })
    .then(this._handleResponse)
  }

    // Метод добавления новой карточки на сервер
  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._handleResponse)
  }

    // Метод удаления карточки с сервера
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }

    // Метод добавления "лайк"
  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

    // Метод удаления "лайк"
  deleteLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }

    // Метод принимает токен и подставляет его в заголовок объекта api
  getToken = (token) => {
    this._token =  `Bearer ${token}`
  }
}

const api = new Api({
  baseUrl: "https://dmitrys.nomorepartiesxyz.ru/api",
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default api;

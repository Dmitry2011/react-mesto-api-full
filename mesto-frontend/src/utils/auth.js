export const BASE_URL = 'https://dmitrys.nomorepartiesxyz.ru/api';

const _handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Что то пошло не так.');
}

  // запрос для регистрации в сервисе
export const register = ( email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password})
  })
  .then((res) => {
    return res;
  })
  .then(_handleResponse);
};

  //
export const authorize = ( email, password ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(_handleResponse)
  .then ((data) => {
        localStorage.setItem ("token", data.token);
        return data;
    })
};

  // запрос для проверки валидности токена и получения email для вставки в шапку сайта
export const getData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(data => data)
  .then(_handleResponse);
}

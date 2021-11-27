const URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = () => {
    return fetch(`${URL}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        //'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => checkResponse(res))
    .then(data => data)
  }

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
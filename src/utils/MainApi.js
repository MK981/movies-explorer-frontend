//export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'https://api.maxweb.nomoredomains.rocks';

export const register = (password, email, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
      name: name,
     })
  })
  .then(res => checkResponse(res))
  .then(data => {return data;})
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password})
  })
  .then(res => checkResponse(res))
  .then(data => {return data;})
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkResponse(res))
  .then(data => data)
}

export const updateUserInfo = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
     })
  })
  .then(res => checkResponse(res))
  .then(data => data)
}

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkResponse(res))
  .then(data => data)
}

export const saveMovie = (country, director, duration, year, description, 
  image, trailerLink, movieId, nameRU, nameEN, token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: image,
      trailerLink: trailerLink,
      movieId: movieId,
      nameRU: nameRU,
      nameEN: nameEN
    })
  })
  .then(res => checkResponse(res))
  .then(data => {return data;})
};

export const deleteMovie = (movieId, token) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkResponse(res))
  .then(data => data)
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
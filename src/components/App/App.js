import React from 'react';
import './App.css';

import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { ProtectedRoute, ProtectedForUser } from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

import { UserContext } from '../../contexts/UserContext';

//import { cards, ourCards } from '../../utils/cards';

function App() {

  const history = useHistory();
  const location = useLocation();

  const [token, setToken] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [authError, setAuthError] = React.useState('');
  const [isLoaderOpen, setIsLoaderOpen] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState('');

  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesLoader, setMoviesLoader] = React.useState(false);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [moviesNotFound, setMoviesNotFound] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState('');
  const [shortMovies, setShortMovies] = React.useState(true);
  const [nofilteredMovies, setNoFilteredMovies] = React.useState([]);

  const [userMovies, setUserMovies] = React.useState([]);
  const [userFoundMovies, setUserFoundMovies] = React.useState([]);

  React.useEffect(() => {
    function tokenCheck() {

        if(localStorage.getItem('token')) {
          const token = localStorage.getItem('token');

          if(token) {
            setIsLoaderOpen(true);

              Promise.all([mainApi.getUserInfo(token), mainApi.getMovies(token)])
              .then(([user, movies]) => {
                setLoggedIn(true);
                setToken(localStorage.getItem('token'));
                setCurrentUser(user);

                //const ourMovies = movies.data.filter((mov) => mov.owner === currentUser._id);
                setUserMovies(movies.data);
                setUserFoundMovies(movies.data);
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setIsLoaderOpen(false);
              })

              if(localStorage.getItem('allMovies')) {
                setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
              }

              history.push(location.pathname);
            }
        }
    }
    tokenCheck();

}, [history, token])

  //const loggedIn = location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/'; //временное решение

  function handleUpdateUser(name, email) {
    setIsLoaderOpen(true);
    mainApi.updateUserInfo(name, email, token)
    .then((user) => {
      setCurrentUser(user.data);
      setUpdateStatus('Данные успешно изменены');
    })
    .catch((err) => {
      console.log(err);
      setUpdateStatus('Ошибка в изменении данных');
    })
    .finally(() => {
      setIsLoaderOpen(false);
    })
  }

  function onRegister(password, email, name) {
    setIsLoaderOpen(true);
    mainApi.register(password, email, name).then((data) => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      setToken(localStorage.getItem('token'));
      history.push('/movies');
      setAuthError('');
    })
    .catch((err) => {
      console.log(err);
      setAuthError(err);
    })
    .finally(() => {
      setIsLoaderOpen(false);
    })
  }

  function onLogin(password, email) {
    setIsLoaderOpen(true);
    mainApi.authorize(password, email)
    .then((data) => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      setToken(localStorage.getItem('token'));
      history.push('/movies');
      setAuthError('');
    })
    .catch((err) => {
      //console.log(err);
      setAuthError(err);
      console.log(authError);
    })
    .finally(() => {
      setIsLoaderOpen(false);
    })
  }

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('allMovies');
    setFoundMovies([]);
    setNoFilteredMovies([]);
    setMoviesNotFound(false);
    setLoggedIn(false);
    setToken('');
    history.push('/');
  }

  function searchMovies(name) {
    let found = [];
    if(location.pathname === '/movies') {
      if(localStorage.getItem('allMovies')) {

        if(shortMovies) {
          allMovies.forEach((movie) => {
            if(movie.nameRU.toLowerCase().includes(name.toLowerCase())) {
              found.push(movie);
            }
          })
        } else {
          allMovies.forEach((movie) => {
            if(movie.nameRU.toLowerCase().includes(name.toLowerCase()) && movie.duration > 40) {
            found.push(movie);
            }
          })
        }

        setFoundMovies(found);
        setNoFilteredMovies(found);
        if(!foundMovies.length) {
          setMoviesNotFound(true);
          setSearchMessage('По вашему запросу ничего не найдено :(');
        }
        setMoviesLoader(false);

      } else {

        setMoviesLoader(true);
        moviesApi.getMovies()
        .then((movies) => {
          if(shortMovies) {
            movies.forEach((movie) => {
              if(movie.nameRU.toLowerCase().includes(name.toLowerCase())) {
                found.push(movie);
              }
            })
          } else {
            movies.forEach((movie) => {
              if(movie.nameRU.toLowerCase().includes(name.toLowerCase()) && movie.duration > 40) {
              found.push(movie);
              }
            })
          }
            setFoundMovies(found);
            setNoFilteredMovies(found);
            localStorage.setItem('allMovies', JSON.stringify(movies));
            if(!foundMovies.length) {
              setMoviesNotFound(true);
              setSearchMessage('По вашему запросу ничего не найдено :(');
            }
        })
        .catch((err) => {
          console.log(err);
          setSearchMessage('Призошла ошибка на сервере');
        })
        .finally(() => {setMoviesLoader(false);})
      }

    } else {
      
      if(shortMovies) {
        userMovies.forEach((movie) => {
          if(movie.nameRU.toLowerCase().includes(name.toLowerCase())) {
            found.push(movie);
           }
        })
      } else {
        userMovies.forEach((movie) => {
          if(movie.nameRU.toLowerCase().includes(name.toLowerCase()) && movie.duration > 40) {
           found.push(movie);
          }
        })
      }
      
      //setUserMovies(found);
      setUserFoundMovies(found);
      if(!userMovies.length) {
        setMoviesNotFound(true);
        setSearchMessage('По вашему запросу ничего не найдено :(');
      }
    }
  }

  function changeshortMovies() {
    if(!foundMovies.length) {
      if (shortMovies) {
        setShortMovies(false);
      }
      else {
        setShortMovies(true);
      }
    } else {
      if (shortMovies) {
        setShortMovies(false);
        const newMovies = foundMovies.filter((mov) => mov.duration > 40);
        setFoundMovies(newMovies);
      }
      else {
        setShortMovies(true);
        setFoundMovies(nofilteredMovies);
      }
    }
  }

  function handleFilmSave(film) {
    const image = (`https://api.nomoreparties.co${film.image.url}`);
    mainApi.saveMovie(film.country, film.director, film.duration, film.year, film.description, 
      image, film.trailerLink, film.id, film.nameRU, film.nameEN, token)
    .then((newFilm) => {
        //setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        setUserMovies([newFilm.data, ...userMovies]);
        setUserFoundMovies([newFilm.data, ...userFoundMovies]);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleFilmDelete(film) {
    let id;
    if(location.pathname === '/saved-movies') {
      id = film._id;
    } else {
      const deleteMovie = userMovies.filter((mov) => mov.nameRU === film.nameRU);
      id = deleteMovie[0]._id;
    }
      setIsLoaderOpen(true);
      mainApi.deleteMovie(id, token).then(() => {
          const newUserMovies = userMovies.filter((m) => m._id !== id);
          const newUserFoundMovies = userFoundMovies.filter((m) => m._id !== id);
          setUserMovies(newUserMovies);
          setUserFoundMovies(newUserFoundMovies);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {setIsLoaderOpen(false);})
  }


  return (
    <UserContext.Provider value={currentUser}>
        <div className="page">
          <Header loggedIn={loggedIn} />

          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedForUser 
              path="/signup" 
              loggedIn={loggedIn} 
              component={Register} 
              onRegister={onRegister} 
              error={authError} 
            />
            <ProtectedForUser 
              path="/signin" 
              loggedIn={loggedIn} 
              component={Login} 
              onLogin={onLogin} 
              error={authError} 
            />
            <ProtectedRoute
                path="/movies"
                loggedIn={loggedIn}
                component={Movies} 
                ourCards={userMovies}
                movies={foundMovies}
                loader={moviesLoader}
                search={searchMovies}
                notFound={moviesNotFound}
                message={searchMessage}
                shortMovies={changeshortMovies}
                saveFilm={handleFilmSave}
                deleteFilm={handleFilmDelete}
              />
            <ProtectedRoute
                path="/saved-movies"
                loggedIn={loggedIn}
                component={SavedMovies}
                movies={userFoundMovies} 
                deleteFilm={handleFilmDelete}
                shortMovies={changeshortMovies}
                search={searchMovies}
                notFound={moviesNotFound}
                message={searchMessage}
              />
              <ProtectedRoute
                path="/profile"
                loggedIn={loggedIn}
                component={Profile}
                updateUser={handleUpdateUser}
                onSignOut={onSignOut}
                status={updateStatus}
              />
              <ProtectedForUser path="*" loggedIn={loggedIn} component={NotFound} />

          </Switch>

          {(loggedIn || location.pathname === '/') && location.pathname !== '/profile' 
          && location.pathname !== '*' && <Footer />}

        <Preloader isLoaderOpen={isLoaderOpen} />

        </div>
    </UserContext.Provider>
  );
}

export default App;

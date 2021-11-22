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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
  const [isLoaderOpen, setIsLoaderOpen] = React.useState(false);

  const [moviesLoader, setMoviesLoader] = React.useState(false);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [moviesNotFound, setMoviesNotFound] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState('');
  const [shortMovies, setShortMovies] = React.useState(true);
  const [nofilteredMovies, setNoFilteredMovies] = React.useState([]);

  const [userMovies, setUserMovies] = React.useState([]);

  React.useEffect(() => {
    function tokenCheck() {

        if(localStorage.getItem('token')) {
          const token = localStorage.getItem('token');

          if(token) {
            setIsLoaderOpen(true);
            mainApi.getUserInfo(token)
              .then((user) => {
                setLoggedIn(true);
                setToken(localStorage.getItem('token'));
                history.push('/movies');
                setCurrentUser(user);
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setIsLoaderOpen(false);
              })

              mainApi.getMovies(token)
                .then((movies) => {
                  setUserMovies(movies.data);
                })
                .catch((err) => {
                  console.log(err);
                })
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
    })
    .catch((err) => {
      console.log(err);
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
    })
    .catch((err) => {
      console.log(err);})
    .finally(() => {setIsLoaderOpen(false);})
  }

  function onLogin(password, email) {
    setIsLoaderOpen(true);
    mainApi.authorize(password, email)
    .then((data) => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      setToken(localStorage.getItem('token'));
      history.push('/movies');
    })
    .catch(err => console.log(err))
    .finally(() => {setIsLoaderOpen(false);})
  }

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('allMovies');
    setLoggedIn(false);
    setToken('');
    history.push('/');
  }

  function searchMovies(name) {
    let found = [];
    if(location.pathname === '/movies') {
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
          //console.log(found);
          //localStorage.setItem('allMovies', found);
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
    } else {
      userMovies.forEach((movie) => {
        if(movie.nameRU.toLowerCase().includes(name.toLowerCase())) {
          found.push(movie);
         }
      })

      setUserMovies(found);
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
        //setFoundMovies(localStorage.getItem('allMovies'));
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
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleFilmDelete(film) {
    setIsLoaderOpen(true);
      mainApi.deleteMovie(film._id, token).then(() => {
          //const newMovies = userMovies.filter((m) => m._id !== film._id);
          //setUserMovies(newMovies);
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
            <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={onLogin} />
            </Route>
            <ProtectedRoute
                path="/movies"
                loggedIn={loggedIn}
                component={Movies}
                //cards={cards} 
                ourCards={userMovies}
                movies={foundMovies}
                loader={moviesLoader}
                search={searchMovies}
                notFound={moviesNotFound}
                message={searchMessage}
                shortMovies={changeshortMovies}
                saveFilm={handleFilmSave}
              />
            <ProtectedRoute
                path="/saved-movies"
                loggedIn={loggedIn}
                component={SavedMovies}
                movies={userMovies} 
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
              />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>

          {(loggedIn || location.pathname === '/') && location.pathname !== '/profile' 
          && location.pathname !== '*' && <Footer />}

        <Preloader isLoaderOpen={isLoaderOpen} />

        </div>
    </UserContext.Provider>
  );
}

export default App;

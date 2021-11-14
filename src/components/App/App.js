import React from 'react';
import './App.css';

import { Route, Switch, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import { cards, ourCards } from '../../utils/cards';

function App() {
  //const [loggedIn, setLoggedIn] = React.useState(false);

  const location = useLocation();
  const loggedIn = location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/'; //временное решение

  const user = {
    name: 'Максим',
    email: 'pochta@yandex.ru'
  };

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/movies">
          <Movies cards={cards} ourCards={ourCards} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies cards={ourCards}/>
        </Route>
        <Route path="/profile">
          <Profile user={user} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      {loggedIn && location.pathname !== '/profile' && location.pathname !== '*' && <Footer />}
    </div>
  );
}

export default App;

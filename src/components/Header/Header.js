import React from 'react';

import './Header.css';
import logo from '../../images/logo.png';
import accLogo from '../../images/icon-acc.svg';

import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [buttonActive, setButtonActive] = React.useState(false);

  const mainPath = location.pathname === '/';
  const path = location.pathname === '/signin' || location.pathname === '/signup';
  const headerClassName = (`header ${!mainPath ? 'header_white' : ''} ${path ? 'hidden' : ''}`);

  let linkMovies = 'header__link';
  let linkSavedMovies = 'header__link';
  let linkProf = 'header__link header__link_prof';
  if(location.pathname === '/movies') {
    linkMovies = 'header__link header__link_active';
  } else if(location.pathname === '/saved-movies') {
    linkSavedMovies = 'header__link header__link_active';
  } else if(location.pathname === '/profile') {
    linkProf = 'header__link header__link_active header__link_prof';
  }

  function switchMenu() {
    if(menuOpen) {
      setButtonActive(false);
      setMenuOpen(false);
    } else {
      setButtonActive(true);
      setMenuOpen(true);
    }
  }

  const headerMenuClassName = (`header__menu ${menuOpen ? 'header__menu_active' : ''}`);
  const buttonClassName = (`header__menuButton ${buttonActive ? 'header__menuButton_active' : ''}`);

    return (
      <header className={headerClassName}>
          {!mainPath ? 
          <>
            <div className="header__left-panel">
              <Link to="/"><img src={logo} alt="Логотип" className="header__logo" /></Link>
              <div className="header__links">
                <Link to="/movies" className={linkMovies}>Фильмы</Link>
                <Link to="/saved-movies" className={linkSavedMovies}>Сохраненные фильмы</Link>
              </div>
            </div>
            <div className="header__right-panel">
              <Link to="/profile" className={linkProf}>Аккаунт <img src={accLogo} alt="Аккаунт" className="header__acc-logo" /></Link>
            </div>
            <button type="button" className={buttonClassName} onClick={switchMenu} aria-label="Меню"></button>
            <div className={headerMenuClassName}>
                <div className="header__menu-links">
                  <div className="header__top-links">
                    <Link to="/" className="header__link" onClick={switchMenu}>Главная</Link>
                    <Link to="/movies" className={linkMovies} onClick={switchMenu}>Фильмы</Link>
                    <Link to="/saved-movies" className={linkSavedMovies} onClick={switchMenu}>Сохраненные фильмы</Link>
                  </div>
                  <Link to="/profile" className={linkProf} onClick={switchMenu}>Аккаунт <img src={accLogo} alt="Аккаунт" className="header__acc-logo" /></Link>
                </div>
            </div>
          </> : 
          <> 
            <Link to="/"><img src={logo} alt="Логотип" className="header__logo" /></Link>
            <div>
              <Link to="/signup" className="header__signup">Регистрация</Link>
              <Link to="/signin" className="header__signin">Войти</Link>
            </div> 
          </>}
      </header>
    );
  }
  
  export default Header;
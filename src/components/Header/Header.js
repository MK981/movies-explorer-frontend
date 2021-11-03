import './Header.css';
import logo from '../../images/logo.png';

import { Link } from 'react-router-dom';

function Header() {
    return (
      <header className="header">
          <Link to="/" className="header__link"><img src={logo} alt="Логотип" className="header__logo" /></Link>
          <div>
            <Link to="/signup" className="header__signup">Регистрация</Link>
            <Link to="/signin" className="header__signin">Войти</Link>
          </div>
      </header>
    );
  }
  
  export default Header;
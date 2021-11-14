import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

function Register() {
    return (
        <div className="auth">
            <Link to="/" className="auth__link"><img src={logo} alt="Логотип" className="auth__logo" /></Link>
            <h1 className="auth__title">Добро пожаловать!</h1>
            <form className="auth__form auth__form_type_reg" name="reg">
                <label className="auth__label" htmlFor="name-input">Имя</label>
                <input type="text" className="auth__input" id="name-input" name="name-input" required />
                <label className="auth__label" htmlFor="email-input">E-mail</label>
                <input type="email" className="auth__input" id="email-input" name="email-input" required />
                <label className="auth__label" htmlFor="pass-input">Пароль</label>
                <input type="password" className="auth__input" id="pass-input" name="pass-input" required />
                <button type="submit" className="auth__submit">Зарегистрироваться</button>
            </form>
            <p className="auth__text">Уже зарегистрированы? <Link to="signin" className="auth__link">Войти</Link></p>
        </div>
    );
  }
  
  export default Register;
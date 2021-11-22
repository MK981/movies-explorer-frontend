import React from 'react';

import '../Register/Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

import { useFormWithValidation } from '../FormValidation/FormValidation';

function Login(props) {
    const form = useFormWithValidation();

    const emailInputClass = (`auth__input ${form.errors["email-input"] ? 'auth__input_error' : ''}`);
    const passInputClass = (`auth__input ${form.errors["pass-input"] ? 'auth__input_error' : ''}`);

    const buttonClass = (`auth__submit auth__submit_type_login ${!form.isValid ? 'auth__submit_disabled' : ''}`);

    function handleSubmit(e) {
        e.preventDefault();

        props.onLogin(form.values["pass-input"], form.values["email-input"]);
        form.resetForm();
    }

    return (
        <div className="auth">
            <Link to="/" className="auth__link"><img src={logo} alt="Логотип" className="auth__logo" /></Link>
            <h1 className="auth__title">Рады видеть!</h1>
            <form className="auth__form auth__form_type_login" name="reg" onSubmit={handleSubmit}>
                <label className="auth__label" htmlFor="email-input">E-mail</label>
                <input type="email" className={emailInputClass} id="email-input" name="email-input" value={form.values["email-input"] || ''} onChange={form.handleChange} required />
                {form.errors["email-input"] ? <span className="auth__error">{form.errors["email-input"]}</span> : <></>}
                <label className="auth__label" htmlFor="pass-input">Пароль</label>
                <input type="password" className={passInputClass} id="pass-input" name="pass-input" value={form.values["pass-input"] || ''} onChange={form.handleChange} minLength="4" maxLength="15" required />
                {form.errors["pass-input"] ? <span className="auth__error">{form.errors["pass-input"]}</span> : <></>}
                <button type="submit" className={buttonClass} disabled={!form.isValid}>Войти</button>
            </form>
            <p className="auth__text">Ещё не зарегистрированы? <Link to="signup" className="auth__link">Регистрация</Link></p>
        </div>
    );
  }
  
  export default Login;
import React from "react";

import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useFormWithValidation } from '../FormValidation/FormValidation';


function Register(props) {

    /*const [name, setName] = React.useState('');
    //const [nameError, setNameError] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }*/

    const form = useFormWithValidation();
    const nameInputClass = (`auth__input ${form.errors["name-input"] ? 'auth__input_error' : ''}`);
    const emailInputClass = (`auth__input ${form.errors["email-input"] ? 'auth__input_error' : ''}`);
    const passInputClass = (`auth__input ${form.errors["pass-input"] ? 'auth__input_error' : ''}`);

    const buttonClass = (`auth__submit ${!form.isValid ? 'auth__submit_disabled' : ''}`);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(form.values["email-input"])

        props.onRegister(form.values["pass-input"], form.values["email-input"], form.values["name-input"]);
        form.resetForm();
    }


    return (
        <div className="auth">
            <Link to="/" className="auth__link"><img src={logo} alt="Логотип" className="auth__logo" /></Link>
            <h1 className="auth__title">Добро пожаловать!</h1>
            <form className="auth__form auth__form_type_reg" name="reg" onSubmit={handleSubmit}>
                <label className="auth__label" htmlFor="name-input">Имя</label>
                <input type="text" className={nameInputClass} id="name-input" name="name-input" value={form.values["name-input"] || ''} onChange={form.handleChange} minLength="2" maxLength="30" required />
                {form.errors["name-input"] ? <span className="auth__error">{form.errors["name-input"]}</span> : <></>}
                <label className="auth__label" htmlFor="email-input">E-mail</label>
                <input type="email" className={emailInputClass} id="email-input" name="email-input" value={form.values["email-input"] || ''} onChange={form.handleChange} required />
                {form.errors["email-input"] ? <span className="auth__error">{form.errors["email-input"]}</span> : <></>}
                <label className="auth__label" htmlFor="pass-input">Пароль</label>
                <input type="password" className={passInputClass} id="pass-input" name="pass-input" value={form.values["pass-input"] || ''} onChange={form.handleChange} minLength="4" maxLength="15" required />
                {form.errors["pass-input"] ? <span className="auth__error">{form.errors["pass-input"]}</span> : <></>}
                <button type="submit" className={buttonClass} disabled={!form.isValid}>Зарегистрироваться</button>
            </form>
            <p className="auth__text">Уже зарегистрированы? <Link to="signin" className="auth__link">Войти</Link></p>
        </div>
    );
  }
  
  export default Register;
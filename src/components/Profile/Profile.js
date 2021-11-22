import React from 'react';
import './Profile.css';

import { UserContext } from '../../contexts/UserContext';
import { useFormWithValidation } from '../FormValidation/FormValidation';

function Profile(props) {

    const user = React.useContext(UserContext);
    const form = useFormWithValidation();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        setName(user.name);
        setEmail(user.email);
      }, [user]); 

    function handleNameChange(e) {
        form.handleChange(e);
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        form.handleChange(e);
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.updateUser(name, email);
        form.resetForm();
    }

    const nameInputClass = (`profile__input ${form.errors["name-input"] ? 'profile__input_error' : ''}`);
    const emailInputClass = (`profile__input ${form.errors["email-input"] ? 'profile__input_error' : ''}`);
    const buttonClass = (`profile__submit ${form.errors["name-input"] || form.errors["email-input"] ? 'profile__submit_disabled' : ''}`);

    return (
        <section className="profile">
            <h2 className="profile__greeting">Привет, {user.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__form-line">
                    <label className="profile__label" htmlFor="name-input">Имя</label>
                    <input type="text" className={nameInputClass} id="name-input" name="name-input" value={name} minLength="2" onChange={handleNameChange} required/>
                </div>
                {form.errors["name-input"] ? <span className="profile__error">{form.errors["name-input"]}</span> : <></>}
                <div className="line line_profile"></div>
                <div className="profile__form-line">
                    <label className="profile__label" htmlFor="email-input">Email</label>
                    <input type="email" className={emailInputClass} id="email-input" name="email-input" value={email} onChange={handleEmailChange} required/>
                </div>
                {form.errors["email-input"] ? <span className="profile__error">{form.errors["email-input"]}</span> : <></>}
                <button type="submit" className={buttonClass} disabled={form.errors["name-input"] || form.errors["email-input"]}>Редактировать</button>
            </form>
            <button type="button" className="profile__exit" onClick={props.onSignOut}>Выйти из аккаунта</button>
        </section>
    );
  }
  
  export default Profile;
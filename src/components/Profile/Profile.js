import React from 'react';
import './Profile.css';

function Profile(props) {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        setName(props.user.name);
        setEmail(props.user.email);
      }, []); 

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    return (
        <section className="profile">
            <h2 className="profile__greeting">Привет, {props.user.name}!</h2>
            <form className="profile__form">
                <div className="profile__form-line">
                    <label className="profile__label" htmlFor="name-input">Имя</label>
                    <input type="text" className="profile__input" id="name-input" name="name-input" value={name} onChange={handleNameChange} />
                </div>
                <div className="line line_profile"></div>
                <div className="profile__form-line">
                    <label className="profile__label" htmlFor="email-input">Email</label>
                    <input type="email" className="profile__input" id="email-input" name="email-input" value={email} onChange={handleEmailChange} />
                </div>
                <button type="submit" className="profile__submit">Редактировать</button>
            </form>
            <button type="button" className="profile__exit">Выйти из аккаунта</button>
        </section>
    );
  }
  
  export default Profile;
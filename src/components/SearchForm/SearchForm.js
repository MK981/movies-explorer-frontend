import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

    const [movieName, setMovieName] = React.useState('');
    const [error, setError] = React.useState('');

    function handleMovieNameChange(e) {
        setMovieName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(movieName !== '') {
            props.search(movieName);
            setError('');
        } else {
            setError('Введите название фильма');
        }
    }

    function changeshortMovies() {
        props.shortMovies();
    }

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <input type="text" className="search__input" id="movie-input" name="movie-input" placeholder="Фильм" value={movieName} onChange={handleMovieNameChange} />
                <button type="submit" className="search__submit"></button>
            </form>
            {error !== '' ? <span className="search__error">{error}</span> : <></>}
            <form className="search__check-form">
                <input type="checkbox" className="search__checkbox" id="movie-check" name="movie-check" onChange={changeshortMovies} defaultChecked />
                <label className="search__label" htmlFor="movie-check"></label>
                <p className="search__group">Короткометражки</p>
            </form>
            <div className="search__line"></div>
        </section>
    );
  }
  
  export default SearchForm;
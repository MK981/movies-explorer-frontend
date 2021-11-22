import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

    const [movieName, setMovieName] = React.useState('');

    function handleMovieNameChange(e) {
        setMovieName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.search(movieName);
    }

    function changeshortMovies() {
        props.shortMovies();
    }

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <input type="text" className="search__input" id="movie-input" name="movie-input" placeholder="Фильм" value={movieName} onChange={handleMovieNameChange} required />
                <button type="submit" className="search__submit"></button>
            </form>
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
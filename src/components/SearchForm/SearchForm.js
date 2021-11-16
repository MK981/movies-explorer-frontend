import './SearchForm.css';

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input type="text" className="search__input" id="movie-input" name="movie-input" placeholder="Фильм" />
                <button type="submit" className="search__submit"></button>
            </form>
            <form className="search__check-form">
                <input type="checkbox" className="search__checkbox" id="movie-check" name="movie-check" defaultChecked />
                <label className="search__label" htmlFor="movie-check"></label>
                <p className="search__group">Короткометражки</p>
            </form>
            <div className="search__line"></div>
        </section>
    );
  }
  
  export default SearchForm;
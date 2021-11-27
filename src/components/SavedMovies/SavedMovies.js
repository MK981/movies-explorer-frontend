import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
    return (
        <section className="saved-movies">
            <SearchForm search={props.search} shortMovies={props.shortMovies} />
            <MoviesCardList movies={props.movies} deleteFilm={props.deleteFilm} notFound={props.notFound} message={props.message} />
        </section>
    );
  }
  
  export default SavedMovies;
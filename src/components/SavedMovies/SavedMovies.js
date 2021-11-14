import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';

function SavedMovies(props) {
    return (
        <section className="saved-movies">
            <SearchForm />
            <MoviesCardList cards={props.cards} />
            {props.cards.length > 3 && <More />}
        </section>
    );
  }
  
  export default SavedMovies;
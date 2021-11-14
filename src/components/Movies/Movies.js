import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';

function Movies(props) {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList cards={props.cards} ourCards={props.ourCards} />
            {props.cards.length > 3 && <More />}
        </section>
    );
  }
  
  export default Movies;
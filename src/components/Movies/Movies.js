import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
    //стэйт текущее количествто карт, чтоб кнопка понимала откуда докидывать
    //стэйт сколько отражать на странице
    //стэйт сколько докидывать кнопке
    //как то кнопка нажимается какой-то стэт меняется передается наверх передается в кардлист и там запускается доп отрисовка
    //или функция отрисовки
    

    return (
        <section className="movies">
            <SearchForm search={props.search} shortMovies={props.shortMovies} />
            <MoviesCardList movies={props.movies} cards={props.cards} ourCards={props.ourCards} 
            loader={props.loader} notFound={props.notFound} message={props.message} saveFilm={props.saveFilm} deleteFilm={props.deleteFilm} />
        </section>
    );
  }
  
  export default Movies;
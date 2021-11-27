import React from 'react';
import './MoviesCardList.css';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';
import More from '../More/More';

import { useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function MoviesCardList(props) {
    const user = React.useContext(UserContext);
    const location = useLocation();
    const path = location.pathname === '/movies';

    const [showCardsNumber, setShowCardsNumber] = React.useState(0);  //сколько показ в завис от экрана
    const [showCards, setShowCards] = React.useState([]); //массив с тем скок показывать

    const [cardsNumber, setCardsNumber] = React.useState(0);  //стартовое количество в завис от экрана
    const [moreCards, setMoreCards] = React.useState(3);  //по сколько докидывать

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    React.useEffect(() => {
        const windowSize = window.innerWidth;
        countMovies(windowSize);
        const number = Math.min(props.movies.length, cardsNumber);
        setShowCardsNumber(number);
        setShowCards(props.movies.slice(0, number));
    }, [props.movies, cardsNumber]);

    function handleResize() {
        const windowSize = window.innerWidth;
        countMovies(windowSize);
    }

    function getMoreCards() {
        const number = Math.min(props.movies.length, showCardsNumber + moreCards);
        const moreMovies = props.movies.slice(showCardsNumber, number);
        setShowCards([...showCards, ...moreMovies]);
        setShowCardsNumber(number);
    }

    function countMovies(size) {
        if(size >= 1280) {
            setCardsNumber(12);
            setMoreCards(3);
        } else if(size >= 780 && size < 1280) {
            setCardsNumber(8);
            setMoreCards(2);
        } else {
            setCardsNumber(5);
            setMoreCards(2);
        }
    }

    let ourMovies;
    if(props.ourCards) {
        ourMovies = props.ourCards.filter((mov) => mov.owner === user._id);
    }

    function switchBlocks() {
        if(props.movies.length) {
            return (
                <>
                    <section className="card-list">
                        {showCards.map((card, i) => {
                            let movie;
                            if(props.ourCards) {
                                const check = ourMovies.some(ourCard => {
                                    return ourCard.nameRU === card.nameRU;
                                })
                                movie = <Card key={card.id} saved={check} card={card} path={path} saveFilm={props.saveFilm} deleteFilm={props.deleteFilm} />;
                            } else if(card.owner === user._id) {
                                movie = <Card key={card._id} saved={false} card={card} path={path} deleteFilm={props.deleteFilm} />;
                            }

                            return movie;
                        })}
                     </section>
                     {showCardsNumber < props.movies.length && props.movies.length > 3 && <More getMoreCards={getMoreCards} />}
                </>
            );
        } else if(props.notFound) {
            return (
                <section className="card-list no-cards">
                    <p className="card-list__message">{props.message}</p>
                </section>
            );
        } else {
            return (
                <section className="card-list no-cards">
                    <p className="card-list__message">Сделайте поиск</p>
                </section>
            );
        }
    }

    return (
        <>
            {props.loader ? <section className="card-list"><Preloader loader={props.loader} /></section> : switchBlocks() }
        </>
    );
  }
  
  export default MoviesCardList;
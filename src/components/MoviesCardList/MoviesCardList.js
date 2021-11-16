import './MoviesCardList.css';
import Card from '../Card/Card';

import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
    const location = useLocation();
    const path = location.pathname === '/movies';

    return (
        <section className="card-list">
            {props.cards.map((card, i) => {
                let movie;
                if(props.ourCards) {
                    const check = props.ourCards.some(ourCard => {
                        return ourCard._id === card._id;
                    })
                    movie = <Card key={card._id} saved={check} card={card} path={path} />;
                } else {
                    movie = <Card key={card._id} saved={false} card={card} path={path} />;
                }

                return movie;
            })}
        </section>
    );
  }
  
  export default MoviesCardList;
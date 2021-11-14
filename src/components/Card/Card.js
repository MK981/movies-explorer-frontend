import './Card.css';

function Card(props) {

    const cardClassName = (`card ${props.path ? 'card_main' : 'card_saved'} ${props.saved ? '' : 'card_main_noadded'}`);
    const cardAddedClassName = (`card__added ${props.saved ? 'card__added_active' : ''}`);

    return (
        <div className={cardClassName}>
            <img src={props.card.thumbnail} alt={props.card.nameRU} className="card__photo" />
            {props.path ? 
            <>
                <button type="button" className="card__save">Сохранить</button>
                <div className={cardAddedClassName}></div>
            </> : 
            <button type="button" className="card__delete"></button>}
            <div className="card__info">
                <h3 className="card__title">{props.card.nameRU}</h3>
                <span className="card__duration">{props.card.duration}</span>
            </div>
        </div>
    );
  }
  
  export default Card;
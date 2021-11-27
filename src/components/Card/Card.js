import './Card.css';

function Card(props) {

    const cardClassName = (`card ${props.path ? 'card_main' : 'card_saved'} ${props.saved ? '' : 'card_main_noadded'}`);
    const cardAddedClassName = (`card__added ${props.saved ? 'card__added_active' : ''}`);
    const src = (`https://api.nomoreparties.co${props.card.image.url}`);

    function onSaveClick() {
        props.saveFilm(props.card);
    }

    function onDeleteClick() {
        props.deleteFilm(props.card);
    }

    return (
        <div className={cardClassName}>
            <a href={props.card.trailerLink} target="_blank" rel="noreferrer">
                <img src={props.path ? src : props.card.image} alt={props.card.nameRU} className="card__photo" />
            </a>
            {props.path ? 
            <>
                <button type="button" className="card__save" onClick={onSaveClick}>Сохранить</button>
                <div className={cardAddedClassName} onClick={onDeleteClick}></div>
            </> : 
            <button type="button" className="card__delete" onClick={onDeleteClick}></button>}
            <div className="card__info">
                <h3 className="card__title">{props.card.nameRU}</h3>
                <span className="card__duration">{props.card.duration} м</span>
            </div>
        </div>
    );
  }
  
  export default Card;
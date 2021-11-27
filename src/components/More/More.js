import React from 'react';
import './More.css';

function More(props) {
    /*const [cardsNumber, setCardsNumber] = React.useState(0);

    React.useEffect(() => {

    });*/

    return (
        <section className="more">
            <button type="button" className="more__button" onClick={props.getMoreCards}>Ещё</button>
        </section>
    );
  }
  
  export default More;
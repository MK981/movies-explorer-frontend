import './Promo.css';
import promoLogo from '../../images/landing-logo.svg';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__text">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <img src={promoLogo} alt="Логотип" className="promo__logo" />
        </section>
    );
  }
  
  export default Promo;
import './Footer.css';

function Footer() {
    return (
      <footer className="footer">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="line"></div>
        <div className="footer__bottom">
            <p className="footer__date">&copy; 2021</p>
            <nav>
              <ul className="footer__nav">
                <li className="footer__list-item"><a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                <li className="footer__list-item"><a href="https://github.com" className="footer__link" target="_blank" rel="noreferrer">Github</a></li>
                <li className="footer__list-item"><a href="https://facebook.com" className="footer__link" target="_blank" rel="noreferrer">Facebook</a></li>
              </ul>
            </nav>
        </div>
      </footer>
    );
  }
  
  export default Footer;
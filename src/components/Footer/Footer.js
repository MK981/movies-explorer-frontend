import './Footer.css';

function Footer() {
    return (
      <footer className="footer">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="line"></div>
        <div className="footer__bottom">
            <p className="footer__date">&copy; 2021</p>
            <nav>
              <ul class="footer__nav">
                <li class="footer__list-item"><a href="https://practicum.yandex.ru" class="footer__link" target="_blank">Яндекс.Практикум</a></li>
                <li class="footer__list-item"><a href="https://github.com" class="footer__link" target="_blank">Github</a></li>
                <li class="footer__list-item"><a href="https://facebook.com" class="footer__link" target="_blank">Facebook</a></li>
              </ul>
            </nav>
        </div>
      </footer>
    );
  }
  
  export default Footer;
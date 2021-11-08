import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>

            <div className="portfolio__site-list">
                <a href="https://github.com/MK981/how-to-learn" target="_blank" className="portfolio__site">
                    <div className="portfolio__link">
                        <p className="portfolio__link-text">Статичный сайт</p>
                        <p className="portfolio__arrow">↗</p>
                    </div>
                </a>
                <div className="line"></div>
                <a href="https://github.com/MK981/russian-travel" target="_blank" className="portfolio__site">
                    <div className="portfolio__link">
                        <p className="portfolio__link-text">Адаптивный сайт</p>
                        <p className="portfolio__arrow">↗</p>
                    </div>
                </a>
                <div className="line"></div>
                <a href="https://maxfront.nomoredomains.monster/" target="_blank" className="portfolio__site">
                    <div className="portfolio__link">
                        <p className="portfolio__link-text">Одностраничное приложение</p>
                        <p className="portfolio__arrow">↗</p>
                    </div>
                </a>
            </div>
        </section>
    );
  }
  
  export default Portfolio;
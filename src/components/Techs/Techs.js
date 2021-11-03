import './Techs.css';
import NavTab from '../NavTab/NavTab';

function Techs() {
    return (
        <section className="techs">
            <NavTab title="Технологии"/>
            <div className="techs__content">
                <h2 className="techs__title">7 технологий</h2>
                <p className="techs__info">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <div className="techs__techs-list">
                <div className="techs__item"><p className="techs__item-text">HTML</p></div>
                <div className="techs__item"><p className="techs__item-text">CSS</p></div>
                <div className="techs__item"><p className="techs__item-text">JS</p></div>
                <div className="techs__item"><p className="techs__item-text">React</p></div>
                <div className="techs__item"><p className="techs__item-text">Git</p></div>
                <div className="techs__item"><p className="techs__item-text">Express.js</p></div>
                <div className="techs__item"><p className="techs__item-text">mongoDB</p></div>
            </div>
        </section>
    );
  }
  
  export default Techs;
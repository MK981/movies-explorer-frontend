import './AboutProject.css';
import NavTab from '../NavTab/NavTab';

function AboutProject() {
    return (
        <section className="about-project">
            <NavTab title="О проекте"/>
            <div className="about-project__text-panel">
                <div className="about-project__info">
                    <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__info">
                    <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__period">
                <div className="about-project__left-period">
                    <div className="about-project__one-week">
                        <p className="about-project__week about-project__week_type_left">1 неделя</p>
                    </div>
                    <p className="about-project__part">Back-end</p>
                </div>
                <div className="about-project__right-period">
                    <div className="about-project__four-weeks">
                        <p className="about-project__week">4 недели</p>
                    </div>
                    <p className="about-project__part">Front-end</p>
                </div>
            </div>
        </section>
    );
  }
  
  export default AboutProject;
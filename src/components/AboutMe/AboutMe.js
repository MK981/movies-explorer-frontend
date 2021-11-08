import './AboutMe.css';
import NavTab from '../NavTab/NavTab';
import photo from '../../images/photo.jpg';

import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section className="about-me">
            <NavTab title="Студент"/>
            <div className="about-me__content">
                <div className="about-me__info">
                    <h2 className="about-me__name">Максим</h2>
                    <h3 className="about-me__age">Фронтенд-разработчик, 23 года.</h3>
                    <p className="about-me__text">Родился и живу в городе Москва. Учусь на втором курсе магистратуры в университете 
                        РТУ МИРЭА по направлению Прикладная информатика. Занимаюсь веб-разработкой и 
                        заканчиваю одноименное направление на Яндекс.Практикуме.</p>
                    <div className="about-me__links">
                        <a href="https://vk.com" target="_blank" className="about-me__link">ВКонтакте</a>
                        <a href="https://github.com/MK981" target="_blank" className="about-me__link">Github</a>
                    </div>
                </div>
                <img src={photo} alt="Студент" className="about-me__photo" />
            </div>
            <Portfolio />
        </section>
    );
  }
  
  export default AboutMe;
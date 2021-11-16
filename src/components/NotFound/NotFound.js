import './NotFound.css';
import { useHistory } from 'react-router-dom';

function NotFound() {
    const history = useHistory();

    return (
        <section className="not-found">
            <div className="not-found__content">
                <h2 className="not-found__type">404</h2>
                <p className="not-found__text">Страница не найдена</p>
                <button type="button" className="not-found__back" onClick={history.goBack}>Назад</button>
            </div>
        </section>
    );
  }
  
  export default NotFound;
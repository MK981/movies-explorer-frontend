import './NavTab.css';

function NavTab(props) {
    return (
        <div className="nav-tab">
            <h2 className="nav-tab__title">{props.title}</h2>
        </div>
    );
  }
  
  export default NavTab;
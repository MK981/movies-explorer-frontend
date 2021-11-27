import React from 'react';
import './Preloader.css';

const Preloader = (props) => {
    const loaderClass = (`preloader ${props.isLoaderOpen || props.loader ? 'preloader_open' : ''}`);

    return (
        <div className={loaderClass}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader

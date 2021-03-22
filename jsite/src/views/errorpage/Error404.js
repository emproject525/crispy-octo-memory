import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * 404 NotFound
 */
const Error404 = ({ defaultLink }) => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops, The Page you are looking for can't be found!</h2>
                <NavLink to={defaultLink}>
                    <span className="arrow"></span>Return To Homepage
                </NavLink>
            </div>
        </div>
    );
};

export default Error404;

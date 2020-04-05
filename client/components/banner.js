import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/img/vertical-logo.png';

const Banner = () => (
    <>
        <Link to="/">
            <img src={logo} alt="FN Dash" />
        </Link>
        <h5>Detailed Fortnite Stat Tracking</h5>
        <nav className="nav">
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </nav>
        <hr />
    </>
);

export default Banner;

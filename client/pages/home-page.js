import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, NavLink } from 'react-router-dom';
import moment from 'moment';
import logo from 'assets/img/vertical-logo.png';

const HomePage = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/games/active');
            const data = await res.json();

            setGames(data);
        })();
    }, []);

    const renderGames = () =>
        games.map(g => (
            <div key={g.id} className="active-game">
                <Link to={`/users/${g.stat.input.user.id}`}>
                    <h5>{g.stat.input.user.username}</h5>
                    <p>Played {moment(g.timePlayed).fromNow()}</p>
                    <div>
                        <span>{g.kills} Kills</span>
                        <span>{g.placement}</span>
                    </div>
                </Link>
            </div>
        ));

    return (
        <>
            <Helmet>
                <title>FN Dash</title>
            </Helmet>
            <div className="home-container">
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
                <section>
                    <h3>Active Users</h3>
                    {renderGames()}
                </section>
            </div>
        </>
    );
};

export default HomePage;

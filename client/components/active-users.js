import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ActiveUsers = () => {
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
            <Col xs={12} key={g.id} className="active-game">
                <Link to={`/users/${g.stat.input.user.id}`}>
                    <h5>{g.stat.input.user.username}</h5>
                    <p>Played {moment(g.timePlayed).fromNow()}</p>
                    <div>
                        <span>{g.kills} Kills</span>
                        <span>{g.placement}</span>
                    </div>
                </Link>
            </Col>
        ));

    return (
        <main>
            <h3>Active Users</h3>
            <Row>{renderGames()}</Row>
        </main>
    );
};

export default ActiveUsers;

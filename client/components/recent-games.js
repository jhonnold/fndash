import React, { useEffect, useState } from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Card from '../components/card';
import getIconForPlacement from '../util/icon-for-placement';

const RecentGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/games/recent');
            const data = await res.json();

            setGames(data);
        })();
    }, []);

    const renderGames = () =>
        games.map(g => (
            <Col xs={12} key={g.id} className="recent-game">
                <Link to={`/users/${g.stat.input.user.id}`}>
                    <Grid>
                        <Row between="xs" middle="xs">
                            <h4 className={g.stat.mode}>
                                {g.stat.name} {g.stat.mode} match
                            </h4>
                            <h5>{g.stat.input.user.username}</h5>
                        </Row>
                        <Row>
                            <label>Played {moment(g.timePlayed).fromNow()}</label>
                        </Row>
                        <Row between="xs" bottom="xs" style={{ marginTop: 20 }}>
                            <span>
                                <FontAwesomeIcon style={{ marginRight: 5 }} icon={getIconForPlacement(g.placement)} />
                                {g.placement}
                            </span>
                            <span>{g.kills} Kills</span>
                        </Row>
                    </Grid>
                </Link>
            </Col>
        ));

    return (
        <main>
            <Card title="Recent Games">{renderGames()}</Card>
        </main>
    );
};

export default RecentGames;

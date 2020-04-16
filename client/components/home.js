import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Error from './error';
import useFetch from '../util/use-fetch';
import Card from './card';
import SearchUser from './search-user';
import getIconForPlacement from '../util/icon-for-placement';

const Home = () => {
    const res = useFetch('/api/games/recent');

    const renderGames = games =>
        games &&
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
                            {/* See game-service.js */}
                            <label>Played {moment(g.timePlayed).from('2019-08-25 08:00:00.000Z')}</label>
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
            <Row>
                <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
                    <Card title="Tracked Players">
                        <SearchUser />
                    </Card>
                    <Card title="Recent Games" loading={res.loading}>
                        {res.error ? (
                            <Col xs={12}>
                                <Error message="Unable to load recent games!" />
                            </Col>
                        ) : (
                            renderGames(res.body)
                        )}
                    </Card>
                </Col>
            </Row>
        </main>
    );
};

export default Home;

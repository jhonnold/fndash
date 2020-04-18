import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import qs from 'querystring';
import Error from './error';
import useFetch from '../util/use-fetch';
import Card from './card';
import getIconForPlacement from '../util/icon-for-placement';

const Games = ({ inputId, mode }) => {
    const params = {
        inputId,
        mode: mode !== 'all' ? mode : undefined,
    };
    const res = useFetch(`/api/games?${qs.stringify(params)}`);

    return (
        <Card title="Games" style={{ maxHeight: '41.75rem', overflow: 'auto' }} loading={res.loading}>
            {res.error ? (
                <Col xs={12}>
                    <Error message="Unable to load games!" />
                </Col>
            ) : res.body && res.body.games.length ? (
                res.body.games.map(g => (
                    <Col xs={12} key={g.id} className="recent-game">
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
                                    <FontAwesomeIcon
                                        style={{ marginRight: 5 }}
                                        icon={getIconForPlacement(g.placement)}
                                    />
                                    {g.placement}
                                </span>
                                <span>{g.kills} Kills</span>
                            </Row>
                        </Grid>
                    </Col>
                ))
            ) : (
                <p className="text-off-white">No games recoreded!</p>
            )}
        </Card>
    );
};

export default Games;

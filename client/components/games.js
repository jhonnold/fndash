import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _slice from 'lodash/slice';
import moment from 'moment';
import Card from './card';
import SearchUser from './search-user';
import getIconForPlacement from '../util/icon-for-placement';

const Games = ({ games }) => (
    <Card title="Games">
        {_slice(games, 0, 20).map(g => (
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
                            <FontAwesomeIcon style={{ marginRight: 5 }} icon={getIconForPlacement(g.placement)} />
                            {g.placement}
                        </span>
                        <span>{g.kills} Kills</span>
                    </Row>
                </Grid>
            </Col>
        ))}
    </Card>
);

export default Games;

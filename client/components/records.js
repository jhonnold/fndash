import React from 'react';
import { Col, Row, Grid } from 'react-flexbox-grid';
import _groupBy from 'lodash/groupBy';
import _maxBy from 'lodash/maxBy';
import _includes from 'lodash/includes';
import _transform from 'lodash/transform';
import _keys from 'lodash/keys';
import _pick from 'lodash/pick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import getIconForPlacement from '../util/icon-for-placement';
import Card from './card';

const Records = ({ games }) => {
    const gamesByMode = _pick(_groupBy(games, 'stat.mode'), ['solo', 'duo', 'trios', 'squad']);
    const records = _transform(gamesByMode, (r, v, k) => (r[k] = _maxBy(v, 'kills')), {});

    return (
        <Card title="Records">
            {_keys(records).map(k => {
                const g = records[k];

                return (
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
                );
            })}
        </Card>
    );
};

export default Records;

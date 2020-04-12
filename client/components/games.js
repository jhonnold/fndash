import React, { useState, useEffect } from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { BarLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _slice from 'lodash/slice';
import moment from 'moment';
import Card from './card';
import getIconForPlacement from '../util/icon-for-placement';
import colors from '../util/colors';

const Games = ({ inputId }) => {
    const [gameInfo, setGameInfo] = useState(null);

    useEffect(() => {
        (async () => {
            if (!inputId) return;

            const res = await fetch(`/api/games?inputId=${inputId}`);
            const data = await res.json();

            setGameInfo(data);
        })();
    }, [inputId]);

    return (
        <Card title="Games" style={{ maxHeight: '41.75rem', overflow: 'auto' }}>
            {gameInfo ? (
                gameInfo.games.map(g => (
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
                <Col>
                    <Row center="xs">
                        <BarLoader color={colors.lightGreen} />
                    </Row>
                </Col>
            )}
        </Card>
    );
};

export default Games;

import React, { useEffect, useState } from 'react';
import { Col, Row, Grid } from 'react-flexbox-grid';
import { BarLoader } from 'react-spinners';
import _groupBy from 'lodash/groupBy';
import _maxBy from 'lodash/maxBy';
import _includes from 'lodash/includes';
import _transform from 'lodash/transform';
import _keys from 'lodash/keys';
import _pick from 'lodash/pick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import getIconForPlacement from '../util/icon-for-placement';
import colors from '../util/colors';
import Card from './card';

const Records = ({ inputId }) => {
    const [records, setRecords] = useState(null);

    useEffect(() => {
        (async () => {
            if (!inputId) return;

            const res = await fetch(`/api/games/records?inputId=${inputId}`);
            const data = await res.json();

            setRecords(data);
        })();
    }, [inputId]);

    return (
        <Card title="Records">
            {records ? (
                records.map(g => (
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

export default Records;

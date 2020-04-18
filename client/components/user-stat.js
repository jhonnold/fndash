import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faGamepad, faSkull, faCrosshairs, faCross } from '@fortawesome/free-solid-svg-icons';
import qs from 'querystring';
import useFetch from '../util/use-fetch';
import Card from './card';

const Stat = ({ title, icon, value }) => (
    <Card>
        <Col xs={12}>
            <h1 style={{ margin: 0 }}>{value}</h1>
        </Col>
        <Col xs={12}>
            <Grid>
                <Row middle="xs">
                    <FontAwesomeIcon style={{ marginRight: '0.5rem' }} icon={icon} />
                    <h3 style={{ margin: 0 }}>{title}</h3>
                </Row>
            </Grid>
        </Col>
    </Card>
);

const UserStats = ({ inputId, mode }) => {
    const params = {
        mode: mode !== 'all' ? mode : undefined,
    };
    const res = useFetch(`/api/inputs/${inputId}/stats?${qs.stringify(params)}`);

    if (res.loading || res.error) return null;
    const { body: stats } = res;

    return (
        <Row>
            <Col xs={6} md={3}>
                <Grid>
                    <Stat value={stats.wins} title="Victories" icon={faTrophy} />
                </Grid>
            </Col>
            <Col xs={6} md={3}>
                <Grid>
                    <Stat value={stats.matches} title="Matches" icon={faGamepad} />
                </Grid>
            </Col>
            <Col xs={6} md={3}>
                <Grid>
                    <Stat value={stats.kills} title="Kills" icon={faSkull} />
                </Grid>
            </Col>
            <Col xs={6} md={3}>
                <Grid>
                    <Stat value={stats.kd.toFixed(3)} title="K/D" icon={faCrosshairs} />
                </Grid>
            </Col>
        </Row>
    );
};

export default UserStats;

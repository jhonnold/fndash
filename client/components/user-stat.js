import React, { useState, useEffect } from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faGamepad, faSkull, faCrosshairs, faCross } from '@fortawesome/free-solid-svg-icons';
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

const UserStats = ({ inputId }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        (async () => {
            if (!inputId) return;

            const res = await fetch(`/api/inputs/${inputId}/stats`);
            const data = await res.json();

            setStats(data);
        })();
    }, [inputId]);

    if (!stats) return null;

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
}

export default UserStats;
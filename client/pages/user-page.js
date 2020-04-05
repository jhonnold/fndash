import React, { useState, useEffect } from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import _get from 'lodash/get';
import logo from '../assets/img/horizontal-logo.png';
import Records from '../components/records';

const UserPage = props => {
    const [user, setUser] = useState({});
    const [games, setGames] = useState([]);
    const input = _get(user, ['inputs', 0], {});

    useEffect(() => {
        (async () => {
            const { userId } = props.match.params;
            const res = await fetch(`/api/users/${userId}`);
            const data = await res.json();

            setUser(data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!input.id) return;

            const res = await fetch(`/api/games?inputId=${input.id}`);
            const data = await res.json();

            setGames(data);
        })();
    }, [input.id]);

    return (
        <>
            <Helmet>
                <title>{`${user.username || ''} Stats - FN Dash`}</title>
            </Helmet>
            <Grid fluid style={{ backgroundColor: '#2b2e3d' }}>
                <Grid>
                    <Row between="xs">
                        <Col>
                            <Link to="/">
                                <img src={logo} alt="FN Dash" style={{ height: 40 }} />
                            </Link>
                        </Col>
                        <Col>Search For...</Col>
                    </Row>
                    <Row between="xs" bottom="xs">
                        <Col>
                            <h1>{user.username}</h1>
                        </Col>
                        <Col>
                            <Row tagName="ul">
                                <Col>All</Col>
                                <Col>Solo</Col>
                                <Col>Duo</Col>
                                <Col>Squad</Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Grid>
            <Grid>
                <Row>
                    <Col xs={12} sm={6}>
                        <Records games={games} />
                    </Col>
                    <Col xs={12} sm={6}>
                        Test
                    </Col>
                </Row>
            </Grid>
        </>
    );
};

export default UserPage;

import React, { useState, useEffect } from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import _get from 'lodash/get';
import logo from '../assets/img/horizontal-logo.png';
import SearchUser from '../components/search-user';
import Records from '../components/records';
import Games from '../components/games';
import DailyKD from '../components/daily-kd';
import DailyGameCount from '../components/daily-game-count';

const UserPage = props => {
    const [user, setUser] = useState({});
    const [games, setGames] = useState([]);
    const input = _get(user, ['inputs', 0], {});

    const { userId } = props.match.params;

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/users/${userId}`);
            const data = await res.json();

            setUser(data);
        })();
    }, [userId]);

    return (
        <>
            <Helmet>
                <title>{`${user.username || ''} Stats - FN Dash`}</title>
            </Helmet>
            <Grid fluid style={{ backgroundColor: '#2b2e3d', padding: '1rem', marginBottom: '1rem' }}>
                <Grid>
                    <Row between="xs">
                        <Col xs={4}>
                            <Link to="/">
                                <img src={logo} alt="FN Dash" style={{ height: 40 }} />
                            </Link>
                        </Col>
                        <Col lg={3} md={4} xs={6}>
                            <SearchUser />
                        </Col>
                    </Row>
                    <Row center="xs" bottom="xs">
                        <Col>
                            <h1 className="username">{user.username}</h1>
                        </Col>
                    </Row>
                </Grid>
            </Grid>
            <Grid>
                <Row>
                    <Col xs={12} md={6}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <Records inputId={input.id} />
                                </Col>
                                <Col xs={12}>
                                    <Games inputId={input.id} />
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                    <Col xs={12} md={6}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <DailyGameCount inputId={input.id} />
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
            </Grid>
        </>
    );
};

export default UserPage;

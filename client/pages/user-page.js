import React, { useState, useEffect } from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import _get from 'lodash/get';
import Select from 'react-select';
import logo from '../assets/img/horizontal-logo.png';
import SearchUser from '../components/search-user';
import Records from '../components/records';
import Games from '../components/games';
import DailyKD from '../components/daily-kd';
import DailyGameCount from '../components/daily-game-count';
import UserStats from '../components/user-stat';
import Placements from '../components/placements';
import { selectStyles } from '../config/select-styles';
import { inputTypes } from '../config/inputs';

const UserPage = props => {
    const { userId } = props.match.params;
    const [user, setUser] = useState({});
    const [input, setInput] = useState({});
    const [mode, setMode] = useState({ label: 'All', value: 'all' });

    const inputs = _get(user, ['inputs'], [])
        .filter(i => i.inputType !== 'bestscore')
        .map(i => ({ value: i.id, label: inputTypes[i.inputType] }));
    const modes = [
        { label: 'All', value: 'all' },
        { label: 'Solo', value: 'solo' },
        { label: 'Duo', value: 'duo' },
        { label: 'Trios', value: 'trios' },
        { label: 'Squad', value: 'squad' },
    ];

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch(`/api/users/${userId}`);
            const data = await res.json();

            setUser(data);

            const firstInput = data.inputs[0];
            setInput({ value: firstInput.id, label: inputTypes[firstInput.inputType] });
        };

        setMode({ label: 'All', value: 'all' });
        loadUser();
    }, [userId]);

    const filters = {
        inputId: input.value,
        mode: mode.value,
    };

    return (
        <>
            <Helmet>
                <title>{`${user.username || ''} Stats - FN Dash`}</title>
            </Helmet>
            <Grid fluid style={{ backgroundColor: '#2b2e3d', marginBottom: '1rem' }}>
                <Grid style={{ padding: '1rem 0' }}>
                    <Row between="xs">
                        <Col xs>
                            <Link to="/">
                                <img src={logo} alt="FN Dash" style={{ height: 40 }} />
                            </Link>
                        </Col>
                        <Col xs={6} sm={4}>
                            <SearchUser />
                        </Col>
                    </Row>
                    <Row center="xs">
                        <h1 style={{ margin: '0.5rem 0', fontFamily: 'Fortnite', fontSize: '3rem' }}>
                            {user.username}
                        </h1>
                    </Row>
                    <Row style={{ margin: '0.5rem 0' }}>
                        <Col xs tagName="hr" />
                    </Row>
                    <Row>
                        <Col xs={6}>
                            {inputs.length && (
                                <>
                                    <p className="text-off-white" style={{ marginBottom: '0.5rem' }}>
                                        Input
                                    </p>
                                    <Select
                                        styles={selectStyles}
                                        isClearable={false}
                                        placeholder="Select an input..."
                                        options={inputs}
                                        value={input}
                                        onChange={setInput}
                                    />
                                </>
                            )}
                        </Col>
                        <Col xs={6}>
                            <p className="text-off-white" style={{ marginBottom: '0.5rem' }}>
                                Mode
                            </p>
                            <Select
                                styles={selectStyles}
                                isClearable={false}
                                placeholder="Selet a mode..."
                                options={modes}
                                value={mode}
                                onChange={setMode}
                            />
                        </Col>
                    </Row>
                </Grid>
            </Grid>
            <Grid fluid className="main">
                <Grid>
                    {input.value && (
                        <>
                            <UserStats {...filters} />
                            <Row>
                                <Col xs={12} md={6}>
                                    <Grid>
                                        <Row>
                                            <Col xs={12}>
                                                <Records {...filters} />
                                            </Col>
                                            <Col xs={12}>
                                                <Games {...filters} />
                                            </Col>
                                        </Row>
                                    </Grid>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Grid>
                                        <Row>
                                            <Col xs={12}>
                                                <DailyKD {...filters} />
                                            </Col>
                                            <Col xs={12}>
                                                <DailyGameCount {...filters} />
                                            </Col>
                                            <Col xs={12}>
                                                <Placements {...filters} />
                                            </Col>
                                        </Row>
                                    </Grid>
                                </Col>
                            </Row>
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default UserPage;

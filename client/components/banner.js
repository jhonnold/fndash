import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/img/vertical-logo.png';

const Banner = () => (
    <Grid fluid className="banner">
        <Grid>
            <Row center="xs">
                <Col xs={12}>
                    <Link to="/">
                        <img src={logo} alt="FN Dash" style={{ height: 200 }} />
                    </Link>
                </Col>
                <Col xs={12}>
                    <h5>Detailed Fortnite Stat Tracking</h5>
                </Col>
                <Col tagName="hr" xs={12} />
                <Col xs={12} tagName="nav">
                    <Row tagName="ul" around="xs">
                        <Col tagName="li">
                            <NavLink className="nav-link" exact to="/">
                                Home
                            </NavLink>
                        </Col>
                        <Col tagName="li">
                            <NavLink className="nav-link" exact to="/signup">
                                Sign Up
                            </NavLink>
                        </Col>
                        <Col tagName="li">
                            <NavLink className="nav-link" exact to="/about">
                                About
                            </NavLink>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    </Grid>
);

export default Banner;

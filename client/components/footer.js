import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col, Row } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
    <Grid fluid className="footer">
        <Grid>
            <Row>
                <Col xs={12} sm={6}>
                    <h5>Pages</h5>
                    <p>
                        <Link to="/">Home</Link>
                    </p>
                    <p>
                        <Link to="/signup">Sign Up</Link>
                    </p>
                    <p>
                        <Link to="/about">About</Link>
                    </p>
                </Col>
                <Col xs={12} sm={6}>
                    <Row>
                        <Col xs={12}>
                            <h5>Created By</h5>
                            <a
                                className="github-link"
                                href="https://github.com/jhonnold"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Jay Honnold
                            </a>{' '}
                            and{' '}
                            <a
                                className="github-link"
                                href="https://github.com/JackSomm"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Jack Sommer
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h5>Source Code</h5>
                            <p>
                                <a
                                    className="github-link"
                                    href="https://github.com/jhonnold/fndash"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    </Grid>
);

export default Footer;

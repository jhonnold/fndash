import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import Card from './card';

const About = () => (
    <main>
        <Row>
            <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
                <Card title="About Us">
                    <p style={{ marginBottom: '1rem' }}>
                        FN Dash is a fortnite tracking solution with the ultimate goal of <em>detailed</em> and{' '}
                        <em>accurate</em> stat tracking. FN Dash tracks <em>all stats:</em> games, kills, matches,
                        placements, and players outlived. It also tracks all different game playlists as well - the
                        standard modes (including tournaments), LTMs, and large-team LTMs.
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                        What makes really sets apart FN Dash is its ability to track all of this data{' '}
                        <em>without having any page open.</em> Since we don{"'"} track everyone, we are able to track
                        the players who have signed up without interruption.
                    </p>
                    <p>
                        Signing up is entirely free, FN Dash doesn{"'"}t even ask for your email, simply just your
                        ingame name. If you are ready to signup and join the many other FN Dash players in their
                        endeavor to improve, <Link to="/signup">click here.</Link>
                    </p>
                </Card>
            </Col>
        </Row>
    </main>
);

export default About;

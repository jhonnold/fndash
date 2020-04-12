import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Card from './card';

const SignUp = () => (
    <main>
        <Row>
            <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
                <Card title="Sign Up">
                    <p className="text-off-white">
                        Unfortunately, FN Dash has been retired and no-longer is accepting new users.
                    </p>
                </Card>
            </Col>
        </Row>
    </main>
);

export default SignUp;

import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from './card';

const SignUp = () => (
    <main>
        <Card title="Sign Up">
            <p className="text-off-white">
                Unfortunately, FN Dash has been retired and no-longer is accepting new users.
            </p>
        </Card>
    </main>
);

export default SignUp;

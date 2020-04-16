import React from 'react';
import { Row } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import colors from '../util/colors';

const Error = ({ message }) => (
    <Row center="xs">
        <p style={{ color: colors.pink }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: 5 }} />
            {message}
        </p>
    </Row>
);

export default Error;

import React from 'react';
import { Row } from 'react-flexbox-grid';

const Card = ({ title, children }) => (
    <>
        {title && (
            <Row>
                <h3>{title}</h3>
            </Row>
        )}
        <Row className="card">{children}</Row>
    </>
);

export default Card;

import React from 'react';
import { Row } from 'react-flexbox-grid';

const Card = ({ title, style, children }) => (
    <>
        {title && (
            <Row>
                <h3>{title}</h3>
            </Row>
        )}
        <Row style={style} className="card">
            {children}
        </Row>
    </>
);

export default Card;

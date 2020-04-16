import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { BarLoader } from 'react-spinners';
import colors from '../util/colors';

const Card = ({ title, style, children, loading }) => (
    <>
        {title && (
            <Row>
                <h3>{title}</h3>
            </Row>
        )}
        <Row style={style} className="card">
            {loading ? (
                <Col xs={12}>
                    <Row center="xs">
                        <BarLoader color={colors.lightGreen} />
                    </Row>
                </Col>
            ) : (
                children
            )}
        </Row>
    </>
);

export default Card;

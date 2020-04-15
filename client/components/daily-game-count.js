import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Bar } from 'react-chartjs-2';
import { BarLoader } from 'react-spinners';
import useFetch from '../util/use-fetch';
import Card from './card';
import { chartOptions, chartData } from '../config/daily-game-count-config';
import colors from '../util/colors';

const DailyGameCount = ({ inputId }) => {
    const res = useFetch(`/api/inputs/${inputId}/daily-stats`);

    return (
        <Card title="Games per Day">
            {res.loading ? (
                <Col>
                    <Row center="xs">
                        <BarLoader color={colors.lightGreen} />
                    </Row>
                </Col>
            ) : res.error ? (
                <Col xs={12}>
                    <Row center="xs">
                        <h4 style={{ color: colors.pink, margin: 0 }}>Unable to load chart data!</h4>
                    </Row>
                </Col>
            ) : (
                <Bar data={chartData(res.body)} options={chartOptions} />
            )}
        </Card>
    );
};

export default DailyGameCount;

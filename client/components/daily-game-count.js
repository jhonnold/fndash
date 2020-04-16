import React from 'react';
import { Col } from 'react-flexbox-grid';
import { Bar } from 'react-chartjs-2';
import Error from './error';
import useFetch from '../util/use-fetch';
import Card from './card';
import { chartOptions, chartData } from '../config/daily-game-count-config';

const DailyGameCount = ({ inputId }) => {
    const res = useFetch(`/api/inputs/${inputId}/daily-stats`);

    return (
        <Card title="Games per Day" loading={res.loading}>
            {res.error ? (
                <Col xs={12}>
                    <Error message="Unable to load games played!" />
                </Col>
            ) : (
                <Bar data={chartData(res.body)} options={chartOptions} />
            )}
        </Card>
    );
};

export default DailyGameCount;

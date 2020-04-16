import React from 'react';
import { Col } from 'react-flexbox-grid';
import { Line } from 'react-chartjs-2';
import Error from './error';
import useFetch from '../util/use-fetch';
import Card from './card';
import { chartOptions, chartData } from '../config/daily-kd-config';

const DailyKD = ({ inputId }) => {
    const res = useFetch(`/api/inputs/${inputId}/daily-stats`);

    return (
        <Card title="K/D per Day" loading={res.loading}>
            {res.error ? (
                <Col xs={12}>
                    <Error message="Unable to load K/D data!" />
                </Col>
            ) : (
                <Line data={chartData(res.body)} options={chartOptions} />
            )}
        </Card>
    );
};

export default DailyKD;

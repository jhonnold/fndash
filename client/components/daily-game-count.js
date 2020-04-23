import React from 'react';
import { Col } from 'react-flexbox-grid';
import { BarChart } from '@jhonnold/react-chart.js';
import qs from 'querystring';
import Error from './error';
import useFetch from '../util/use-fetch';
import Card from './card';
import { chartOptions, chartData } from '../config/daily-game-count-config';

const DailyGameCount = ({ inputId, mode }) => {
    const params = {
        mode: mode !== 'all' ? mode : undefined,
    };
    const res = useFetch(`/api/inputs/${inputId}/daily-stats?${qs.stringify(params)}`);

    return (
        <Card title="Games per Day" loading={res.loading}>
            {res.error ? (
                <Col xs={12}>
                    <Error message="Unable to load games played!" />
                </Col>
            ) : res.body && res.body.length ? (
                <BarChart data={chartData(res.body)} options={chartOptions} />
            ) : (
                <p className="text-off-white">No games recorded!</p>
            )}
        </Card>
    );
};

export default DailyGameCount;

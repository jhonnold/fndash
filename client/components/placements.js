import React from 'react';
import { Col } from 'react-flexbox-grid';
import { PieChart } from '@jhonnold/react-chart-js';
import qs from 'querystring';
import Error from './error';
import useFetch from '../util/use-fetch';
import Card from './card';
import { chartData, chartOptions } from '../config/placements-config';

const Placements = ({ inputId, mode }) => {
    const params = {
        mode: mode !== 'all' ? mode : undefined,
    };
    const res = useFetch(`/api/inputs/${inputId}/placements?${qs.stringify(params)}`);

    return (
        <Card title="Placements" loading={res.loading}>
            {res.error ? (
                <Col xs={12}>
                    <Error message="Unable to load placements data!" />
                </Col>
            ) : res.body && res.body.length ? (
                <PieChart data={chartData(res.body)} options={chartOptions} />
            ) : (
                <p className="text-off-white">No games recorded!</p>
            )}
        </Card>
    );
};

export default Placements;

import React from 'react';
import { Col } from 'react-flexbox-grid';
import { Pie } from 'react-chartjs-2';
import Error from './error';
import useFetch from '../util/use-fetch';
import Card from './card';
import { chartData, chartOptions } from '../config/placements-config';

const Placements = ({ inputId }) => {
    const res = useFetch(`/api/inputs/${inputId}/placements`);

    return (
        <Card title="Placements" loading={res.loading}>
            {res.error ? (
                <Col xs={12}>
                    <Error message="Unable to load placements data!" />
                </Col>
            ) : res.body && res.body.length ? (
                <Pie data={chartData(res.body)} options={chartOptions} />
            ) : (
                <p className="text-off-white">No games recorded!</p>
            )}
        </Card>
    );
};

export default Placements;

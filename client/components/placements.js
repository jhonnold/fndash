import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Pie } from 'react-chartjs-2';
import { BarLoader } from 'react-spinners';
import _groupBy from 'lodash/groupBy';
import _keys from 'lodash/keys';
import _sortBy from 'lodash/sortBy';
import Card from './card';
import colors from '../util/colors';

const MODES = ['Solo', 'Duo', 'Trios', 'Squad'];
const COLORS = {
    solo: colors.lightBlue,
    duo: colors.purple,
    trios: colors.orange,
    squad: colors.pink,
};
const PLACEMENT_ORDERING = {
    Loss: 0,
    'Top 25': 1,
    'Top 12': 1,
    'Top 6': 1,
    'Top 10': 2,
    'Top 5': 2,
    'Top 3': 2,
    Victory: 3,
};

const chartOptions = {
    aspectRatio: 2,
    legend: {
        display: false,
        position: 'right',
        labels: {
            fontColor: colors.offWhite,
            boxWidth: 12,
            padding: 4,
        },
    },
    tooltips: {
        callbacks: {
            label(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const { index } = tooltipItem;
                return `${dataset.labels[index]}: ${dataset.data[index]}`;
            },
        },
    },
};

const Placements = ({ inputId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            if (!inputId) return;

            const res = await fetch(`/api/inputs/${inputId}/placements`);
            const data = await res.json();

            setData(data);
        })();
    }, [inputId]);

    const generateData = () => {
        if (!data) return;

        const groupedData = _groupBy(data, 'mode');

        return {
            datasets: MODES.map(m => {
                const mode = m.toLowerCase();
                const sorted = _sortBy(groupedData[mode], m => PLACEMENT_ORDERING[m.placement]);

                if (!sorted.length) return null;

                return {
                    data: sorted.map(d => d.count),
                    labels: sorted.map(d => `${m} ${d.placement}`),
                    backgroundColor: `${COLORS[mode]}40`,
                    borderWidth: 2,
                    borderColor: COLORS[mode],
                    label: mode,
                };
            }).filter(Boolean),
            labels: MODES,
        };
    };

    return (
        <Card title="Placements">
            {data ? (
                <Pie data={generateData} options={chartOptions} />
            ) : (
                <Col>
                    <Row center="xs">
                        <BarLoader color={colors.lightGreen} />
                    </Row>
                </Col>
            )}
        </Card>
    );
};

export default Placements;

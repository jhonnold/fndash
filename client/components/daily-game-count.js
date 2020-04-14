import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Bar } from 'react-chartjs-2';
import { BarLoader } from 'react-spinners';
import moment from 'moment';
import Card from './card';
import colors from '../util/colors';

const chartOptions = {
    responsive: true,
    aspectRatio: 2.5,
    legend: {
        display: true,
        position: 'bottom',
        labels: {
            fontColor: colors.offWhite,
            padding: 4,
            boxWidth: 12,
        },
    },
    scales: {
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontColor: colors.offWhite,
                    beginAtZero: true,
                },
            },
        ],
        xAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontColor: colors.offWhite,
                },
            },
        ],
    },
};

const DailyGameCount = ({ inputId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            if (!inputId) return;

            const res = await fetch(`/api/inputs/${inputId}/daily-stats`);
            const data = await res.json();

            setData(data);
        })();
    }, [inputId]);

    const generateData = canvas => {
        if (!data) return null;

        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 400, 0);
        gradient.addColorStop(0, colors.lightBlue);
        gradient.addColorStop(1, colors.lightGreen);

        return {
            datasets: [{ data: data.map(d => +d.matches), backgroundColor: gradient }],
            labels: data.map(d => moment(d.day).format('MMM DD')),
        };
    };

    return (
        <Card title="Games per Day">
            {data ? (
                <Bar data={generateData} options={chartOptions} />
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

export default DailyGameCount;

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
        display: false,
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
        gradient.addColorStop(0, `${colors.lightBlue}40`);
        gradient.addColorStop(1, `${colors.lightGreen}40`);

        const borderGradient = ctx.createLinearGradient(0, 0, 400, 0);
        borderGradient.addColorStop(0, colors.lightBlue);
        borderGradient.addColorStop(1, colors.lightGreen);

        const validData = data.slice(data.length - 7);

        return {
            datasets: [
                {
                    data: validData.map(d => +d.matches),
                    backgroundColor: gradient,
                    borderColor: borderGradient,
                    borderWidth: 2,
                    label: 'Daily Games',
                },
            ],
            labels: validData.map(d => moment(d.day).format('MMM DD')),
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

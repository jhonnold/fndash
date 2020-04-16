import moment from 'moment';
import colors from '../util/colors';
import alpha from '../util/alpha';

export const chartOptions = {
    responsive: true,
    aspectRatio: 2.5,
    legend: {
        display: false,
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

export const chartData = data => canvas => {
    if (!data) return null;

    const ctx = canvas.getContext('2d');
    const lineGradient = ctx.createLinearGradient(0, 0, 400, 0);
    lineGradient.addColorStop(0, colors.lightBlue);
    lineGradient.addColorStop(1, colors.lightGreen);

    const fillGradient = ctx.createLinearGradient(0, 0, 400, 0);
    fillGradient.addColorStop(0, alpha(colors.lightBlue, 0x40));
    fillGradient.addColorStop(1, alpha(colors.lightGreen, 0x40));

    const validData = data.slice(data.length - 7);

    return {
        datasets: [
            {
                data: validData.map(d => +d.kd),
                backgroundColor: fillGradient,
                pointBackgroundColor: lineGradient,
                pointRadius: 4,
                label: 'Daily K/D',
                fill: true,
                borderColor: lineGradient,
                borderWidth: 2,
            },
        ],
        labels: validData.map(d => moment(d.day).format('MMM DD')),
    };
};

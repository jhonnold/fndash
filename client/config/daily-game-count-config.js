import moment from 'moment';
import colors from '../util/colors';
import alpha from '../util/alpha';

export const chartOptions = {
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

export const chartData = data => canvas => {
    if (!data) return null;

    const ctx = canvas.getContext('2d');

    const backgroundGradient = ctx.createLinearGradient(0, 0, 400, 0);
    backgroundGradient.addColorStop(0, alpha(colors.lightBlue, 0x40));
    backgroundGradient.addColorStop(1, alpha(colors.lightGreen, 0x40));

    const borderGradient = ctx.createLinearGradient(0, 0, 400, 0);
    borderGradient.addColorStop(0, colors.lightBlue);
    borderGradient.addColorStop(1, colors.lightGreen);

    const validData = data.slice(data.length - 7);

    return {
        datasets: [
            {
                data: validData.map(d => +d.matches),
                backgroundColor: backgroundGradient,
                borderColor: borderGradient,
                borderWidth: 2,
                label: 'Daily Games',
            },
        ],
        labels: validData.map(d => moment(d.day).format('MMM DD')),
    };
};

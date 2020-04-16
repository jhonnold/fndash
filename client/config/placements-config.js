import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import colors from '../util/colors';
import alpha from '../util/alpha';

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

export const chartOptions = {
    aspectRatio: 2,
    legend: {
        display: false,
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

export const chartData = data => () => {
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
                backgroundColor: alpha(COLORS[mode], 0x40),
                borderWidth: 2,
                borderColor: COLORS[mode],
                label: mode,
            };
        }).filter(Boolean),
        labels: MODES,
    };
};

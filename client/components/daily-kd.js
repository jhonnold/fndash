import React from 'react';
import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import _transform from 'lodash/transform';

const DailyKD = ({ games }) => {
    const gamesByDay = _groupBy(games, g => moment(g.timePlayed).format('L'));
    const kdByDay = _transform(
        gamesByDay,
        (r, games, day) => {
            let wins = 0,
                kills = 0;
            for (const game of games) {
                kills += game.kills;
                if (game.placement === 'Victory') wins++;
            }

            r[day] = kills / Math.max(1, games.length - wins);
        },
        {}
    );

    console.log(kdByDay);

    return <p>Daily KD</p>;
};

export default DailyKD;

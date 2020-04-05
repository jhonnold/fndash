import React from 'react';
import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import _transform from 'lodash/transform';

const DailyGameCount = ({ games }) => {
    const gamesByDay = _groupBy(games, g => moment(g.timePlayed).format('L'));
    const gamesCountByDay = _transform(gamesByDay, (r, games, day) => (r[day] = games.length), {});

    console.log(gamesCountByDay);

    return <p>Daily Game Count</p>;
};

export default DailyGameCount;

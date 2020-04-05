import React from 'react';
import _slice from 'lodash/slice';

const Games = ({ games }) => (
    <>
        <h3>Games</h3>
        {_slice(games, 0, 20).map(g => (
            <div key={games.id}>
                <h6>
                    {g.stat.name} {g.stat.mode} Match
                </h6>
            </div>
        ))}
    </>
);

export default Games;

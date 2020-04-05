import React from 'react';
import _groupBy from 'lodash/groupBy';
import _maxBy from 'lodash/maxBy';
import _includes from 'lodash/includes';
import _transform from 'lodash/transform';
import _keys from 'lodash/keys';

const Records = ({ games }) => {
    const gamesByMode = _groupBy(games, 'stat.mode');
    const records = _transform(gamesByMode, (r, v, k) => (r[k] = _maxBy(v, 'kills')), {});

    return (
        <>
            <h3>Records</h3>
            <div>
                {_keys(records).map(k => {
                    const game = records[k];

                    return (
                        <div key={game.id}>
                            <h6>
                                {game.stat.name} {game.stat.mode} Match
                            </h6>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Records;

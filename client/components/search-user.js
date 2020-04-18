import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import _ from 'lodash';
import { selectStyles } from '../config/select-styles';

const SearchUser = ({ history, match }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await fetch('/api/users');
            const data = await res.json();

            const options = _.chain(data)
                .sortBy(d => d.username.toLowerCase())
                .map(d => ({ label: d.username, value: d.id }))
                .value();

            setUsers(options);
        })();
    }, []);

    const userId = _.get(match, ['params', 'userId']);
    const value = _.find(users, { value: +userId });

    return (
        <Select
            options={users}
            value={value}
            styles={selectStyles}
            isClearable={false}
            placeholder="Select a player..."
            onChange={({ value }) => history.push(`/users/${value}`)}
        />
    );
};

export default withRouter(SearchUser);

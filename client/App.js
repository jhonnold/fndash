import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';

const App = () => {
    const [res, setRes] = useState({});

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/users');
            const data = await res.json();

            setRes(data);
        })();
    }, []);

    return <div>{JSON.stringify(res, null, 4)}</div>;
};

export default hot(App);

import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
    const [body, setBody] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const makeRequest = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();

                setBody(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        makeRequest();
    }, [url, options]);

    return { body, error, loading };
};

export default useFetch;

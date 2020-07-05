import React, { useState, useEffect } from 'react'

const useFetch = (callback, url) => {

    const [Loading, setLoading] = useState(false);

    const fetchInitialData = async () => {
        setLoading(true);
        const response = await fetch(url);
        const initialData = await response.json();
        callback(initialData);
        setLoading(false);
    }

    useEffect(() => {
        fetchInitialData();
    }, [])

    return Loading;

}

export default useFetch;
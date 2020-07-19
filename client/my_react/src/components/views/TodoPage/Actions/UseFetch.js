import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (callback) => {

    const [Loading, setLoading] = useState(false);

    const fetchInitialData = async () => {
        setLoading(true);

        axios.post('/api/todo/getList')
        .then(response => {
            callback(response.rows);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchInitialData();
    }, [])

    return Loading;

}

export default useFetch;
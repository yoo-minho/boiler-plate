import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (callback) => {

    const [Loading, setLoading] = useState(false);

    const fetchInitialData = async () => {
        setLoading(true);
        await axios.post('/api/todo/getList')
        .then(response => {
            if(response.data.success){
                callback(response.data.res.rows);
            } else {
                alert('못가져옴');
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchInitialData();
    }, [])

    return Loading;

}

export default useFetch;
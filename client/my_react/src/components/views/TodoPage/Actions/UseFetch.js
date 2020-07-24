import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (callback) => {

    const [Loading, setLoading] = useState(false);

    const fetchInitialData = async () => {
        setLoading(true);

        console.log('aaaa111');

        await axios.post('/api/todo/getList')
        .then(response => {
            console.log('aaaa222');
            console.log(response);
            if(response.data.success){
                callback(response.data.res.rows);
            } else {
                alert('못가져옴');
            }
            setLoading(false);
        })

        console.log('aaaa3333');
    }

    console.log('aaa44444');

    useEffect(() => {
        console.log('aaaa555');

        fetchInitialData();

        console.log('aaa6666');
    }, [])

    return Loading;

}

export default useFetch;
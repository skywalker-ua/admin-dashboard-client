import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useHttpRequest(url, method) {    
    const [response, setResponse] = useState([]);

    async function fetchProductData() {
        switch(method) {
            case 'GET': {
                await axios.get(url)
                .then(res => {
                setResponse(res.data)
                })
                .catch(err => {
                    console.log(err)
                    }
                );
            }

            default: {
                return new Error();
            }
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [])

    return response;
};

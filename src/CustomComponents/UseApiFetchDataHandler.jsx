import React, { useState, useEffect } from 'react';
import axios from "axios";

function UseApiFetchDataHandler(url, method) {
    const [data, setData] = useState([]);
    const [totalCountOfItems, setTotalCountOfItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [noData, setNoData] = useState(false);
    

    const apiHandler = async () => {
        try {
            setIsLoading(true);
            setIsError(false)
            setNoData(false)
            const response = await axios({
                method: method,
                url: url
            });
            const { data, pagination } = response.data;
            setTotalCountOfItems(pagination?.total_count ?? 0)
            if (data?.length > 0) {
                setData(data);
            }
            else {
                setNoData(true)
            }
            setIsLoading(false)
        }
        catch (e) {
            setIsError(true)
            console.log("ERROR in APIHANDLER FOR URL:", url)
        } finally{
            setIsLoading(false)
        }

    }

    const retryApiCall = () => {
        if (isError) {
            setIsError(false);
            setIsLoading(true);
            apiHandler();
        }
    };

    useEffect(() => {
        if (url.length > 0) {
            apiHandler();
        }
    }, [url])

    return { data, totalCountOfItems, isLoading, isError, noData, retryApiCall };
}

export default UseApiFetchDataHandler;
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./mainscreenstyles.css";
import api_keys from "../api_keys.json"

console.log(api_keys)

function Mainscreen() {
    const [count, setCount] = useState(0);
    const [selectedApi1, setSelectedApi1] = useState('');
    const [selectedApi2, setSelectedApi2] = useState('');

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const handlePostRequest = () => {
        const postData = {
            key1: count
        };

        Axios.post('http://127.0.0.1:5000/count', postData)
            .then(response => {
                setData({ counter: [response.data.counter] });
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    const [data, setData] = useState([{}])

    useEffect(() => {

        fetch("http://127.0.0.1:5000/count").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )

    }, [])

    const handleFetchRequestforAPI1 = () => {

        Axios.get(`http://127.0.0.1:5000/${selectedApi1}`)
            .then(response => {
                setData({ counter: [response.data.counter] });
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleFetchRequestforAPI2 = () => {

        const params = {
            api_token: "DDWEMDBmVzwaOHW8AWy5rLo88nCHIwpGClZEi98q",
            symbols: "SPY",
            sentiment_gte: 0,
            sentiment_lte: 0
        }

        const queryString = new URLSearchParams(params).toString();
        const finalUrl = `${selectedApi2}?${queryString}`;

        console.log(params)

        Axios.get(finalUrl)
            .then(response => {
                setData({ counter: [response.data.counter] });
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }





    return (
        <div className='mainscreen'>
            <h1>Get count From api : {data && data.counter && Array.isArray(data.counter) ? (
                data.counter.map((counter, i) => (
                    <p key={i}>{counter}</p>
                ))
            ) : (
                <p>Loading ....</p>
            )}</h1>

            <div className='selectors'>
                <select
                    className='option_selector'
                    name='API-1'
                    defaultValue={''}
                    onChange={(e) => setSelectedApi1(e.target.value)}
                >
                    <option disabled value={''}>API-1</option>
                    <option value={'alpha-vantage'}>S&P 500 data</option>
                    <option value={'finance-2'}>Finance-2</option>
                    <option value={'finance-3'}>Finance-3</option>
                </select>

                <select
                    className='option_selector'
                    name='API-2'
                    defaultValue={''}
                    onChange={(e) => setSelectedApi2(e.target.value)}
                >
                    <option disabled value={''}>API-2</option>
                    <option value={'finance-1'}>Finance-1</option>
                    <option value={'https://api.stockdata.org/v1/news/all'}>Sentiment Data</option>
                    <option value={'finance-3'}>Finance-3</option>
                </select>
            </div>

            <h1> Count : {count} </h1>
            <div className='buttons'>
                <button className='plus_button' onClick={increment}>+</button>
                <button className='minus_button' onClick={decrement}>-</button>
                <button className='submit_button' onClick={handlePostRequest}>Submit to count DB</button>
                <button className='submit_button' onClick={handleFetchRequestforAPI1}>Fetch data from API1</button>
                <button className='submit_button' onClick={handleFetchRequestforAPI2}>Fetch data from API2</button>
            </div>
        </div>
    );
}

export default Mainscreen;

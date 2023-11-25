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


    const [apiData1, setapiData1] = useState([{}])
    const handleFetchRequestforAPI1 = () => {

        const params = {
            api_token: "34KS36RMTITE8NTT",
        }

        const queryString = new URLSearchParams(params).toString();
        const finalUrl = `${selectedApi1}?${queryString}`;

        console.log(params)

        Axios.get(finalUrl)
            .then(response => {
                setapiData1(response.data.data1);
                console.log(response.data);
                sendToFlaskBackend(response.data, '/api1');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const [apiData2, setapiData2] = useState([{}])
    const handleFetchRequestforAPI2 = () => {

        const params = {
            api_token: "DDWEMDBmVzwaOHW8AWy5rLo88nCHIwpGClZEi98q",
            // symbols: "SPY",
            // sentiment_gte: 0,
            // sentiment_lte: 0
        }

        const queryString = new URLSearchParams(params).toString();
        const finalUrl = `${selectedApi2}?${queryString}`;

        console.log(params)

        Axios.get(finalUrl)
            .then(response => {
                setData({ counter: [response.data.counter] });
                console.log(response.data);
                sendToFlaskBackend(response.data, '/api2');
            })
            .catch(error => {
                console.error('Error:', error);
            });

        console.log(finalUrl)
    }

    const sendToFlaskBackend = (dataToSend, endpoint) => {

        const flaskEndpoint = `http://127.0.0.1:5000/${endpoint}`;

        Axios.post(flaskEndpoint, dataToSend)
            .then(response => {
                console.log('Data sent to Flask:', response.data);
            })
            .catch(error => {
                console.error('Error sending data to Flask:', error);
            });
    }


    const [plot, setPlot] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/get_plot')
            .then(response => response.json())
            .then(data => {
                console.log('Received data:', data);
                setPlot(data.plot);
            })
            .catch(error => console.error('Error:', error));
    }, []);


    return (
        <div className='mainscreen-main'>

            <div className='leftside-main'>

                <h1>Analyse Computed Data</h1>
                <div>
                    {plot && <img src={`data:image/png;base64,${plot}`} alt="Generated Plot" />}
                </div>

                <button className='notes-btn'>Collect Notes</button>
            </div>


            <div className='rightside-main'>

                <p className='alert'> ⚠ This is a demo project. Therefore it contains only few API's and few of their respective
                    attributes. Read More from my <a href='https://haripreetham-portifolio.web.app'>Blog/Website</a>
                </p>

                <h2>Get count From api : {data && data.counter && Array.isArray(data.counter) ? (
                    data.counter.map((counter, i) => (
                        <p key={i}>{counter}</p>
                    ))
                ) : (
                    <p>Loading ....</p>
                )}</h2>

                <h2> Count : {count} </h2>

                <div className='buttons count'>
                    <button className='plus_button' onClick={increment}>+</button>
                    <button className='minus_button' onClick={decrement}>-</button>
                    <button className='submit_button' onClick={handlePostRequest}>Submit to count DB</button>
                </div>


                <div className='selectors'>
                    <select
                        className='option_selector'
                        name='API-1'
                        defaultValue={''}
                        onChange={(e) => setSelectedApi1(e.target.value)}
                    >
                        <option disabled value={''}>API-1</option>
                        <option value={'https://www.alphavantage.co/query?function=INFLATION&limit=50&time_from=20220410T0130&apikey=34KS36RMTITE8NTT'}>Inflation</option>
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
                        <option value={'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&limit=50&time_from=20220410T0130&apikey=34KS36RMTITE8NTT'}>Sentiment</option>
                        <option value={'finance-3'}>Finance-3</option>
                    </select>
                </div>


                <div className='buttons api'>
                    <button className='submit_button' onClick={handleFetchRequestforAPI1}>Fetch data from API1</button>
                    <button className='submit_button' onClick={handleFetchRequestforAPI2}>Fetch data from API2</button>
                    <button className='submit_button' onClick={handleFetchRequestforAPI2}>Compute</button>
                </div>
            </div>
        </div>
    );
}

export default Mainscreen;

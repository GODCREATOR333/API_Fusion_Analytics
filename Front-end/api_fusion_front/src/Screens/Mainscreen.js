import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./mainscreenstyles.css";

function Mainscreen() {
    const [count, setCount] = useState(0);

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

        Axios.put('your-api-endpoint', postData)
            .then(response => {
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

    return (
        <div className='mainscreen'>
            <h1>Get count From api : {typeof data.counter === "undefined" ? (
                <p>Loading ....</p>
            ) : (
                data.counter.map((counter, i) => (
                    <p key={i}>{counter}</p>
                ))
            )}</h1>

            <h1> Count : {count} </h1>
            <div className='buttons'>
                <button className='plus_button' onClick={increment}>+</button>
                <button className='minus_button' onClick={decrement}>-</button>
                <button className='submit_button' onClick={handlePostRequest}>Submit</button>
            </div>
        </div>
    );
}

export default Mainscreen;

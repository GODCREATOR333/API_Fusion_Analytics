import React, { useState } from 'react';
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

    return (
        <div className='mainscreen'>
            <h1>Count : {count}</h1>
            <div className='buttons'>
                <button className='plus_button' onClick={increment}>+</button>
                <button className='minus_button' onClick={decrement}>-</button>
                <button className='submit_button' onClick={handlePostRequest}>Submit</button>
            </div>
        </div>
    );
}

export default Mainscreen;

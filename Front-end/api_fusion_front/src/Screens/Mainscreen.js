import React, { useState } from 'react'
import "./mainscreenstyles.css"

function Mainscreen() {

    const [count, SetCount] = useState(0)

    const increment = () => {
        SetCount(count + 1)
    }
    const decrement = () => {
        SetCount(count - 1)
    }


    return (
        <div className='mainscreen'>
            <h1>Count : {count}</h1>
            <div className='buttons'>
                <button className='plus_button' onClick={increment}>+</button>
                <button className='minus_button' onClick={decrement}>-</button>
            </div>
        </div>
    )
}

export default Mainscreen
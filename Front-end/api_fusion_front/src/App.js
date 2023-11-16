import React, { useState, useEffect } from 'react';
import './App.css';
import Mainscreen from './Screens/Mainscreen';
import BackDrop from './Screens/Backdrop';

function App() {
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
    <div>
      {typeof data.counter === "undefined" ? (
        <p>Loading ....</p>
      ) : (
        data.counter.map((counter, i) => (
          <p key={i}>{counter}</p>
        ))
      )}
      <BackDrop />
      <Mainscreen />
    </div>
  );

}

export default App;

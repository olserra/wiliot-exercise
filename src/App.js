import React, { useEffect, useState } from 'react';

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

import { w3cwebsocket as W3CWebSocket } from "websocket";

import './App.css';

const App = () => {

  // Creating an empty state
  const [data, setData] = useState([{}]);

  // Creating a client with WebSocket
  const ws = new W3CWebSocket('ws://localhost:8999');

  // This code will run every time the component is mounted, and it will re-render every time the state changes, and new data come in from the socket
  useEffect(() => {
    ws.onmessage = function (message) {
      const arr = JSON.parse(message.data);
      try {
        // Checking if the connection is ok by checking if the first element is empty
        if (arr.length > 0) {
          // Checking if data if bigger then 100
          if (arr[0].data > 100 || arr[1].data > 100) {
            return null;
          } else {
            const newData = {
              id_1: arr[0].temperature,
              id_2: arr[1].temperature,
              amt: 50,
              timestamp: message.timestamp
            }
            setData((currentData) => {
              // Save data for 5 minutes then stop saving data
              if (newData.timestamp >= (currentData[0].timestamp + 30000)) {
                currentData.shift();
                currentData.push(newData);
                return currentData;
              } else {
                return [...currentData, newData]
              }
            });
          }
        }
      } catch (err) {
        // Display a toast for connection failed
        alert('Connection failed')
      }
    };
  }, []);

  // Rendering the chart using the state
  return (
    <div style="container">
      <div>
        <div>
          <p>ID 1</p>
          <p>{data[0].temperature}</p>
        </div>
        <div>
          <p>ID 2</p>
          <p>{data[1].temperature}</p>
        </div>
      </div>
      <div>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="id_1" stroke="#8884d8" />
          <Line type="monotone" dataKey="id_2" stroke="#82ca9d" />
        </LineChart>
      </div>
      <h1>DATA</h1>
    </div>
  );
};

export default App;

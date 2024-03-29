import React, { useEffect, useState } from 'react';

import Toast from '../Toast/Toast';

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

import { w3cwebsocket as W3CWebSocket } from "websocket";

const Container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '150px',
}

const InnerContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: '5px',
  alignItems: 'center',
}

const IDs = {
  border: '1px solid grey',
  padding: '0px 20px',
}

const Client = () => {

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
          if (arr[0]?.data > 100 || arr[1]?.data > 100) {
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
              if (newData.timestamp >= (currentData[0]?.timestamp + 30000)) {
                currentData?.shift();
                currentData?.push(newData);
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

    ws.onerror = function () {
      <Toast message={'Connection error'} />;
    };

    ws.onopen = function () {
      <Toast message={'Connection open'} />;
    };

    ws.onclose = function () {
      <Toast message={'Connection closed'} />;
    };
  }, []);

  // Rendering the chart using the state
  return (
    <div style={Container}>
      <div style={InnerContainer}>
        <div style={IDs}>
          <p>ID 1</p>
          <p>{data[data.length - 1]?.id_1}</p>
        </div>
        <div style={IDs}>
          <p>ID 2</p>
          <p>{data[data.length - 1].id_2}</p>
        </div>
      </div>
      <div>
        <LineChart width={500} height={300} data={data.slice(data.length - 6, data.length)}>
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="id_1" stroke="#8884d8" />
          <Line type="monotone" dataKey="id_2" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default Client;

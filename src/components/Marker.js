import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Location from './Location';

import * as SockJS from 'sockjs-client';
import * as StompJs from 'stompjs';

// // proxy
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = app => {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:8080',
//       changeOrigin: true,
//     }),
//   );
//   app.use(
//     '/ws-stomp',
//     createProxyMiddleware({ target: 'http://localhost:8080', ws: true }),
//   );
// };

// soket
export const Marker = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const MyUseInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
  const client = useRef({});

  const [url, setUrl] = useState([
    { title: 'test', lat: 3414.324324, lng: 32432.124 },
  ]);
  const [marker, setMarker] = useState([
    { title: 'test', lat: 3414.324324, lng: 32432.124 },
    { title: 'test', lat: 3414.324324, lng: 32432.124 },
    { title: 'test', lat: 3414.324324, lng: 32432.124 },
  ]);

  useEffect(() => {
    connect();
    publish();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      //   brokerURL: 'ws://local.corsmarket.ml/api/ws',
      brokerURL: 'ws://https://seoultaste.click/ws',
      //  webSocketFactory: () => new SockJS("/ws-stomp"), // proxy를 통한 접속
      connectHeaders: {
        // "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: frame => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const publish = () => {
    MyUseInterval(() => {
      if (!client.current.connected) {
        return;
      }

      client.current.publish({
        destination: '/map/hello',
        body: JSON.stringify({ url }),
        // url = [{title:'test' lat: 3414.324324 lng: 32432.124}]
      });
      setUrl('');
    }, delay);
  };

  const subscribe = () => {
    client.current.subscribe(`/topic/public`, ({ body }) => {
      setMarker(_marker => [..._marker, JSON.parse(body)]);
    });
  };
  console.log(marker);
  return (
    <>
      <div>{marker}</div>
    </>
  );
};

export default Marker;

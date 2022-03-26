import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Location from './Location';
import { setMarkerRedux } from '../redux/modules/mainsys';

import * as SockJS from 'sockjs-client';
import * as StompJs from 'stompjs';
import { useDispatch } from 'react-redux';
const MyTest = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);

  const client = useRef({});

  const [url, setUrl] = useState([
    { title: 'test', lat: 3414.324324, lng: 32432.124 },
  ]);
  const [marker, setMarker] = useState([
    {
      title: '모여라1',
      lat: 37.55390232236185,
      lng: 126.9810124843774,
    },
    {
      title: '모여라2',
      lat: 37.57605746531094,
      lng: 126.97694718879282,
    },
    {
      title: '모여라3',
      lat: 37.515830047374855,
      lng: 127.07296457925408,
    },
    {
      title: '모여라4',
      lat: 37.503989016993636,
      lng: 127.00472031567072,
    },
  ]);

  // useEffect(() => {
  //   // connect();
  //   // publish();

  //   return () => disconnect();
  // }, []);
  useEffect(() => {
    console.log('ChatRoomEffect');
    dispatch(setMarkerRedux(marker));

    publish();
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
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: '/map/hello',
      body: JSON.stringify({ url }),
      // url = [{title:'test' lat: 3414.324324 lng: 32432.124}]
    });
    setUrl('');
  };

  const subscribe = () => {
    client.current.subscribe(`/topic/public`, ({ body }) => {
      setMarker(_marker => [..._marker, JSON.parse(body)]);
    });
  };

  console.log(marker);
  return (
    <>
      <div>marker</div>
      <button
        onClick={() => {
          dispatch(setMarkerRedux(marker));
        }}
      >
        버튼
      </button>
    </>
  );
};

export default MyTest;

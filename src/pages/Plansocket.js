import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';

import { over } from 'stompjs';
import theme from '../Styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanId, setPublicMaps, setPublicChats } from '../redux/modules/map';
import { useParams } from 'react-router-dom';
import PlanMap, { sendMyLocation } from './PlanMap';
import { Button, Input, Image } from '../elements';
import { chatingicon } from '../img';
import PlanChating from './PlanChating';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Plansocket = props => {
  const planId = props.planId;
  const planName = props.planName;
  const sock = props.sock;
  const client = props.client;
  const dispatch = useDispatch();
  const usernick = props.userNick;
  const [userData, setUserData] = useState({
    sender: '',
    connected: false,
    message: null,
  });
  const publicChats = useSelector(state => state.map.publicChats);
  const publicMaps = useSelector(state => state.map.publicMaps);
  const MapRef = useRef();
  const ChatRef = useRef();
  useEffect(() => {
    console.log('planId:::', planId);
    // if (planId) {
    //   console.log('planID있음');
    connect();
    return () => {
      //나갈때 접속 해제할지?
      // client.disconnect();
    };
    // }
  });
  const connect = () => {
    client.connect({}, onConnected, onError);
    sock.addEventListener('open', () => {
      console.log('Connected to Browser!!!😀');
    });
    // sock.addEventListener('message', message => {
    //   console.log('Got this:', message, '😀');
    // });
    sock.addEventListener('close', () => {
      console.log('Disconnected to Server😀');
    });
  };
  //연결
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    //구독
    client.subscribe(`/topic/chat/${planId}`, onMessageReceived, onError);
    client.subscribe(`/topic/map/${planId}`, onMessageReceived2, onError);

    userJoin();
    console.log('연결 / 구독 / 유저 입장');
  };
  const onMessageReceived = payload => {
    //일로 안불러와짐
    let payloadData = JSON.parse(payload.body);
    console.log('payloadDataChat=', payloadData);
    if (payloadData.type === 'ENTER' || payloadData.type === 'CHAT') {
      dispatch(setPublicChats(payloadData));
      // sendMyLocation();
    }

    if (payloadData.type === 'MAP' || payloadData.type === 'DEST') {
      dispatch(setPublicMaps(payloadData));
      if (payloadData.type === 'MAP') {
        const data = {
          lat: payloadData.lat,
          lng: payloadData.lng,
        };
      }
      if (payloadData.type === 'DEST') {
        const data = {
          lat: payloadData.destLat,
          lng: payloadData.destLng,
        };
      }
    }
  };
  const onMessageReceived2 = payload => {
    let payloadData = JSON.parse(payload.body);
    console.log('payloadDataMap=', payloadData);
    if (payloadData.type === 'ENTER' || payloadData.type === 'CHAT') {
      dispatch(setPublicChats(payloadData));
      // sendMyLocation();
    }

    if (payloadData.type === 'MAP' || payloadData.type === 'DEST') {
      dispatch(setPublicMaps(payloadData));
      if (payloadData.type === 'MAP') {
        const data = {
          lat: payloadData.lat,
          lng: payloadData.lng,
        };
      }
      if (payloadData.type === 'DEST') {
        console.log('MapRef');
        MapRef.current.sendMyLocationfun();
        const data = {
          lat: payloadData.destLat,
          lng: payloadData.destLng,
        };
        console.log('DEST', data);
        MapRef.current.setDestpoint(data);
      }
    }
  };
  const onError = err => {
    console.log('Error', err);
  };

  const userJoin = () => {
    let chatMessage = {
      sender: usernick,
      planId: planId,
      // lat: myLocation.center.lat,
      // lng: myLocation.center.lng,
      type: 'ENTER',
    };
    setUserData({
      ...userData,
      sender: usernick,
      planId: planId,
      connected: true,
    });

    client.send('/maps/enter', {}, JSON.stringify(chatMessage));
  };

  const [isChating, setIsChating] = useState(false);
  return (
    <>
      <PlanMap
        ref={MapRef}
        client={client}
        publicChats={publicChats}
        publicMaps={publicMaps}
        planId={planId}
        planName={planName}
        usernick={usernick}
      />
      <Image
        shape={'is_float'}
        src={chatingicon}
        _onClick={() => {
          if (!isChating) {
            setIsChating(true);
          }
        }}
      ></Image>
      {isChating && (
        <PlanChating
          stompClient={client}
          userData={userData}
          setUserData={setUserData}
          publicChats={publicChats}
          // handleMessage={handleMessage}
          // sendMessage={sendMessage}
          planId={planId}
          planName={planName}
          usernick={usernick}
          setIsChating={setIsChating}
        />
      )}
    </>
  );
};
//test
// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

// default props 작성 위치
Plansocket.defaultProps = {};

export default Plansocket;

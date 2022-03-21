import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
import Headerbar from '../shared/Headerbar';
import { Button } from '../elements';

import { Navigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

import PlanChating from './PlanChating';
import { useDispatch, useSelector } from 'react-redux';
import { setPublicChats } from '../redux/modules/mainsys.js';
//카카오 맵
import { Map, MapMarker } from 'react-kakao-maps-sdk';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */
let stompClient = null;

const PlanMap = props => {
  const dispatch = useDispatch();
  // const useInterval = (callback, delay) => {
  //   const savedCallback = useRef();

  //   // Remember the latest function.
  //   useEffect(() => {
  //     savedCallback.current = callback;
  //   }, [callback]);

  //   // Set up the interval.
  //   useEffect(() => {
  //     function tick() {
  //       savedCallback.current();
  //     }
  //     if (delay !== null) {
  //       let id = setInterval(tick, delay);
  //       return () => clearInterval(id);
  //     }
  //   }, [delay]);
  // };

  //소켓관련
  let sock = useRef({});
  const publicChats = useSelector(state => state.main.publicChats);
  // const [publicChats, setPublicChats] = useState([]);
  const [isChating, setIsChating] = useState(false);
  const [userData, setUserData] = useState({
    sender: '',
    connected: false,
    content: '',
  });
  const sockUrl = process.env.REACT_APP_BE_IP_LYW + '/ws';

  //처음연결
  const connect = () => {
    sock = new SockJS(sockUrl);

    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
    // sock.addEventListener('open', () => {
    //   console.log('Connected to Browser!!!😀');
    // });
    // sock.addEventListener('message', message => {
    //   console.log('Got this:', message, '😀');
    // });
    // sock.addEventListener('close', () => {
    //   console.log('Disconnected to Server😀');
    // });
  };
  //유저입장체크
  const userJoin = () => {
    let chatMessage = {
      sender: userData.sender,
      type: 'ENTER',
    };
    stompClient.send('/chat/chat.sendMessage', {}, JSON.stringify(chatMessage));
    sendMyLocation();
  };
  //연결
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    //구독
    stompClient.subscribe(`/topic/public`, onMessageReceived, onError);
    userJoin();
  };
  //연결해제
  const disConneted = () => {
    stompClient.disconneted(() => {
      console.log('disconnect');
    });
  };
  //메시지 보내기
  const onMessageReceived = payload => {
    let payloadData = JSON.parse(payload.body);
    console.log('payloadData=', payloadData);
    dispatch(setPublicChats(payloadData));
  };
  //에러
  const onError = err => {
    console.log('Error', err);
  };
  //메시지 내용 추가함수
  const handleMessage = event => {
    const { value } = event.target;
    setUserData({ ...userData, content: value });
  };
  //보내기 버튼
  const sendMessage = () => {
    console.log(' 메시지 보내기 클릭!');
    if (stompClient) {
      let chatMessage = {
        sender: userData.sender,
        content: userData.content,
        type: 'CHAT',
      };
      console.log(' 내가 보낸 메시지 ==', chatMessage);
      stompClient.send(
        '/chat/chat.sendMessage',
        {},
        JSON.stringify(chatMessage),
      );
      setUserData({ ...userData, content: '' });
    }
  };
  //유저 추가
  const handleUsername = event => {
    const { value } = event.target;
    setUserData({ ...userData, sender: value });
  };

  const registerUser = () => {
    connect();
  };

  //소켓관련 끝

  //지도 관련
  const [myLocation, setSetMyLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const sendMyLocation = () => {
    console.log(' 메시지 보내기 클릭!');
    if (stompClient) {
      let chatMessage = {
        sender: userData.sender,
        lat: myLocation.center.lat,
        lng: myLocation.center.lng,
        type: 'MAP',
      };
      console.log(' 내가 보낸 메시지 ==', chatMessage);
      stompClient.send(
        '/chat/chat.sendMessage',
        {},
        JSON.stringify(chatMessage),
      );
      setUserData({ ...userData, lat: '', lng: '' });
    }
  };
  useEffect(() => {
    // sendMessage();

    //현재 내위치 얻기
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        position => {
          setSetMyLocation(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        err => {
          setSetMyLocation(prev => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setSetMyLocation(prev => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, [userData]);

  return (
    <>
      <div>변경확인용</div>
      <Headerbar
        is_Edit
        text="모임이름{} 채팅방"
        _onClickClose={() => {
          Navigate('/');
        }}
        _onClickEdit={() => {}}
      ></Headerbar>
      <Button
        _onClick={() => {
          if (isChating) setIsChating(false);
          else setIsChating(true);
        }}
      >
        test
      </Button>
      <Button _onClick={sendMyLocation}>내 위치 보내기</Button>
      <Map // 지도를 표시할 Container
        center={myLocation.center}
        style={{
          // 지도의 크기
          width: '100%',
          height: '200px',
        }}
        level={3} // 지도의 확대 레벨
      >
        {!myLocation.isLoading && <MapMarker position={myLocation.center} />}
        {/* <MapMarker position={{ lat: 37.49732678, lng: 127.13505 }}></MapMarker> */}
        {publicChats &&
          publicChats.map(
            (chat, index) => (
              console.log('chat', chat),
              (
                <>
                  {chat.type === 'MAP' && (
                    <MapMarker
                      key={'map' + index}
                      position={{ lat: chat.lat, lng: chat.lng }}
                    />
                  )}
                </>
              )
            ),
          )}
      </Map>
      {userData.connected ? (
        <div>
          {publicChats &&
            publicChats.map((chat, index) => (
              <>
                {chat.type === 'JOIN' && <div>{chat.sender}입장</div>}
                {/* {chat.type === 'CHAT' && chat.sender !== userData.sender && (
                  <div key={index}>
                    <div>
                      <div>{chat.sender}</div>
                      <div>{chat.content}</div>
                    </div>
                  </div>
                )}
                {chat.type === 'CHAT' && chat.sender === userData.sender && (
                  <div key={index}>
                    <div>
                      <div>{chat.sender}</div>
                      <div>{chat.content}</div>
                    </div>
                  </div>
                )} */}
                {chat.type === 'LEAVE' && <div>{chat.sender} 나가셨습니다</div>}
              </>
            ))}
          <div>
            <input
              type="text"
              placeholder="enter the message"
              value={userData.message}
              onChange={handleMessage}
            />
            <button onClick={sendMessage}>send</button>
          </div>
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            // value={userData.sender}
            onChange={e => {
              handleUsername(e);
            }}
          />
          <button
            type="button"
            onClick={() => {
              registerUser();
            }}
          >
            connect
          </button>
          <button type="button" onClick={disConneted}>
            disconnect
          </button>
        </div>
      )}
      <hr></hr>
      {isChating && (
        <PlanChating
          stompClient={stompClient}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;

// default props 작성 위치
PlanMap.defaultProps = {};

export default PlanMap;

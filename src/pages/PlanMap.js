import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
import Headerbar from '../shared/Headerbar';
import { Button } from '../elements';

import { Navigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

import PlanChating from './PlanChating';
import { useDispatch, useSelector } from 'react-redux';
import { setIsChating, setPublicChats } from '../redux/modules/mainsys.js';
import { setUserName } from '../redux/modules/user.js';
//카카오 맵
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Ellipse32, trash_3 } from '../img';

//테스트
import axios from 'axios';
import { getPlanId, setPublicMaps } from '../redux/modules/map';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */
let stompClient = null;

const PlanMap = props => {
  const dispatch = useDispatch();
  // const userNick = props.userNick; //selector
  // props.setGuestNick(userNick); //guestNick 초기화
  // const [guestNick, setGuestNick] = useState(userNick);
  const [modal, setModal] = useState(false);
  const path = useParams(); //path주소 받아오기 랜덤URL
  const islogin = useSelector(state => state.user.is_login);
  const inputRef = useRef();
  console.log('props.guestNick', props.guestNick, 'modal', modal);
  useEffect(() => {
    dispatch(getPlanId(path.url));
    console.log('PlanMap::didmount');

    if (userData.sender === undefined || userData.sender === '') setModal(true);

    // if (userNick === null || userNick === undefined) {
    //   console.log('if');
    //   setModal(true);
    // } else {
    //   console.log('else');

    //   // props.setGuestNick(userNick);
    //   console.log('connect');
    //   connect();
    // }
  }, []);
  const planId = useSelector(state => state.map.planId);
  const useInterval = (callback, delay) => {
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

  //소켓관련
  let sock = useRef({});
  const publicChats = useSelector(state => state.main.publicChats);
  const publicMaps = useSelector(state => state.map.publicMaps);

  // const [publicChats, setPublicChats] = useState([]);
  // const [isChating, setIsChating] = useState(false);
  const isChating = props.isChating;
  const [userData, setUserData] = useState({
    sender: '',
    connected: false,
    content: '',
  });
  console.log(publicChats);
  console.log(publicMaps);
  useEffect(() => {
    console.log('PlanMap::didmount12312');

    // console.log
    // handleUsername();
    return () => {
      console.log('PlanMap::Undidmount222');
    };
  }, [publicChats, publicMaps]);
  const sockUrl = process.env.REACT_APP_BE_IP_LYW + '/ws';
  //처음연결
  const connect = () => {
    console.log('connectconnect');
    // if (props.guestNick === undefined) return;
    console.log('connectconnect2');

    sock = new SockJS(sockUrl);
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
    // sock.addEventListener('open', () => {
    //   console.log('Connected to Browser!!!😀');
    // });
    // sock.addEventListener('message', message => {
    //   console.log('Got this:', message, '😀');
    // });
    sock.addEventListener('close', () => {
      console.log('Disconnected to Server😀');
    });
  };
  //유저입장체크
  const userJoin = () => {
    let chatMessage = {
      // sender: userData.sender,
      sender: props.guestNick,
      planId: planId,
      lat: myLocation.center.lat,
      lng: myLocation.center.lng,
      type: 'ENTER',
    };
    // stompClient.send('/chat/chat.sendMessage', {}, JSON.stringify(chatMessage));
    stompClient.send('/maps/enter', {}, JSON.stringify(chatMessage));

    // setTimeout(() => {
    //   sendMyLocation();
    // }, 1000);
  };
  //연결
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    //구독
    stompClient.subscribe(
      `/topic/chat/${planId}`,
      onMessageReceivedChat,
      onError,
    );

    stompClient.subscribe(`/topic/map/${planId}`, onMessageReceived, onError);
    userJoin();
  };
  //연결해제
  const disConneted = () => {
    // stompClient.disconneted(() => {
    //   console.log('disconnect');
    // });
  };
  //메시지 받기
  const onMessageReceived = payload => {
    let payloadData = JSON.parse(payload.body);
    console.log('payloadData=', payloadData);
    if (payloadData.type === 'ENTER' || payloadData.type === 'CHAT') {
      dispatch(setPublicChats(payloadData));
      sendMyLocation();
    }

    if (payloadData.type === 'MAP' || payloadData.type === 'DEST') {
      dispatch(setPublicMaps(payloadData));
      if (payloadData.type === 'MAP') {
        const data = {
          lat: payloadData.lat,
          lng: payloadData.lng,
        };
        setPoints(payloade => [...payloade, data]);
      }
      if (payloadData.type === 'DEST') {
        const data = {
          lat: payloadData.destLat,
          lng: payloadData.destLng,
        };
        setPoints(payloade => [...payloade, data]);
      }
    }
    // console.log(payloadData.type === 'MAP' || payloadData.type === 'DEST');

    if (payloadData.type === 'ENTER') {
      sendMyLocation();
    }

    //마지막 배열의 타입이 ENTER일때 내위치 전송
  };
  const onMessageReceivedChat = payload => {
    let payloadData = JSON.parse(payload.body);
    console.log('payloadData=', payloadData);
    if (payloadData.type === 'ENTER' || payloadData.type === 'CHAT')
      dispatch(setPublicChats(payloadData));

    //마지막 배열의 타입이 ENTER일때 내위치 전송
  };
  //에러
  const onError = err => {
    console.log('Error', err);
  };

  //보내기 버튼
  const sendMessage = () => {
    console.log(' 메시지 보내기 클릭!');
    if (stompClient) {
      let chatMessage = {
        sender: props.guestNick,
        content: userData.content,
        planId: planId,
        type: 'CHAT',
      };
      console.log(' 내가 보낸 메시지 ==', chatMessage);

      stompClient.send('/maps/chat.send', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, content: '' });
    }
  };
  //유저 추가 //게스트 커넥트
  const handleUsername = event => {
    // const { value } = event.target;
    console.log('setUSer');
    console.log('props.guestNick', props.guestNick);
    setUserData({ ...userData, sender: props.guestNick, connected: true });
  };
  //메시지 내용 추가함수
  const handleMessage = event => {
    const { value } = event.target;
    setUserData({ ...userData, content: value });
  };
  const registerUser = () => {
    connect();
  };

  //소켓관련 끝

  //지도 관련
  const [map, setMap] = useState();
  const [myLocation, setSetMyLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [points, setPoints] = useState([
    { lat: myLocation.lat, lng: myLocation.lng },
  ]);
  // console.log(points);
  //위치보내기
  const sendMyLocation = () => {
    console.log('위치보내기!');
    if (stompClient) {
      let chatMessage = {
        sender: props.guestNick,
        lat: myLocation.center.lat,
        lng: myLocation.center.lng,
        type: 'MAP',
        planId: planId,
      };
      console.log(' 위치보내기 ==', chatMessage);

      stompClient.send('/maps/map.send', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, lat: '', lng: '' });
    }
  };
  // useInterval(() => {
  //   sendMyLocation();
  // }, 3000);
  const bounds = useMemo(() => {
    const bounds = new window.kakao.maps.LatLngBounds();

    points.forEach(point => {
      bounds.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  }, [points]);
  useEffect(() => {
    //현재 내위치 얻기
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        position => {
          setSetMyLocation(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude.toFixed(5), // 위도
              lng: position.coords.longitude.toFixed(5), // 경도
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

    console.log('PlanMap::didmount2');

    return () => {
      console.log('PlanMap::Undidmount2');
    };
  }, []);

  return (
    <>
      <Headerbar
        is_Edit
        text="모임이름{} 채팅방"
        _onClickClose={() => {
          Navigate('/main');
        }}
        _onClickEdit={() => {}}
      ></Headerbar>

      {modal && (
        <Section>
          <MainModal>
            <ModalPopup>
              <ModalText>
                <div>
                  <div>닉네임</div>
                  <div>닉네임을 입력해주세요.</div>
                  <input ref={inputRef}></input>
                </div>
              </ModalText>
              <ModalButton>
                <ModalButtonCencel>취소</ModalButtonCencel>
                <ModalButtonOk
                  onClick={() => {
                    if (props.guestNick !== '') setModal(false);
                    props.setGuestNick(inputRef.current.value);

                    // dispatch(setUserName(inputRef.current.value));
                    handleUsername();

                    connect();
                  }}
                >
                  확인
                </ModalButtonOk>
              </ModalButton>
            </ModalPopup>
          </MainModal>
        </Section>
      )}
      <Button
        _onClick={() => {
          if (isChating) dispatch(setIsChating(false));
          else dispatch(setIsChating(true));
        }}
      >
        Chating
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
        onCreate={setMap}
      >
        {!myLocation.isLoading && <MapMarker position={myLocation.center} />}
        {/* <MapMarker position={{ lat: 37.49732678, lng: 127.13505 }}></MapMarker> */}
        {publicMaps &&
          publicMaps.map((chat, index) => (
            // console.log('MAP', chat),
            <>
              {chat.type === 'MAP' && (
                <MapMarker
                  key={'map' + index}
                  position={{ lat: chat.lat, lng: chat.lng }}
                />
              )}
              {chat.type === 'DEST' && (
                <MapMarker
                  key={'DEST' + index}
                  position={{
                    lat: parseFloat(chat.destLat).toFixed(5),
                    lng: parseFloat(chat.destLng).toFixed(5),
                  }}
                  image={{
                    src: Ellipse32,
                    size: { width: 21, height: 21 },
                  }}
                ></MapMarker>
              )}
            </>
          ))}
      </Map>
      {/* <button
        onClick={() => {
          if (map) map.setBounds(bounds);
        }}
      >
        지도 범위 재설정 하기
      </button> */}

      <hr></hr>
      {isChating && (
        <PlanChating
          stompClient={stompClient}
          userData={userData}
          setUserData={setUserData}
          publicChats={publicChats}
          handleMessage={handleMessage}
          sendMessage={sendMessage}
          guestNick={props.guestNick}
          handleUsername={handleUsername}
          planId={planId}
        />
      )}
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;
const Section = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px 40px 0px 0px;
`;

const MainModal = styled.div`
  position: absolute;
  width: 80%;
  height: 30%;
  background-color: white;
  border-radius: 15px;
`;
const ModalPopup = styled.div`
  height: 100%;
`;
const ModalText = styled.div`
  height: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ModalButton = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const ModalButtonOk = styled.div`
  height: 40px;
  width: 50%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #9e9e9e;
`;
const ModalButtonCencel = styled.div`
  height: 40px;
  width: 50%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #9e9e9e;
`;

// default props 작성 위치
PlanMap.defaultProps = {};

export default PlanMap;

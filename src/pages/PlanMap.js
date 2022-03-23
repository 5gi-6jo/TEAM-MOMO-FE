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
import { setUserName } from '../redux/modules/user.js';
//카카오 맵
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Grid } from '../elements/index';

//임시 모달

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */
let stompClient = null;

const PlanMap = props => {
  const dispatch = useDispatch();
  const [guestNick, setGuestNick] = useState(undefined);
  const [modal, setModal] = useState(false);
  const islogin = useSelector(state => state.user.is_login);
  console.log(islogin);
  const userNick = useSelector(state => state.user.user_info.nickname);

  useEffect(() => {
    console.log('PlanMap::didmount');
    console.log('userNick', userNick, 'guestNick', guestNick);
    if (userNick === undefined) {
      setModal(true);
    } else {
      setGuestNick(userNick);
      connect();
    }
    console.log('userNick', userNick, 'guestNick', guestNick);

    return console.log('PlanMap::Undidmount');
  }, [guestNick]);
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
  useEffect(() => {
    console.log('PlanMap::didmount12312');

    return console.log('PlanMap::Undidmount12321');
  }, [publicChats]);
  const sockUrl = process.env.REACT_APP_BE_IP_LYW + '/ws';

  //처음연결
  const connect = () => {
    console.log('connect');
    if (userData.sender === undefined) return;
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
      // sender: userData.sender,
      sender: guestNick,
      type: 'ENTER',
    };
    stompClient.send('/chat/chat.sendMessage', {}, JSON.stringify(chatMessage));
    // stompClient.send("/maps/enter", {}, JSON.stringify(chatMessage));

    // setTimeout(() => {
    //   sendMyLocation();
    // }, 1000);
  };
  //연결
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    //구독
    stompClient.subscribe(`/topic/public`, onMessageReceived, onError);
    // stompClient.subscribe(`/topic/momo`, onMessageReceived, onError);
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
        sender: guestNick,
        content: userData.content,
        type: 'CHAT',
      };
      console.log(' 내가 보낸 메시지 ==', chatMessage);
      stompClient.send(
        '/chat/chat.sendMessage',
        {},
        JSON.stringify(chatMessage),
      );
      // stompClient.send('/maps/chat.send', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, content: '' });
    }
  };
  //유저 추가 //게스트 커넥트
  const handleUsername = event => {
    // const { value } = event.target;
    console.log('setUSer');
    setUserData({ ...userData, sender: guestNick });
    // setTimeout(() => {
    //   connect();
    // }, 1000);
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
        sender: guestNick,
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
      // stompClient.send('/maps/map.send', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, lat: '', lng: '' });
    }
  };
  useEffect(() => {
    //현재 내위치 얻기
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        position => {
          setSetMyLocation(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude.toFixed(3), // 위도
              lng: position.coords.longitude.toFixed(3), // 경도
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
    console.log('userNick2', userNick, 'guestNick2', guestNick);

    return console.log('PlanMap::Undidmount2');
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

      {modal && !islogin && (
        <Section>
          <MainModal>
            <ModalPopup>
              <ModalText>
                <div>
                  <div>닉네임</div>
                  <div>닉네임을 입력해주세요.</div>
                  <input
                    onChange={e => {
                      setGuestNick(e.target.value);
                    }}
                  ></input>
                </div>
              </ModalText>
              <ModalButton>
                <ModalButtonCencel>취소</ModalButtonCencel>
                <ModalButtonOk
                  onClick={() => {
                    if (guestNick !== '') setModal(false);
                    handleUsername();
                    dispatch(setUserName(guestNick));

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
          if (isChating) setIsChating(false);
          else setIsChating(true);
        }}
      >
        test
      </Button>
      <Button _onClick={sendMyLocation}>내 위치 보내기</Button>
      <Button _onClick={connect}>커넥트</Button>
      <Button
        _onClick={() => {
          console.log('disconnect버튼');
          stompClient.disconneted(() => {
            console.log('disconnect');
          });
        }}
      >
        디스커넥트
      </Button>
      <Button
        _onClick={() => {
          console.log(userData);
        }}
      >
        유저데이터
      </Button>
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
          publicChats.map((chat, index) => (
            // console.log('chat', chat),
            <>
              {chat.type === 'MAP' && (
                <MapMarker
                  key={'map' + index}
                  position={{ lat: chat.lat, lng: chat.lng }}
                />
              )}
            </>
          ))}
      </Map>
      {userData.connected ? (
        <div>
          {publicChats &&
            publicChats.map((chat, index) => (
              <>
                {chat.type === 'JOIN' && (
                  <div key={'ENTER' + index}>{chat.sender}입장</div>
                )}

                {chat.type === 'LEAVE' && (
                  <div key={'LEAVE' + index}>{chat.sender} 나가셨습니다</div>
                )}
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
              // registerUser();
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

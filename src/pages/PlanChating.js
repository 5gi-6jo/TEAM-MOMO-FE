import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
import Headerbar from '../shared/Headerbar';
import { Navigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

import {
  disConneted,
  handleMessage,
  handleUsername,
  publicChats,
  registerUser,
  sendMessage,
  settestvalue,
  testcol,
  testvalue,
  userData,
} from '../shared/apis/Socket';
import { useDispatch, useSelector } from 'react-redux';
import { setPublicChats } from '../redux/modules/mainsys.js';
/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const PlanChating = props => {
  const dispatch = useDispatch();

  let stompClient = props.stompClient;
  let userData = props.userData;
  let setUserData = props.setUserData;
  const publicChats = useSelector(state => state.main.publicChats);

  useEffect(() => {
    // console.log("ChatRoomEffect");
    // sendMessage();
  }, [userData]);

  const userJoin = () => {
    let chatMessage = {
      sender: userData.sender,
      type: 'ENTER',
    };
    stompClient.send('/chat/chat.sendMessage', {}, JSON.stringify(chatMessage));
  };
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(`/topic/public`, onMessageReceived, onError);
    userJoin();
  };
  const disConneted = () => {
    stompClient.disconneted(() => {
      console.log('disconnect');
    });
  };
  const onMessageReceived = payload => {
    console.log(payload);
    let payloadData = JSON.parse(payload.body);
    console.log('payloadData=', payloadData);
    dispatch(setPublicChats(payloadData));
  };
  const onError = err => {
    console.log('Error', err);
  };
  const handleMessage = event => {
    const { value } = event.target;
    setUserData({ ...userData, content: value });
  };
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
  const handleUsername = event => {
    const { value } = event.target;
    setUserData({ ...userData, sender: value });
  };

  // const registerUser = () => {
  //   connect();
  // };
  return (
    <>
      <Headerbar
        is_Edit
        text="모임이름{} 채팅방"
        _onClickClose={() => {
          Navigate('/');
        }}
        _onClickEdit={() => {}}
      ></Headerbar>
      <div>ChatRoom</div>
      {userData.connected ? (
        <div>
          {publicChats.map((chat, index) => (
            <>
              {chat.type === 'JOIN' && <div>{chat.sender}입장</div>}
              {chat.type === 'CHAT' && chat.sender !== userData.sender && (
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
              )}
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
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;

export default PlanChating;

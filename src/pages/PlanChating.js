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
  // handleUsername,
  publicChats,
  // registerUser,
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
  const publicChats = props.publicChats;

  useEffect(() => {
    // console.log("ChatRoomEffect");
    // sendMessage();
  }, [userData]);

  // const userJoin = () => {
  //   let chatMessage = {
  //     sender: userData.sender,
  //     type: 'ENTER',
  //   };
  //   stompClient.send('/chat/chat.sendMessage', {}, JSON.stringify(chatMessage));
  // };
  // const onConnected = () => {
  //   setUserData({ ...userData, connected: true });
  //   stompClient.subscribe(`/topic/public`, onMessageReceived, onError);
  //   userJoin();
  // };
  // const disConneted = () => {
  //   stompClient.disconneted(() => {
  //     console.log('disconnect');
  //   });
  // };
  // const onMessageReceived = payload => {
  //   console.log(payload);
  //   let payloadData = JSON.parse(payload.body);
  //   console.log('payloadData=', payloadData);
  //   dispatch(setPublicChats(payloadData));
  // };
  // const onError = err => {
  //   console.log('Error', err);
  // };
  const handleMessage = event => {
    const { value } = event.target;
    setUserData({ ...userData, content: value });
  };
  // const sendMessage = () => {
  //   console.log(' 메시지 보내기 클릭!');
  //   if (stompClient) {
  //     let chatMessage = {
  //       sender: userData.sender,
  //       content: userData.content,
  //       type: 'CHAT',
  //     };
  //     console.log(' 내가 보낸 메시지 ==', chatMessage);
  //     stompClient.send(
  //       '/chat/chat.sendMessage',
  //       {},
  //       JSON.stringify(chatMessage),
  //     );
  //     setUserData({ ...userData, content: '' });
  //   }
  // };
  // const handleUsername = event => {
  //   const { value } = event.target;
  //   setUserData({ ...userData, sender: value });
  // };

  // const registerUser = () => {
  //   connect();
  // };
  console.log(userData);
  return (
    <>
      {/* <Headerbar
        is_Edit
        text="모임이름{} 채팅방"
        _onClickClose={() => {
          Navigate('/main');
        }}
        _onClickEdit={() => {}}
      ></Headerbar> */}
      <h1>ChatRoom</h1>
      {userData.connected ? (
        <div>
          <div>sdfasdf</div>
          {publicChats.map((chat, index) => (
            <>
              {chat.type === 'JOIN' && <div>{chat.sender}입장</div>}
              {chat.type === 'CHAT' && chat.sender !== userData.sender && (
                <div key={index} style={{ display: 'flex' }}>
                  <NotMyChatmessageContainer>
                    <NotMySender>{chat.sender}</NotMySender>
                    <NotmessageBoxBackLight>
                      <MYmessageText>{chat.content}</MYmessageText>
                    </NotmessageBoxBackLight>
                  </NotMyChatmessageContainer>
                </div>
              )}
              {chat.type === 'CHAT' && chat.sender === userData.sender && (
                <div key={index}>
                  <MYChatmessageContainer>
                    <MySender>{chat.sender}</MySender>
                    <MymessageBoxBackBlue>
                      <MYmessageText>{chat.content}</MYmessageText>
                    </MymessageBoxBackBlue>
                  </MYChatmessageContainer>
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
            <button onClick={props.sendMessage}>send</button>
          </div>
        </div>
      ) : (
        // <div className="register">
        //   <input
        //     id="user-name"
        //     placeholder="Enter your name"
        //     name="userName"
        //     // value={userData.sender}
        //     onChange={e => {
        //       handleUsername(e);
        //     }}
        //   />
        //   <button
        //     type="button"
        //     onClick={() => {
        //       registerUser();
        //     }}
        //   >
        //     connect
        //   </button>
        //   <button type="button" onClick={disConneted}>
        //     disconnect
        //   </button>
        // </div>
        <div></div>
      )}
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;

const MYChatmessageContainer = styled.div`
  display: flex;
  padding: 0 5%;
  margin-top: 3px;
  justify-content: flex-end;
`;
const MySender = styled.p`
  padding-right: 10px;
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
`;
const MymessageBoxBackBlue = styled.div`
  background: #f3f3f3;
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  display: inline-block;
  max-width: 80%;
  background: ${theme.color.gray5};
`;

const MYmessageText = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
`;

const NotMyChatmessageContainer = styled.div`
  display: flex;
  padding: 0 5%;
  margin-top: 3px;
  justify-content: flex-start;
`;
const NotMySender = styled.p`
  padding-left: 10px;
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
`;
const NotmessageBoxBackLight = styled.div`
  background: #f3f3f3;
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  display: inline-block;
  max-width: 80%;
  background: ${theme.color.green};
`;

export default PlanChating;

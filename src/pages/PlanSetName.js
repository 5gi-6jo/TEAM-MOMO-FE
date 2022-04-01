import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPlanId } from '../redux/modules/map';
import { setUserName } from '../redux/modules/user';
import Plansocket from './Plansocket';

import SockJS from 'sockjs-client';

import { over } from 'stompjs';
const PlanSetName = props => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const inputRef = useRef();
  const userNick = useSelector(state => state.user.user_info).nickname;
  console.log('props.userNick', props.userNick, 'userNick', userNick);

  useEffect(() => {
    console.log('PlanSetName:::didmount');
    if (!userNick && !props.userNick) {
      console.log('닉없음');
      setModal(true);
    }
    //필요한가?
    // else {
    //   dispatch(setUserName(props.userNick));
    // }
  });
  const path = useParams(); //path주소 받아오기 랜덤URL
  useEffect(() => {
    if (path && !planId) dispatch(getPlanId(path.url));
  }, []);

  const planId = useSelector(state => state.map.planId);
  const planName = useSelector(state => state.map.planName);
  let sock = useRef({});
  const sockUrl = process.env.REACT_APP_BE_IP_LYW + '/ws';
  sock = new SockJS(sockUrl);
  let client = over(sock);
  //
  return (
    <>
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
                    // if (props.guestNick !== '') setModal(false);
                    // props.setGuestNick(inputRef.current.value);
                    dispatch(setUserName(inputRef.current.value));
                    setModal(false);
                    // handleUsername();
                    // connect();
                  }}
                >
                  확인
                </ModalButtonOk>
              </ModalButton>
            </ModalPopup>
          </MainModal>
        </Section>
      )}
      {userNick && (
        <Plansocket
          userNick={userNick}
          planId={planId}
          planName={planName}
          client={client}
          sock={sock}
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
  @media ${({ theme }) => theme.device.laptop} {
    border-radius: 40px 40px 0px 0px;
  }
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

export default PlanSetName;

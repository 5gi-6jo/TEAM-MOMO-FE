import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPlanId, setSoketClear } from '../redux/modules/map.js';
import { setUserName } from '../redux/modules/user.js';
import Plansocket from './Plansocket.js';

import SockJS from 'sockjs-client';

import { over } from 'stompjs';
const PlanSetName = props => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const inputRef = useRef();
  const userNick = useSelector(state => state.user.user_info).nickname;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!userNick && !props.userNick) {
      setModal(true);
    }
    //필요한가?
    // else {
    //   dispatch(setUserName(props.userNick));
    // }
    return () => {
      // client.unsubscribe();
      // client.disconnect();
      // dispatch(setSoketClear());
    };
  });
  const path = useParams(); //path주소 받아오기 랜덤URL
  useEffect(() => {
    if (path && !planId) dispatch(getPlanId(path.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {/* 취소 삭제 */}
                {/* <ModalButtonCencel>취소</ModalButtonCencel> */}
                <ModalButtonOk
                  onClick={() => {
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
      {userNick && planId && (
        <Plansocket
          path={path}
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
// eslint-disable-next-line no-unused-vars
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
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #9e9e9e;
  border-radius: 0px 0px 15px 15px;
`;
const ModalButtonCencel = styled.div`
  height: 40px;
  width: 50%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #9e9e9e;
`;

// default props 작성 위치
PlanSetName.defaultProps = { islogin: false, userNick: '' };
export default PlanSetName;

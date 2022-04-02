import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Header from '../shared/Header';
import { Line17 } from '../img';
import ModalInput from '../components/Modal/ModalInput';
import { useDispatch } from 'react-redux';
import { setFCMToken } from '../redux/modules/user';
import { setFCMTokenplan } from '../redux/modules/plan';
import { deleteToken, getToken } from 'firebase/messaging';
import { messaging } from '../firebase';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Mypage = props => {
  const dispatch = useDispatch();
  //modal
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const modalEl = useRef();
  const FCMsetup = () => {
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    }).then(token => {
      console.log('token', token);
      sessionStorage.setItem('FCMtoken', token);
      const data = {
        token: sessionStorage.getItem('FCMtoken'),
      };

      dispatch(setFCMToken(data));
    });
  };
  const FCMremove = () => {
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    }).then(token => {
      deleteToken(messaging).then(() => {
        console.log('deletetoken');
        sessionStorage.deleteToken('FCMtoken');
        const data = {
          token: '',
        };

        dispatch(setFCMToken(data));
      });
    });
  };
  const [FCM, setFCM] = useState(false);
  const FCMtoggle = () => {
    if (!FCM) {
      FCMsetup();
      setFCM(true);
    } else {
      FCMremove();
      setFCM(false);
    }
  };
  const handleModalEl = ({ target }) => {
    if (modalOpen && !modalEl.current.contains(target)) setModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleModalEl);
    return () => {
      window.removeEventListener('click', handleModalEl);
    };
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Grid is_flex padding="20px 0px 0px 0px">
        <Text size="14px" bold>
          마이페이지
        </Text>
      </Grid>
      <Mypage01 src={Line17} />
      <Grid padding="40px 0px 0px 30px">
        <Text size="20px" bold>
          '모여라'님 <br />
          안녕하세요.
        </Text>
      </Grid>
      <Grid left padding="10px 0px 30px 30px">
        <div onClick>
          <Text size="13px">닉네임변경</Text>
        </div>
        <div onClick>
          <Text size="13px">로그아웃</Text>
        </div>
      </Grid>
      <Mypage01 src={Line17} />
      <Grid padding="30px 0px 0px 30px">
        <div onClick>
          <Text size="18px" bold>
            계정설정
          </Text>
        </div>
        <br />
        <div onClick>
          <Text size="18px" bold>
            피드백 보내기
          </Text>
        </div>
      </Grid>
      <button onClick={openModal}>모달팝업버튼</button>
      <button
        onClick={() => {
          dispatch(setFCMTokenplan());
        }}
      >
        FCM test
      </button>
      {!FCM ? <div>구독취소</div> : <div>구독</div>}
      <button onClick={FCMtoggle}>FCM구독 버튼</button>
      <ModalInput
        open={modalOpen}
        close={closeModal}
        title="팝업창제목"
        contents="팝업창내용"
        ref={modalEl}
        // _onChange={실행시킬함수}
      ></ModalInput>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

const Mypage01 = styled.img``;

// default props 작성 위치
Mypage.defaultProps = {};

export default Mypage;

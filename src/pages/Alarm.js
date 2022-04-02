import { deleteToken, getToken } from 'firebase/messaging';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalInput from '../components/Modal/ModalInput';
import { messaging } from '../firebase';
import { setFCMTokenplan } from '../redux/modules/plan';
import { setFCMToken } from '../redux/modules/user';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Alarm = () => {
  const dispatch = useDispatch();

  //modal
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const modalEl = useRef();

  const handleModalEl = ({ target }) => {
    if (modalOpen && !modalEl.current.contains(target)) setModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleModalEl);
    return () => {
      window.removeEventListener('click', handleModalEl);
    };
  }, []);

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
  return (
    <React.Fragment>
      <button onClick={openModal}>모달팝업버튼</button>
      <ModalInput
        open={modalOpen}
        close={closeModal}
        title="팝업창제목"
        contents="팝업창내용"
        // _onChange={실행시킬함수}
      ></ModalInput>
      <button
        onClick={() => {
          dispatch(setFCMTokenplan());
        }}
      >
        FCM test
      </button>
      {!FCM ? <div>구독취소</div> : <div>구독</div>}
      <button onClick={FCMtoggle}>FCM구독 버튼</button>
    </React.Fragment>
  );
};

// styled components 작성 위치

// default props 작성 위치
Alarm.defaultProps = {};

export default Alarm;

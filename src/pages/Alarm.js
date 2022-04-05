import { deleteToken, getToken } from 'firebase/messaging';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ModalInput from '../components/Modal/ModalInput';
import { Grid, Text } from '../elements';
import { messaging } from '../firebase';
import { setFCMTokenplan } from '../redux/modules/plan';
import { setFCMToken } from '../redux/modules/user';
import Headerbar from '../shared/Headerbar';
import { getCookie, setCookie } from '../shared/utils/Cookie';
import theme from '../Styles/theme';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Alarm = () => {
  const user = useLocation().state.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FCMsetup = () => {
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    }).then(token => {
      setCookie('FCMtoken', token, 20);
      const data = {
        token: getCookie('FCMtoken'),
      };

      dispatch(setFCMToken(data));
    });
  };
  const FCMremove = () => {
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    }).then(token => {
      deleteToken(messaging).then(() => {
        console.log('deleteFCMtoken');
        deleteToken('FCMtoken');
        const data = {
          token: '',
        };
        dispatch(setFCMToken(data));
      });
    });
  };
  const [FCM, setFCM] = useState(
    user.noticeAllowed ? user.noticeAllowed : false,
  );

  const [toggle, setToggle] = useState(
    user.noticeAllowed ? user.noticeAllowed : false,
  );
  const clickToggle = () => {
    setToggle(prev => !prev);
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
      <Headerbar
        isback
        text="알림"
        _onClickClose={() => {
          navigate('/mypage', { replace: true });
        }}
      />
      <Grid is_flex padding="10px 20px">
        <Grid left>
          <Text size="16px" width="50px" bold color={theme.color.gray1}>
            알림
          </Text>
          <ToggleBox>
            <ToggleBtn onClick={clickToggle} toggle={toggle}>
              <ToggleCircle toggle={toggle}></ToggleCircle>
            </ToggleBtn>
          </ToggleBox>
        </Grid>
      </Grid>
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
    </React.Fragment>
  );
};

// styled components 작성 위치
const ToggleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  padding: 20px 0px;
`;
const ToggleBtn = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${props => (!props.toggle ? '#8C8C8C' : '#2DBEB1')};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const ToggleCircle = styled.div`
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 50px;
  position: absolute;
  left: 7%;
  transition: all 0.5s ease-in-out;
  ${props =>
    props.toggle &&
    css`
      transform: translate(25px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;
// default props 작성 위치
Alarm.defaultProps = {};

export default Alarm;

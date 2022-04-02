import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Header from '../shared/Header';
import { Line17 } from '../img';
import ModalInput from '../components/Modal/ModalInput';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi';

import theme from '../Styles/theme';
import { useSelector } from 'react-redux';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_info);

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
      <Header />
      <Grid is_flex padding="20px 0px 0px 0px">
        <Text size="14px" bold>
          마이페이지
        </Text>
      </Grid>
      <Mypage01 src={Line17} />
      <Grid is_flex padding="30px 0px 0px 30px">
        <Mypage03>
          <Text color={theme.color.black} size="20px" bold>
            {user.nickname ? user.nickname : 'unknown'}님
            <br />
            안녕하세요.
          </Text>
        </Mypage03>
      </Grid>
      <Mypage04>
        <div
          onClick={() => {
            navigate('/Mypage', { replace: true });
          }}
        >
          <Text color={theme.color.gray4} size="13px">
            닉네임변경
          </Text>
        </div>
        <div
          onClick={() => {
            navigate('/Mypage', { replace: true });
          }}
        >
          <Text color={theme.color.gray4} size="13px">
            로그아웃
          </Text>
        </div>
      </Mypage04>
      <Mypage01 src={Line17} />
      <Grid padding="20px">
        <Grid padding="20px">
          <Mypage02>
            <Text size="18px" bold margin="0px">
              로그인
            </Text>
            <Icon
              onClick={() => {
                navigate('/');
              }}
            >
              <HiOutlineChevronRight className="right" />
            </Icon>
          </Mypage02>
        </Grid>
        <Grid padding="20px">
          <Mypage02>
            <Text size="18px" bold margin="0px">
              계정설정
            </Text>
            <Icon
              onClick={() => {
                navigate('/Mypage');
              }}
            >
              <HiOutlineChevronRight className="right" />
            </Icon>
          </Mypage02>
        </Grid>
        <Grid padding="20px">
          <Mypage02>
            <Text size="18px" bold margin="0px">
              피드백 보내기
            </Text>
            <Icon
              onClick={() => {
                navigate('/Mypage');
              }}
            >
              <HiOutlineChevronRight className="right" />
            </Icon>
          </Mypage02>
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
      {!FCM ? <div>구독취소</div> : <div>구독</div>}
      <button onClick={FCMtoggle}>FCM구독 버튼</button>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

const Mypage01 = styled.img``;
const Mypage02 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
`;
const Mypage03 = styled.div``;
const Mypage04 = styled.div`
  display: flex;
  padding: 10px 0px 30px 30px;
`;

const Icon = styled.div`
  position: relative;
  .right {
  }
`;

// default props 작성 위치
Mypage.defaultProps = {};

export default Mypage;

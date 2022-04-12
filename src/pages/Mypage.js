import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Header from '../shared/Header';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi';
import theme from '../Styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/modules/user';
import { deleteCookie } from '../shared/utils/Cookie';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Mypage = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user_info);
  const is_login = useSelector(state => state.user.is_login);
  // member modal
  // 조건문 isLogin true
  // const [modalOpenInput, setModalOpenInput] = useState(false);

  // const openModalInput = () => {
  //   setModalOpenInput(true);
  // };
  // const closeModalInput = () => {
  //   setModalOpenInput(false);
  // };
  // const inputRef = useRef();

  // guest modal
  // const [modalOpenCancel, setModalOpenCancel] = useState(false);

  // const openModalCancel = () => {
  //   setModalOpenCancel(true);
  // };
  // const closeModalCancel = () => {
  //   setModalOpenCancel(false);
  // };

  const dispatch = useDispatch();

  const Logout = () => {
    // logout function
    dispatch(logout());
    deleteCookie('token');
  };

  return (
    <React.Fragment>
      <Header />
      {/* 조건문 isLogin true */}
      {/* <ModalInput
        open={modalOpenInput}
        close={closeModalInput}
        title="닉네임 설정"
        contents="사용하실 닉네임을 입력해주세요."
        _onChange={() => {
          dispatch(setUserName(inputRef.current.value));
        }}
      ></ModalInput> */}

      {/* 조건문 isLogin false */}
      {/* <ModalCancel
        open={modalOpenCancel}
        close={closeModalCancel}
        title="로그인"
        contents="로그인 시 이용가능한 서비스입니다."
        _onChange={() => {
          navigate('/');
        }}
      ></ModalCancel> */}
      <Grid is_flex padding="20px">
        <Text size="14px" bold>
          마이페이지
        </Text>
      </Grid>
      <hr />
      <div style={{ padding: '15px' }}></div>
      <Grid is_flex padding="10px 30px">
        <div>
          <Text color={theme.color.black} size="20px" bold>
            {user.nickname ? user.nickname : 'unknown'}님
          </Text>
          <div style={{ padding: '3px' }}></div>
          <Text color={theme.color.black} size="20px" bold>
            안녕하세요.
          </Text>
        </div>
      </Grid>
      <UserHandler>
        {/* 조건문 isLogin true */}
        {/* <div onClick={openModalInput}>
          <Text color={theme.color.gray4} size="13px">
            닉네임 설정
          </Text>
        </div> */}

        {/* 조건문 isLogin false */}
        {/* <div onClick={openModalCancel}>
          <Text color={theme.color.gray4} size="13px">
            닉네임 설정
          </Text>
        </div> */}

        {/* 조건문 isLogin true */}
        {is_login ? (
          <>
            <div onClick={Logout}>
              <Text color={theme.color.gray4} size="13px">
                로그아웃
              </Text>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                navigate('/', { replace: true });
              }}
            >
              <Text color={theme.color.gray4} size="13px">
                로그인/회원가입
              </Text>
            </div>
          </>
        )}
      </UserHandler>
      <div style={{ padding: '15px' }}></div>
      <hr />
      {/* <Grid is_Grid padding="20px 30px">
        <div
          onClick={() => {
            navigate('/mypage');
          }}
        >
          <Text size="18px" bold margin="0px">
            계정설정
          </Text>
        </div>
        <div></div>
        <Grid
          right
          _onClick={() => {
            navigate('/mypage');
          }}
        >
          <HiOutlineChevronRight className="right" />
        </Grid>
      </Grid> */}
      <Grid is_Grid padding="20px 30px">
        <div
          onClick={() => {
            navigate('/alarm', { state: { user: user } });
          }}
        >
          <Text size="18px" bold margin="0px">
            알림 설정
          </Text>
        </div>
        <div></div>
        <Grid
          right
          _onClick={() => {
            navigate('/alarm', { state: { user: user } });
          }}
        >
          <HiOutlineChevronRight className="right" />
        </Grid>
      </Grid>
      <Grid is_Grid padding="20px 30px">
        <div
          onClick={() => {
            navigate('/mypage');
          }}
        >
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSduVwRbs2Mf0K7o9zQbPw1QGmn9iS-PUtnnY-gSfJ_scvgLbA/viewform?usp=sf_link">
            <Text size="16px" bold margin="0px">
              피드백 보내기
            </Text>
          </a>
        </div>
        <div></div>
        <Grid
          right
          _onClick={() => {
            window.location.assign(
              'https://docs.google.com/forms/d/e/1FAIpQLSduVwRbs2Mf0K7o9zQbPw1QGmn9iS-PUtnnY-gSfJ_scvgLbA/viewform?usp=sf_link',
            );
          }}
        >
          <HiOutlineChevronRight className="right" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// styled components 작성 위치
const UserHandler = styled.div`
  display: flex;
  margin: 0px 30px;
`;

// default props 작성 위치
Mypage.defaultProps = {};

export default Mypage;

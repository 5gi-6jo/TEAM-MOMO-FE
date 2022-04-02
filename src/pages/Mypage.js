import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Header from '../shared/Header';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi';
import theme from '../Styles/theme';
import { useSelector } from 'react-redux';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Mypage = ({ isLogin }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user_info);

  const Logout = () => {
    navigate('/');
    //로그아웃 실행함수
  };

  return (
    <React.Fragment>
      <Header />
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
        <div //modal
        >
          <Text color={theme.color.gray4} size="13px">
            닉네임 설정
          </Text>
        </div>
        {/* 조건문 isLogin true */}
        {/* <div style={{ padding: '5px' }}></div>
        <div onClick={Logout}>
          <Text color={theme.color.gray4} size="13px">
            로그아웃
          </Text>
        </div> */}
        {/* 조건문 isLogin false */}
        <div style={{ padding: '5px' }}></div>
        <div
          onClick={() => {
            navigate('/login', { replace: true });
          }}
        >
          <Text color={theme.color.gray4} size="13px">
            로그인/회원가입
          </Text>
        </div>
      </UserHandler>
      <div style={{ padding: '15px' }}></div>
      <hr />
      <Grid is_Grid padding="20px 30px">
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
      </Grid>
      <Grid is_Grid padding="20px 30px">
        <div
          onClick={() => {
            navigate('/alarm');
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
            navigate('/alarm');
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
          <Text size="18px" bold margin="0px">
            피드백 보내기
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

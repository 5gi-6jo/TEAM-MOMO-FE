import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import Button from '../elements/Button';
import { Grid, Text } from '../elements';
import theme from '../Styles/theme';
import { momoKor, Line4 } from '../img';
import Headerbar from '../shared/Headerbar';

const Login = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      //modal
      navigate('/main');
    }
  });

  return (
    <React.Fragment>
      <Headerbar
        text="로그인/회원가입"
        _onClickClose={() => {
          navigate('/');
        }}
      />
      <Grid padding="75px 125px 0px 125px">
        <Login01 src={momoKor} />
      </Grid>
      <LoginForm />
      <Login04>
        <div
          onClick={() => {
            navigate('/', { replace: true });
          }}
        >
          <Text color={theme.color.gray4} size="12px">
            아이디 찾기
          </Text>
        </div>
        <Login02 src={Line4} />
        <div
          onClick={() => {
            navigate('/', { replace: true });
          }}
        >
          <Text color={theme.color.gray4} size="12px">
            비밀번호 찾기
          </Text>
        </div>
      </Login04>
      {/* <Login03 src={Line5} /> */}
      <hr />
      <Grid center padding="20px 0px 0px 0px">
        <Text color={theme.color.gray4} size="12px">
          '모두모여'가 처음이신가요?
        </Text>
      </Grid>
      <Grid padding="10px 0px 0px 20px">
        <Button
          width="320px"
          name={'회원가입하기'}
          _onClick={() => {
            navigate('/Register', { replace: true });
          }}
          value
          is_green
        />
      </Grid>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

const Login01 = styled.img`
  width: 100%;
  height: 100%;
`;

const Login02 = styled.img``;

const Login04 = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  align-content: stretch;
  justify-content: space-evenly;
  padding: 10px 50px 30px 50px;
`;

// defayltProps 작성 위치;
Login.defaultProps = {};

export default Login;

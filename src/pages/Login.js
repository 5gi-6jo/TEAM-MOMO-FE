import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import Button from '../elements/Button';
import { Grid, Input, Text } from '../elements';
import theme from '../Styles/theme';

const Login = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      alert('이미 로그인이 되어있습니다.');
      navigate('/main');
    }
  });

  return (
    <>
      <React.Fragment>
        <TextBox>
          <Text color={theme.color.black} size="20px">
            모두모여!!!
          </Text>
        </TextBox>
        <LoginForm />
        <TextBox>
          <Text color={theme.color.black} size="20px">
            '모두모여'가 처음이신가요?
          </Text>
        </TextBox>
        <Button
          name={'회원가입하기'}
          _onClick={() => {
            navigate('/Register', { replace: true });
          }}
        />
      </React.Fragment>
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

const TextBox = styled.div``;

// default props 작성 위치
Login.defaultProps = {};

export default Login;

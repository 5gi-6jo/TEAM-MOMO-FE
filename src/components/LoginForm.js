import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import { login, setFCMToken } from '../redux/modules/user';
import { checkEmail } from '../shared/functions';
import { Grid, Input } from '../elements';
import theme from '../Styles/theme';

const LoginForm = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const pwRef = useRef();

  console.log(emailRef, pwRef);
  const onLogin = e => {
    e.preventDefault();

    let email = emailRef.current.value;
    let pw = pwRef.current.value;

    if (!checkEmail(email).res) {
      emailRef.current.focus();
      return;
    }

    if (pw === '') {
      pwRef.current.focus();
    }

    const loginData = {
      email: email,
      password: pw,
    };

    dispatch(login(loginData)).then(res => navigate('/main'));
    const data = {
      token: sessionStorage.getItem('FCMtoken'),
    };

    dispatch(setFCMToken(data));
  };

  return (
    <Form onSubmit={onLogin}>
      <Grid padding="100px 20px 0px 20px">
        <Input
          labelBold
          labelColor={theme.color.gray1}
          _ref={emailRef}
          type="text"
          labelText="이메일"
          placeholder="이메일 주소 (아이디)"
          width="10px"
        />
        {/* <input ref={emailRef}></input> */}
      </Grid>
      <Grid padding="0px 20px 0px 20px">
        <Input
          labelBold
          labelColor={theme.color.gray1}
          _ref={pwRef}
          type="password"
          labelText="비밀번호"
          placeholder="비밀번호"
        />
      </Grid>
      <Button
        name={'로그인하기'}
        width="320px"
        heignt="42px"
        margin="20px 0px 0px 20px"
        abled
      />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default LoginForm;

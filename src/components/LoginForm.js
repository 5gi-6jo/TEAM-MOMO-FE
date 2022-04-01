import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import { login, setFCMToken } from '../redux/modules/user';
import { Grid, Input } from '../elements';
import theme from '../Styles/theme';

const LoginForm = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <Form onSubmit={LoginForm}>
      <Grid padding="75px 20px 0px 20px">
        <Input
          labelBold
          labelColor={theme.color.gray1}
          value={email}
          type="text"
          labelText="이메일"
          placeholder="이메일 주소 (아이디)"
          width="10px"
          _onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </Grid>
      <Grid padding="0px 20px 0px 20px">
        <Input
          labelBold
          labelColor={theme.color.gray1}
          value={pw}
          type="password"
          labelText="비밀번호"
          placeholder="비밀번호"
          _onChange={e => {
            setPw(e.target.value);
          }}
        />
      </Grid>
      <Button
        name={'로그인하기'}
        width="320px"
        heignt="42px"
        margin="20px 0px 0px 20px"
        abled
        _onClick={() => {
          const loginData = {
            email: email,
            password: pw,
          };
          dispatch(login(loginData));
          navigate('/main');
          // .then(res => navigate('/main'));

          const data = {
            token: sessionStorage.getItem('FCMtoken'),
          };

          dispatch(setFCMToken(data));
        }}
      />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default LoginForm;

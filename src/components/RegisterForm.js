import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import { register } from '../redux/modules/user';
import { checkEmail, checkNickname, checkPW } from '../shared/functions';
import { Grid, Input } from '../elements';
import Agreement from './Agreement';
import theme from '../Styles/theme';

const RegisterForm = props => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const nicknameRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();
  const dispatch = useDispatch();

  const onRegist = e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const nickname = nicknameRef.current.value;
    const pw = pwRef.current.value;
    const pwCheck = pwCheckRef.current.value;

    if (!checkEmail(email).res) {
      emailRef.current.focus();
      alert(checkEmail(email).msg);
      return;
    }

    if (!checkNickname(nickname).res) {
      nicknameRef.current.focus();
      alert(checkNickname(nickname).msg);
      return;
    }

    if (!checkPW(pw, pwCheck, nickname).res) {
      if (checkPW(pw, pwCheck, nickname).focus === 'pwRef') {
        pwRef.current.focus();
      } else if (checkPW(pw, pwCheck, nickname).focus === 'pwCheckRef') {
        pwCheckRef.current.focus();
      }
      alert(checkPW(pw, pwCheck, nickname).msg);
      return;
    }

    const data = {
      email: email,
      nickname: nickname,
      password: pw,
      checkPassword: pwCheck,
    };

    dispatch(register({ data }));
  };

  return (
    <Form onSubmit={onRegist}>
      <Grid padding="20px 0px 0px 20px">
        <Label htmlFor="닉네임">닉네임*</Label>
        <Input
          ref={nicknameRef}
          type="text"
          placeholder="닉네임을 입력하세요"
        />
      </Grid>
      <Grid padding="20px 0px 0px 20px">
        <Label htmlFor="이메일">이메일 주소 (아이디)*</Label>
        <Input ref={emailRef} type="text" placeholder="이메일을 입력하세요" />
      </Grid>

      <Grid padding="20px 0px 0px 20px">
        <Label htmlFor="비밀번호">비밀번호*</Label>
        <Input
          ref={pwRef}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </Grid>
      <Grid padding="20px 0px 0px 20px">
        <Label htmlFor="비밀번호 확인">비밀번호 확인*</Label>
        <Input
          ref={pwCheckRef}
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
        />
      </Grid>
      <Agreement />
      <Button
        name={'회원가입하기'}
        width="320px"
        heignt="42px"
        margin="20px 0px 0px 20px"
        is_green
      />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

export default RegisterForm;

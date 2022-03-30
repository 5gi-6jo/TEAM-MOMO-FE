import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../elements/Button';
import { register } from '../redux/modules/user';
import { checkEmail, checkNickname, checkPW } from '../shared/functions';
import { Grid, Input } from '../elements';
import Agreement from './Agreement';

const RegisterForm = props => {
  const nicknameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();
  const dispatch = useDispatch();
  const isAllCheckedRef = useRef();
  // console.log(isAllCheckedRef.current.sendAllChecked());

  const onRegist = e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const nickname = nicknameRef.current.value;
    const pw = pwRef.current.value;
    const pwCheck = pwCheckRef.current.value;

    if (!checkNickname(nickname).res) {
      nicknameRef.current.focus();
      alert(checkNickname(nickname).msg);
      return;
    }

    if (!checkEmail(email).res) {
      emailRef.current.focus();
      alert(checkEmail(email).msg);
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
          _ref={nicknameRef}
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nicknameRef}
        />
      </Grid>
      <Grid padding="20px 0px 0px 20px">
        <Label htmlFor="이메일">이메일 주소 (아이디)*</Label>
        <Input
          _ref={emailRef}
          type="text"
          placeholder="이메일을 입력하세요"
          value={emailRef}
        />
      </Grid>

      <Grid padding="20px 0px 0px 20px">
        <Label htmlFor="비밀번호">비밀번호*</Label>
        <Input
          _ref={pwRef}
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={pwRef}
        />
      </Grid>
      <Grid padding="20px 0px 0px 20px">
        <Label htmlFor="비밀번호 확인">비밀번호 확인*</Label>
        <Input
          _ref={pwCheckRef}
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={pwCheckRef}
        />
      </Grid>
      <Agreement ref={isAllCheckedRef} />
      <Button
        is_green={
          nicknameRef === '' ||
          emailRef === '' ||
          pwRef === '' ||
          pwCheckRef === ''
            ? false
            : true
        }
        name={'회원가입하기'}
        width="320px"
        heignt="42px"
        margin="20px 0px 0px 20px"
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

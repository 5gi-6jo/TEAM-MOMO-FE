import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import { sighupAxios } from '../redux/modules/user';
import { checkEmail, checkNickname, checkPW } from '../shared/functions';

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

    const registerData = {
      email: email,
      nickname: nickname,
      password: pw,
      checkPassword: pwCheck,
    };

    dispatch(sighupAxios({ registerData, navigate }));
  };

  return (
    <Form onSubmit={onRegist}>
      <Box>
        <Label htmlFor="이메일">이메일</Label>
        <Input ref={emailRef} type="text" placeholder="이메일을 입력하세요" />
      </Box>
      <Box>
        <Label htmlFor="닉네임">
          닉네임
          <LabelDesc>
            알파벳 대소문자, 숫자로 이루어진 최소 3자 이상으로 입력해주세요
          </LabelDesc>
        </Label>
        <Input
          ref={nicknameRef}
          type="text"
          placeholder="닉네임을 입력하세요"
        />
      </Box>
      <Box>
        <Label htmlFor="비밀번호">
          비밀번호
          <LabelDesc>
            닉네임과 연관되지 않게 최소 4자 이상으로 입력해주세요
          </LabelDesc>
        </Label>
        <Input
          ref={pwRef}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </Box>
      <Box>
        <Label htmlFor="비밀번호 확인">비밀번호 확인</Label>
        <Input
          ref={pwCheckRef}
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
        />
      </Box>
      <Info>* 이메일, 닉네임은 필수기입사항입니다.</Info>
      <Button name={'회원가입하기'} />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
`;

const Label = styled.label`
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 0.2em;
`;

const LabelDesc = styled.span`
  margin-left: 1em;
  font-size: 0.5rem;
  font-weight: 300;
  color: blue;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.3em 0.1em;
`;

const Info = styled.p`
  font-size: 0.5rem;
  color: blue;
`;

export default RegisterForm;

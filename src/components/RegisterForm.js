import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../elements/Button';
import { register } from '../redux/modules/user';
import { Grid, Input } from '../elements';
import Agreement from './Agreement';
import theme from '../Styles/theme';
import { useNavigate } from 'react-router-dom';
const RegisterForm = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  // 체크박스
  const [checked, setChecked] = useState(false);
  const Register = () => {
    const data = {
      email: email,
      nickname: nickname,
      password: pw,
      checkPassword: pwCheck,
    };

    dispatch(register(data));
    navigate('/main');
    console.log(data);
  };
  return (
    <Grid padding="10px">
      <Grid padding="10px">
        <Input
          islabel
          labelBold
          labelColor={theme.color.gray1}
          labelText="닉네임*"
          placeholder="닉네임을 입력하세요"
          type="text"
          _onChange={e => {
            setNickname(e.target.value);
          }}
          value={nickname}
        />
      </Grid>
      <Grid padding="10px">
        <Input
          islabel
          labelBold
          labelColor={theme.color.gray1}
          labelText="이메일 주소 (아이디)*"
          placeholder="이메일을 입력하세요"
          type="text"
          _onChange={e => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </Grid>
      <Grid padding="10px">
        <Input
          islabel
          labelBold
          labelColor={theme.color.gray1}
          labelText="비밀번호*"
          placeholder="비밀번호를 입력하세요"
          type="password"
          _onChange={e => {
            setPw(e.target.value);
          }}
          value={pw}
        />
      </Grid>
      <Grid padding="10px">
        <Input
          islabel
          labelBold
          labelColor={theme.color.gray1}
          labelText="비밀번호 확인*"
          placeholder="비밀번호를 다시 입력하세요"
          type="password"
          _onChange={e => {
            setPwCheck(e.target.value);
          }}
          value={pwCheck}
        />
      </Grid>
      <Agreement checked={checked} setChecked={setChecked} />
      <Button
        is_green={
          nickname === '' ||
          email === '' ||
          pw === '' ||
          pwCheck === '' ||
          !checked
            ? false
            : true
        }
        name={'회원가입하기'}
        width="320px"
        heignt="42px"
        margin="0px 0px 0px 10px"
        type="button"
        _onClick={Register}
      />
    </Grid>
  );
};

// 스타일 컴포넌트 작성 위치

// default props 작성 위치

export default RegisterForm;

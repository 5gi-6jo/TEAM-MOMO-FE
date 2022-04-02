import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../elements/Button';
import { login, setFCMToken } from '../redux/modules/user';
import { Grid, Input } from '../elements';
import theme from '../Styles/theme';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const LoginForm = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const Login = () => {
    const loginData = {
      email: email,
      password: pw,
    };
    dispatch(login(loginData));
    navigate('/main');
    const data = {
      token: sessionStorage.getItem('FCMtoken'),
    };
    dispatch(setFCMToken(data));
  };

  return (
    <React.Fragment>
      <Grid padding="0px 20px">
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
      <Grid padding="0px 20px">
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
        heignt="40px"
        margin="15px 20px"
        abled
        _onClick={Login}
      />
    </React.Fragment>
  );
};

// styled components 작성 위치

// default props 작성 위치
LoginForm.defaultProps = {};

export default LoginForm;

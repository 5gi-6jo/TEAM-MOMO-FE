import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import Button from '../elements/Button';
import { Grid, Input, Text } from '../elements';
import theme from '../Styles/theme';
import { home_01, Line4, Line5 } from '../img';

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
        <Grid padding="127px 123px 0px 123px">
          <Home01 src={home_01} />
        </Grid>

        <LoginForm />
        <Grid is_flex is_padding="0px 0px 30px 0px">
          {/* //text로하고 onclick넣기 */}
          <Button name={'아이디 찾기'} _onClick width="91px" height="17px" />
          <Line04 src={Line4} />
          <Button name={'비밀번호 찾기'} _onClick width="91px" height="17px" />
        </Grid>
        <Line05 src={Line5} />
        <Grid padding="30px 96px 0px 96px">
          <Text color={theme.color.gray4} size="12px">
            '모두모여'가 처음이신가요?
          </Text>
        </Grid>
        <Grid padding="30px 0px 0px 0px">
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
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

const TextBox = styled.div``;

// const Home01 = styled.img`
//   width: 150px;
//   height: 84px;
// `;

const Home01 = styled.img`
  width: 100%;
  height: 100%;
`;

const Line04 = styled.img``;
const Line05 = styled.img``;

// default props 작성 위치
Login.defaultProps = {};

export default Login;

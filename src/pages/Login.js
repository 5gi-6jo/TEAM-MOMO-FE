import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import Button from '../elements/Button';
import { Grid, Text } from '../elements';
import theme from '../Styles/theme';
import { momoKor } from '../img';
import Headerbar from '../shared/Headerbar';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Login = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      //modal
      navigate('/main', { replace: true });
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
      <Grid center padding="60px">
        <IconMomoKor src={momoKor} />
      </Grid>
      <LoginForm />
      <div style={{ padding: '20px' }}></div>
      <hr />
      <div style={{ padding: '20px' }}></div>
      <Grid center padding="5px">
        <Text color={theme.color.gray4} size="12px">
          '모두모여'가 처음이신가요?
        </Text>
      </Grid>
      <Grid padding="15px">
        <Button
          width="100%"
          heignt="40px"
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

// styled components 작성 위치
const IconMomoKor = styled.img`
  width: 100px;
  object-fit: cover;
`;

// const FindInfo = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   padding: 5px 80px;
// `;

// const LineMini = styled.img``;

// defaultProps 작성 위치
Login.defaultProps = {};

export default Login;

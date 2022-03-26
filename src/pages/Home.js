import React from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import { Grid, Text } from '../elements';
import theme from '../Styles/theme';
import { KAKAO_AUTH_URL } from '../service/OAuth';
import { useNavigate } from 'react-router-dom';
import logo_01 from '../img/icon/logo_01.webp';
import logo_02 from '../img/icon/logo_02.webp';
import GlobalStyle from '../Styles/GlobalStyle';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Home = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <GlobalStyle />
      <Grid padding="108px 0px 50px 22px">
        <Text color={theme.color.black} size="24px">
          <Logo01 src={logo_01} alt="logo_01" />에
          <br />
          <br />
          오신 것을 환영합니다.
          <br />
        </Text>
      </Grid>
      <Grid padding="80px 10px 50px 20px">
        <Text color={theme.color.black} size="14px">
          <Logo02 src={logo_02} />
          에서
          <br />
          여러분의 모임을 정리하고
          <br />
          추억하세요.
        </Text>
      </Grid>
      <a href={KAKAO_AUTH_URL}>카카오톡으로 시작하기</a>
      <Grid padding="">
        <Button
          name={'이메일 로그인·회원가입하기'}
          _onClick={() => {
            navigate('/Login', { replace: true });
          }}
        />
      </Grid>
      <br />
      <div>둘러보기</div>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const TextBox = styled.div``;

const Logo01 = styled.img`
  background-image: url(${logo_01});
`;

const Logo02 = styled.img`
  background-image: url(${logo_02});
`;

// default props 작성 위치
Home.defaultProps = {};

export default Home;

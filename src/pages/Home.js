import React from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import { Grid, Text } from '../elements';
import theme from '../Styles/theme';
import { KAKAO_AUTH_URL } from '../service/OAuth';
import { useNavigate } from 'react-router-dom';
import { momoKor, momo, kakao, Line6 } from '../img';
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
      <Grid padding="108px 0px 50px 20px">
        <Text color={theme.color.black} size="24px" bold>
          <Home01 src={momoKor} /> 에
          <br />
          <br />
          오신 것을 환영합니다.
          <br />
        </Text>
      </Grid>
      <OrangeLine src={Line6} />
      <Grid padding="80px 0px 0px 20px">
        <Text color={theme.color.gray4} size="14px">
          <Home02 src={momo} /> 에서
          <br />
          여러분의 모임을 정리하고
          <br />
          추억하세요.
        </Text>
      </Grid>

      <Grid padding="">
        <a href={KAKAO_AUTH_URL}>
          <Home03 src={kakao} />
          <Button
            position="relative"
            name={'카카오톡으로 시작하기'}
            width="320px"
            heignt="42px"
            margin="80px 0px 0px 20px"
            abled
          ></Button>
        </a>
      </Grid>

      <Grid padding="">
        <Button
          name={'이메일 로그인·회원가입하기'}
          _onClick={() => {
            navigate('/Login', { replace: true });
          }}
          width="320px"
          heignt="42px"
          margin="20px 0px 0px 20px"
          abled
        />
      </Grid>
      <Grid padding="20px 0px 0px 160px">
        <RefWrap
          onClick={() => {
            navigate('/main', { replace: true });
          }}
        >
          <Text color={theme.color.gray4} size="12px">
            둘러보기
          </Text>
        </RefWrap>
      </Grid>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const Home01 = styled.img``;
const OrangeLine = styled.img`
  padding: 0px 40px;
`;
const Home02 = styled.img``;
const Home03 = styled.img`
  position: absolute;
  top: 70.3%;
  left: 14.5%;
`;
const RefWrap = styled.div`
  cursor: pointer;
`;

// default props 작성 위치
Home.defaultProps = {};

export default Home;

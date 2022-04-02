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
      <Grid padding="60px 20px 30px 20px">
        <Text color={theme.color.black} size="24px" bold>
          <IconKorMomo src={momoKor} /> 에
          <br />
          <br />
          오신 것을 환영합니다.
          <br />
        </Text>
      </Grid>
      <OrangeLine src={Line6} />
      <Grid padding="30px 20px 60px 20px">
        <Text color={theme.color.gray4} size="14px">
          <IconMomo src={momo} /> 에서
          <br />
          여러분의 모임을 정리하고
          <br />
          추억하세요.
        </Text>
      </Grid>

      <Grid padding="10px 20px">
        <a href={KAKAO_AUTH_URL}>
          <Button
            position="relative"
            name={'카카오톡으로 시작하기'}
            width="320px"
            heignt="40px"
            abled
          >
            <IconKakao src={kakao} />
          </Button>
        </a>
      </Grid>

      <Grid padding="10px 20px">
        <Button
          name={'이메일 로그인·회원가입하기'}
          _onClick={() => {
            navigate('/Login', { replace: true });
          }}
          width="320px"
          heignt="40px"
          abled
        />
      </Grid>
      <Grid is_Grid center padding="10px">
        <div></div>
        <GuestBtn
          onClick={() => {
            navigate('/main', { replace: true });
          }}
        >
          <Text color={theme.color.gray4} size="12px" cusor="pointer">
            둘러보기
          </Text>
        </GuestBtn>
        <div></div>
      </Grid>
    </React.Fragment>
  );
};

// styled componetns 작성 위치
const IconKorMomo = styled.img`
  object-fit: cover;
`;
const OrangeLine = styled.img`
  padding: 0px 40px;
  object-fit: cover;
`;
const IconMomo = styled.img`
  width: 30px;
  object-fit: cover;
`;
const IconKakao = styled.img`
  position: absolute;
`;
const GuestBtn = styled.div`
  cursor: pointer;
  margin: auto;
`;

// default props 작성 위치
Home.defaultProps = {};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../elements/Button';
import { Grid, Input, Text } from '../elements';
import theme from '../Styles/theme';
import { KAKAO_AUTH_URL } from '../service/OAuth';

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
      <TextBox>
        <Text color={theme.color.black} size="20px">
          모두모여에
          <br />
          오신 것을 환영합니다.
          <br />
        </Text>
      </TextBox>
      <Button onClick={KAKAO_AUTH_URL} name={'카카오톡으로 시작하기'} />
      <Button name={'이메일 로그인·회원가입하기'} />
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const TextBox = styled.div``;

// default props 작성 위치
Home.defaultProps = {};

export default Home;

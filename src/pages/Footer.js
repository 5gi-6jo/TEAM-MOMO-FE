import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '../elements/Grid';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Footer = props => {
  const navigate = useNavigate();
  return (
    <>
      <NavBox>
        <Grid is_flex>
          <ButtonWrap
            onClick={() => {
              navigate('/', { replace: true });
            }}
          >
            홈
          </ButtonWrap>
          <ButtonWrap
            onClick={() => {
              navigate('/plansdetail', { replace: true });
            }}
          >
            지도
          </ButtonWrap>
          <ButtonWrap
            onClick={() => {
              navigate('/plans', { replace: true });
            }}
          >
            일정(추억)
          </ButtonWrap>
          <ButtonWrap
            onClick={() => {
              navigate('/mypage', { replace: true });
            }}
          >
            마이페이지
          </ButtonWrap>
        </Grid>
      </NavBox>
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

// default props 작성 위치
Footer.defaultProps = {};

// 하단바 스타일링
const NavBox = styled.div`
  max-width: 422px;
  height: 71px;
  z-index: 10;
  background-color: white;
  display: flex;
  position: fixed;
  border-top: 0.2px solid #f7f7f7;
  justify-content: space-around;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
  @media ${({ theme }) => theme.device.laptop} {
    margin: 0 0 0 calc(50vw - 1px);
    border: 1px solid #e4e4e4;
    max-width: 422px;
  }
`;

//임시
const ButtonWrap = styled.button`
  text-align: center;
  width: 140px;
  height: 71px;
  cursor: pointer;
`;

export default Footer;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '../elements/Grid';
import { AiOutlineCalendar } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlinePlace } from 'react-icons/md';
import { FiBookOpen } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Footer = props => {
  const navigate = useNavigate();

  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const GetClick = e => {
    setCurrentClick(e.target.id);
    console.log(e.target.id);
  };

  React.useEffect(
    e => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        console.log(current);
        current.style.color = 'F84914';
      }

      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.color = '8C8C8C';
      }
      setPrevClick(currentClick);
    },
    [currentClick],
  );
  return (
    <>
      <NavBox>
        <Grid is_flex center>
          <Grid
            is_cursor
            center
            _onClick={() => {
              navigate('/', { replace: true });
            }}
          >
            <AiOutlineHome id="case1" size="20px" onClick={GetClick} />
          </Grid>
          <Grid
            is_cursor
            center
            _onClick={() => {
              navigate('/main', { replace: true });
            }}
          >
            <AiOutlineCalendar id="case2" size="20px" onClick={GetClick} />
          </Grid>
          <Grid
            is_cursor
            center
            _onClick={() => {
              navigate('/plansdetail', { replace: true });
            }}
          >
            <MdOutlinePlace id="case3" size="20px" onClick={GetClick} />
          </Grid>
          <Grid
            is_cursor
            center
            _onClick={() => {
              navigate('/plans', { replace: true });
            }}
          >
            <FiBookOpen id="case4" size="20px" onClick={GetClick} />
          </Grid>
          <Grid
            is_cursor
            center
            _onClick={() => {
              navigate('/mypage', { replace: true });
            }}
          >
            <BsPerson id="case5" size="20px" onClick={GetClick} />
          </Grid>
          <ButtonWrap
            onClick={() => {
              navigate('/Login', { replace: true });
            }}
          >
            로그인
          </ButtonWrap>
          <ButtonWrap
            onClick={() => {
              navigate('/Register', { replace: true });
            }}
          >
            회원가입
          </ButtonWrap>
          <ButtonWrap
            onClick={() => {
              navigate('/Map', { replace: true });
            }}
          >
            지도(임시메뉴창)
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

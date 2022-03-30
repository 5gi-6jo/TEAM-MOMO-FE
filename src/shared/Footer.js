import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '../elements/Grid';
import { AiOutlineCalendar } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlinePlace } from 'react-icons/md';
import { FiBookOpen } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
// import theme from '../Styles/theme';
// theme 색상 적용하기

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
        <Grid is_flex center>
          <Grid>
            <NavLink
              to="/main"
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#F84914' : '#999999',
                fontWeight: isActive ? '800' : '400',
              })}
            >
              <AiOutlineCalendar size="20px" />
            </NavLink>
          </Grid>
          <Grid>
            <NavLink
              to="/plan/32032375-2238-4765-b03d-b006ba31c1c3"
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#F84914' : '#999999',
                fontWeight: isActive ? '800' : '400',
              })}
            >
              <MdOutlinePlace size="20px" />
            </NavLink>
          </Grid>
          <Grid>
            <NavLink
              to="/plans"
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#F84914' : '#999999',
                fontWeight: isActive ? '800' : '400',
              })}
            >
              <FiBookOpen size="20px" />
            </NavLink>
          </Grid>
          <Grid>
            <NavLink
              to="/mypage"
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#F84914' : '#999999',
                fontWeight: isActive ? '800' : '400',
              })}
            >
              <BsPerson size="20px" />
            </NavLink>
          </Grid>
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
  width: 100%;
  /* max-width: 422px; */
  height: 44px;
  z-index: 10;
  background-color: white;
  display: flex;
  position: fixed;
  border-top: 0.2px solid #f7f7f7;
  justify-content: space-around;
  /* margin: 0 auto; */
  bottom: 0;
  left: 0;
  right: 0;
  @media ${({ theme }) => theme.device.laptop} {
    max-width: 35rem;
    max-width: 768px;
    min-width: 360px;
    width: 64%;
    bottom: -5%;
    border: 1px solid #e4e4e4;
    border-radius: 0px 0px 40px 40px;
    /* max-width: 422px; */
    transform: translate(27%, -253%);
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

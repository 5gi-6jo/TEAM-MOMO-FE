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
              to="/"
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#F84914' : '#999999',
                fontWeight: isActive ? '800' : '400',
              })}
            >
              <AiOutlineHome size="20px" />
            </NavLink>
          </Grid>
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
              to="/plansdetail"
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
          <ButtonWrap
            onClick={() => {
              navigate('/planmap', { replace: true });
            }}
          >
            chating
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

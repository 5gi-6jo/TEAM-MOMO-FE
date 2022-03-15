import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import moment from 'moment';
const writeIcon = '/icons/review_write.png';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Main = props => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div>Main</div>
      <WriteButton
        onClick={() => {
          navigate('/edit');
        }}
      />
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

const WriteButton = styled.div`
  position: absolute;
  bottom: 7vh;
  left: 50%;
  margin-left: 25%;
  width: 60px;
  height: 60px;
  background-image: url(${writeIcon});
  background-size: cover;
  cursor: pointer;
`;

// default props 작성 위치
Main.defaultProps = {};

export default Main;

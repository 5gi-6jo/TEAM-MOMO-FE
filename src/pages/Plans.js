import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
// import { testcol } from '../shared/apis/Socket';
import theme from '../Styles/theme';

// const writeIcon = '../img/review_write.png';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Plans = props => {
  //copy테스트
  const [success, setSuccess] = useState(false);

  const textInput = useRef();

  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand('copy');
    setSuccess(true);
  };
  // testcol();

  return (
    <>
      <input type="text" ref={textInput}></input>
      <button onClick={copy}>copy</button>

      {success ? <div style={{ color: 'green' }}>Success!</div> : null}
      <div>plans</div>
      <Text size="17px" bold color={theme.color.gray3}>
        test
      </Text>
    </>
  );
};
//test
// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

// default props 작성 위치
Plans.defaultProps = {};

export default Plans;

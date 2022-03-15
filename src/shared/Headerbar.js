import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Text } from '../elements';
import theme from '../Styles/theme';
import { GrClose } from 'react-icons/gr';
import { FiSettings } from 'react-icons/fi';

/**
 * @param {*} props _onClickClose : Close아이콘 클릭이벤트
 * @returns 헤더바
 * @역할 헤더바
 * @필수값 필수 없음
 */

const Headerbar = props => {
  const { _onClickClose, text, _onClickEdit } = props;

  return (
    <>
      <hr style={{ width: '100%' }} />
      <Grid is_flex padding="12px" center>
        <GrClose size="22px" cursor="pointer" onClick={_onClickClose} />
        <Text bold>{text}</Text>
        <div></div>
        <FiSettings size="22px" onClick={_onClickEdit} />
      </Grid>
      <hr />
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;

// default props 작성 위치
Headerbar.defaultProps = { _onClick: () => {} };

export default Headerbar;

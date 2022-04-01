import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { momo } from '../img';
import { FiBell } from 'react-icons/fi';
import theme from '../Styles/theme';

/**
 * @param {*} props _onClickClose : Close아이콘 클릭이벤트
 * @returns 헤더바
 * @역할 헤더바
 * @필수값 필수 없음
 */

const Header = props => {
  const { _onClick } = props;

  return (
    <React.Fragment>
      <Grid is_flex padding="12px" center>
        <Grid>
          <Header01 src={momo} />
        </Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid>
          <FiBell
            size="20px"
            cusor="pointer"
            onClick={_onClick}
            color={theme.color.gray2}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const Header01 = styled.img`
  width: 75%;
  height: 75%;
`;

// default props 작성 위치
Header.defaultProps = { _onClick: () => {} };

export default Header;

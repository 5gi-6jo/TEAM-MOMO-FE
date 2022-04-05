import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { momo } from '../img';
// import { FiBell } from 'react-icons/fi';
// import theme from '../Styles/theme';
import { useNavigate } from 'react-router-dom';

/**
 * @param {*} props _onClickClose : Close아이콘 클릭이벤트
 * @returns 헤더바
 * @역할 헤더바
 * @필수값 필수 없음
 */

const Header = props => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Grid is_flex padding="12px" center>
        <Grid
          _onClick={() => {
            navigate('/main');
          }}
        >
          <IconMomo src={momo} />
        </Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid>
          {/* <FiBell size="20px" cusor="pointer" color={theme.color.gray2} /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// styled components 작성 위치
const IconMomo = styled.img`
  width: 60px;
  object-fit: cover;
`;

// default props 작성 위치
Header.defaultProps = { _onClick: () => {} };

export default Header;

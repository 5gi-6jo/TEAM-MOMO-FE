import React from 'react';
import { dino2 } from '../img';
import { Grid, Text } from '../elements';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Styles/theme';
import Headerbar from '../shared/Headerbar';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const NoUrlplan = props => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Headerbar
        text={'지도'}
        _onClickClose={() => {
          navigate('/main');
        }}
        _onClickEdit={() => {}}
      ></Headerbar>
      <PlanList>
        <Grid>
          <Grid center padding="160px 0px">
            <Text size="16px" color={theme.color.gray3}>
              아직 정해진
              <br />
              약속이 없어요
            </Text>
          </Grid>
          <DinoImgDiv>
            <DinoImg src={dino2} />
          </DinoImgDiv>
        </Grid>
      </PlanList>
    </React.Fragment>
  );
};
// styled components 작성 위치
const DinoImgDiv = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  right: -20%;
`;
const DinoImg = styled.img`
  overflow: hidden;

  object-fit: cover;
  cursor: none;
`;

const PlanList = styled.div`
  overflow: hidden;
`;

// default props 작성 위치
NoUrlplan.defaultProps = {};

export default NoUrlplan;

import React from 'react';
import Header from '../shared/Header';
import { dino2 } from '../img';
import { useSelector } from 'react-redux';
import { Grid, Text } from '../elements';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Styles/theme';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Plans = props => {
  const navigate = useNavigate();
  const Plans = useSelector(state => state.plan.plans);
  return (
    <>
      <Header />
      {/* {Plans.length === 0 ? (
        <Grid>
          <Grid center padding="160px 0px">
            <Text size="16px" color={theme.color.gray3}>
              모임을 추가해
              <br />
              소중한 추억을
              <br />
              만들어 나가세요
            </Text>
          </Grid>
          <Grid center bottom>
            <DinoImg src={dino2} />
          </Grid>
        </Grid>
      ) : ( */}
      {Plans &&
        Plans.map(plan => (
          <Grid
            key={`plans=${plan.planId}`}
            onClick={() => {
              navigate(`/plansdetail/${plan.planId}`, { state: plan.planId });
            }}
          >
            {plan.planName}
          </Grid>
        ))}
    </>
  );
};
// styled components 작성 위치
const DinoImg = styled.img`
  object-fit: cover;
`;

// default props 작성 위치
Plans.defaultProps = {};

export default Plans;

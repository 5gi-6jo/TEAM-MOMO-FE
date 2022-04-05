import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import { dino2 } from '../img';
import { Grid, Text } from '../elements';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Styles/theme';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { tokenURL } from '../shared/apis/API';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Plans = props => {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    tokenURL.get(`/records?pageNumber=0`).then(res => {
      console.log(res);
      console.log(res.data.data);
      setRecord(res.data.data);
    });
  }, [record]);

  return (
    <React.Fragment>
      <Header />
      <Grid is_flex padding="20px">
        <Text size="14px" bold>
          추억
        </Text>
      </Grid>
      <hr />
      <PlanList>
        {!Plans ? (
          <Grid>
            <Grid center padding="160px 0px">
              <Text size="16px" color={theme.color.gray3}>
                모임을 만들어
                <br />
                소중한 추억을 쌓아보세요
              </Text>
            </Grid>
            <DinoImgDiv>
              <DinoImg src={dino2} />
            </DinoImgDiv>
          </Grid>
        ) : (
          record.map((plan, index) => (
            <Grid is_flex key={index}>
              {plan.finished && (
                <PlanId
                  key={`plans=${plan.planId}`}
                  onClick={() => {
                    navigate(`/plansdetail/${plan.planId}`, {
                      state: plan.planId,
                    });
                  }}
                >
                  <Grid is_flex>
                    <Grid padding="10px">
                      <PlanName>
                        <div>
                          <Text size="18px" color={theme.color.white}>
                            {plan.planName}
                          </Text>
                        </div>
                        <div>
                          <Text size="12px" color={theme.color.white}>
                            {
                              plan.planDate
                                .split('T')[0]
                                .split('-')[0]
                                .split('0')[1]
                            }
                            {plan.planDate.split('T')[0].split('-')[1]}
                            {plan.planDate.split('T')[0].split('-')[2]}
                          </Text>
                        </div>
                      </PlanName>
                      <Grid padding="0px 10px">
                        <Text size="12px" color={theme.color.white}>
                          {plan.destination}
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid
                      right
                      onClick={() => {
                        navigate(`/plansdetail/${plan.planId}`, {
                          state: plan.planId,
                        });
                      }}
                    >
                      <HiOutlineChevronRight className="right" size="20px" />
                    </Grid>
                  </Grid>
                </PlanId>
              )}
            </Grid>
          ))
        )}
      </PlanList>
    </React.Fragment>
  );
};
// styled components 작성 위치
const DinoImg = styled.img`
  object-fit: cover;
`;

const DinoImgDiv = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  right: -25%;
`;

const PlanList = styled.div`
  padding: 10px 30px;
  text-align: center;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const PlanId = styled.div`
  margin: 10px 0px;
  padding: 10px;
  width: 100%;
  height: 60px;
  color: ${theme.color.white};
  background-color: ${theme.color.green};
  border-radius: 10px;
`;

const PlanName = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

// default props 작성 위치
Plans.defaultProps = {};

export default Plans;

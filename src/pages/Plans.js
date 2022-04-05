import React, { useEffect, useState } from 'react';
import Header from '../shared/Header';
import { dino2 } from '../img';
import { Grid, Text } from '../elements';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Styles/theme';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { tokenURL } from '../shared/apis/API';
import useIsMount from '../hooks/useIsMount';
import { useDispatch, useSelector } from 'react-redux';
import { setrecords } from '../redux/modules/plan';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Plans = props => {
  const navigate = useNavigate();
  // const [record, setRecord] = useState([]);
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const record = useSelector(state => state.plan.recordslist);
  console.log(record);
  useEffect(() => {
    dispatch(setrecords());
    if (isMount.current) {
    }
    // tokenURL.get(`/records?pageNumber=0`).then(res => {
    //   console.log(res);
    //   console.log(res.data.data);
    //   setRecord(res.data.data);
    // });
  }, [isMount]);

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
        {!record ? (
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
            <PlanId
              style={{
                backgroundColor: plan.finished
                  ? theme.color.gray3
                  : theme.color.green,
              }}
              key={index}
              onClick={() => {
                navigate(`/plansdetail/${plan.planId}`, {
                  state: plan.planId,
                });
              }}
            >
              <div style={{ flex: '1 1 0%' }}>
                <TextBox>
                  {plan.planName}
                  <SpanBox style={{ marginLeft: '6px' }}>
                    {plan.planDate.split('T')[0].split('-')[0].split('0')[1]}
                    {plan.planDate.split('T')[0].split('-')[1]}
                    {plan.planDate.split('T')[0].split('-')[2]}
                  </SpanBox>
                </TextBox>
                <div>
                  <DestBox>{plan.destination}</DestBox>
                </div>
              </div>

              {/* <Grid
                  right
                  onClick={() => {
                    navigate(`/plansdetail/${plan.planId}`, {
                      state: plan.planId,
                    });
                  }}
                ></Grid> */}
              <HiOutlineChevronRight
                className="right"
                size="20px"
                color={theme.color.white}
              />
            </PlanId>
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
  /* margin: 10px 0px;
  display: flex;
  width: 100%;
  height: 83.48px;
  border-radius: 15px; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  min-height: 83.48px;
  border-radius: 15px;
  align-items: center;
  margin: 22.5px 0px;
`;

const TextBox = styled.div`
  font-size: 14px;
  text-align: left;
  color: ${theme.color.white};
  font-weight: 700;
`;
const SpanBox = styled.span`
  font-size: 8px;
  font-weight: 400;
`;

const DestBox = styled.p`
  line-height: 12px;
  font-size: 8px;
  color: ${theme.color.white};
  text-align: left;
`;

// default props 작성 위치
Plans.defaultProps = {};

export default Plans;

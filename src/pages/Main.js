import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from '../components/Calendar';
import { getPlans } from '../redux/modules/plan';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text } from '../elements';
import moment from 'moment';
import Header from '../shared/Header';
import { face, sparkle, dino1 } from '../img';
import { IoIosAddCircle } from 'react-icons/io';
import { FiLink } from 'react-icons/fi';
import theme from '../Styles/theme';
import { getCookie } from '../shared/utils/Cookie';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Main = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Plans = useSelector(state => state.plan.plans);
  const time = useSelector(state => state.main.calendarDay);
  const user = useSelector(state => state.user.user_info);

  const [checktime, setChecktime] = useState();
  const data = {
    date: time,
  };
  let day = ['일', '월', '화', '수', '목', '금', '토'];
  // console.log(Plans);
  // console.log(time);
  // console.log(user);

  useEffect(() => {
    if (moment(time).format('YYYY-MM') !== checktime) {
      dispatch(getPlans(data));
      setChecktime(moment(time).format('YYYY-MM'));
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const dayPlan = [];
  if (Plans) {
    for (let i = 0; i < Plans.length; i++) {
      if (
        moment(time).format('YYYY-MM-DD') === Plans[i].planDate.split('T')[0]
      ) {
        dayPlan.push(Plans[i]);
      }
    }
  }

  const textInput = useRef();
  const copy = () => {
    const el = textInput.current;
    el.select();
    let url = 'https://modumoyeo.com/plan/' + el.value;
    navigator.clipboard.writeText(url);
  };

  return (
    <React.Fragment>
      <Header />
      <div style={{ padding: '10px' }}></div>
      <Grid is_flex padding="5px 20px">
        <UserNick>
          <Text color="white" size="20px" bold>
            {user.nickname ? user.nickname : 'unknown'}님
          </Text>
        </UserNick>
      </Grid>
      <Grid padding="0px 20px">
        <Text size="20px" bold>
          약속 늦지 않게
          <br />
          조심하세요!
          <FaceImg src={face} />
          <SparkleImg src={sparkle} />
        </Text>
      </Grid>
      <Grid padding="0px 20px">
        <Calendar Plans={Plans} />
      </Grid>
      <Grid padding="5px 20px">
        <Text size="16px" bold color={theme.color.gray1}>
          {moment(time).format('MM.DD')} ({day[moment(time).format('e')]})
        </Text>
      </Grid>
      <PlanList>
        {dayPlan.length === 0 ? (
          <Grid is_flex center padding="10px">
            <DinoImg src={dino1} />
            <AlignLeft>
              <Text size="16px" color={theme.color.gray3}>
                모임이 없습니다
                <br />
                모임을 추가해보세요!
              </Text>
            </AlignLeft>
          </Grid>
        ) : (
          dayPlan.map((plan, index) => (
            <Grid is_flex key={index}>
              {plan.finished ? (
                <DeActive
                  key={`plans=${plan.planId}`}
                  onClick={() => {
                    navigate(`/plansdetail/${plan.planId}`, {
                      state: plan.planId,
                    });
                  }}
                >
                  <Grid is_Grid>
                    <Grid>
                      {plan.planDate.split('T')[1].split(':')[0]}:
                      {plan.planDate.split('T')[1].split(':')[1]}
                    </Grid>
                    <Grid>{plan.planName}</Grid>
                  </Grid>
                </DeActive>
              ) : (
                <PlanEach>
                  <Active
                    key={`plans=${plan.planId}`}
                    onClick={() => {
                      navigate(`/plansdetail/${plan.planId}`, {
                        state: plan.planId,
                      });
                    }}
                  >
                    {plan.url ? (
                      <Grid is_flex>
                        <Grid>
                          {plan.planDate.split('T')[1].split(':')[0]}:
                          {plan.planDate.split('T')[1].split(':')[1]}
                        </Grid>
                        <Grid>{plan.planName}</Grid>
                      </Grid>
                    ) : (
                      <Grid is_Grid>
                        <Grid>
                          {plan.planDate.split('T')[1].split(':')[0]}:
                          {plan.planDate.split('T')[1].split(':')[1]}
                        </Grid>
                        <Grid>{plan.planName}</Grid>
                      </Grid>
                    )}
                  </Active>
                  {plan.url && (
                    <PlanUrl
                      onClick={() => {
                        copy();
                      }}
                    >
                      <CopyText>
                        <input
                          type="text"
                          value={plan.url}
                          ref={textInput}
                          readOnly
                        ></input>
                      </CopyText>
                      <FiLink size="30px" />
                    </PlanUrl>
                  )}
                </PlanEach>
              )}
            </Grid>
          ))
        )}
      </PlanList>

      <div style={{ padding: '20px' }}></div>

      <WriteButton>
        <IoIosAddCircle
          className="WriteButton"
          onClick={() => {
            const isCookie = getCookie('token') ? getCookie('token') : false;
            if (isCookie) {
              navigate('/edit', { state: { time } });
            } else {
              window.alert('로그인이 필요합니다.');
              navigate('/login');
            }
          }}
          size="60"
          color={theme.color.orange}
        />
      </WriteButton>
    </React.Fragment>
  );
};

// styled components 작성 위치
const FaceImg = styled.img`
  padding: 0px 3px;
  object-fit: cover;
`;

const SparkleImg = styled.img`
  padding: 0px 3px;
  object-fit: cover;
`;

const UserNick = styled.div`
  display: flex;
  padding: 3px 5px;
  background-color: ${theme.color.green};
  border-radius: 5px;
`;

const DinoImg = styled.img`
  object-fit: cover;
`;

const PlanList = styled.div`
  padding: 0px 30px;
  text-align: center;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const PlanEach = styled.div`
  display: flex;
  width: 100%;
`;

const Active = styled.div`
  margin: 10px 0px;
  padding: 10px;
  width: 100%;
  height: 40px;
  color: white;
  background-color: ${theme.color.green};
  border-radius: 10px;
`;

const DeActive = styled.div`
  margin: 10px 0px;
  padding: 10px;
  width: 100%;
  height: 40px;
  color: ${theme.color.gray4};
  background-color: #f8f8f8;
  border-radius: 10px;
`;

const PlanUrl = styled.div`
  margin: 10px 0px 10px 10px;
  padding: 10px;
  width: 30%;
  height: 40px;
  color: white;
  background-color: ${theme.color.green};
  border-radius: 10px;
  text-align: center;
`;

const WriteButton = styled.div`
  position: sticky;
  left: 75%;
  bottom: 10%;
  width: 60px;
  height: 60px;
  background-size: cover;
  cursor: pointer;
`;

const CopyText = styled.div`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

const AlignLeft = styled.div`
  text-align: left;
`;

// default props 작성 위치
Main.defaultProps = {};

export default Main;

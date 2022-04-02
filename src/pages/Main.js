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

// import moment from 'moment';import theme from '../Styles/theme';
import { IoIosAddCircle } from 'react-icons/io';
import { FiLink } from 'react-icons/fi';
import theme from '../Styles/theme';

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
  console.log(Plans);
  console.log(time);
  console.log(user);
  const [checktime, setChecktime] = useState();
  useEffect(() => {
    if (moment(time).format('YYYY-MM') !== checktime) {
      dispatch(getPlans(data));
      console.log('main::useEffect');

      setChecktime(moment(time).format('YYYY-MM'));
    }
    return console.log('main::return');
  }, [time]);
  const data = {
    date: time,
  };

  // 링크버튼받아오기

  const textInput = useRef();
  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand('copy');
  };

  return (
    <React.Fragment>
      <Header />
      <Grid is_flex padding="20px 0px 0px 20px">
        <UserNick>
          <Text color="white" size="20px" bold>
            {user.nickname ? user.nickname : 'unknown'}님
          </Text>
        </UserNick>
      </Grid>
      <Grid padding="10px 0px 0px 20px">
        <Text size="20px" bold>
          약속 늦지않게
          <br />
          조심하세요!
          <FaceImg src={face} />
          <SparkleImg src={sparkle} />
        </Text>
      </Grid>
      <Grid padding="10px">
        <Calendar />
      </Grid>
      <Grid padding="5px 20px">
        <Text size="14px">
          {moment(time).format('MM.DD')} ({moment(time).format('dd')})
        </Text>
      </Grid>
      <PlanList>
        {Plans.length === 0 && <DinoImg src={dino1} />}
        {Plans &&
          Plans.map(plan => (
            <Grid is_flex>
              <PlanId
                key={`plans=${plan.planId}`}
                onClick={() => {
                  navigate(`/plansdetail/${plan.planId}`, {
                    state: plan.planId,
                  });
                }}
              >
                {plan.planName}
              </PlanId>
              <PlanUrl
                onClick={() => {
                  copy();
                  // modal실행
                }}
              >
                <CopyText>
                  <input
                    type="text"
                    value="url"
                    ref={textInput}
                    readOnly
                  ></input>
                </CopyText>
                <FiLink size="24px" />
              </PlanUrl>
            </Grid>
          ))}
      </PlanList>
      <div style={{ padding: '20px' }}></div>

      <WriteButton>
        <IoIosAddCircle
          className="WriteButton"
          onClick={() => {
            navigate('/edit', { state: { time } });
          }}
          size="60"
          color="F84914"
        />
      </WriteButton>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const FaceImg = styled.img``;

const SparkleImg = styled.img``;

const UserNick = styled.div`
  padding: 3px 5px;
  background-color: ${theme.color.green};
  border-radius: 5px;
  width: auto;
  display: flex;
`;

const DinoImg = styled.img``;

const PlanList = styled.div`
  padding: 10px 30px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const PlanId = styled.div`
  margin: 5px 0px;
  padding: 10px;
  width: 200px;
  height: 30px;
  color: white;
  background-color: ${theme.color.green};
  border-radius: 10px;
`;

const PlanUrl = styled.div`
  margin: 5px 0px;
  padding: 10px;
  width: 50px;
  height: 30px;
  color: white;
  background-color: ${theme.color.green};
  border-radius: 10px;
`;

const WriteButton = styled.div`
  position: absolute;
  bottom: 7vh;
  left: 50%;
  margin-left: 25%;
  width: 60px;
  height: 60px;
  background-size: cover;
  cursor: pointer;
  // size: 50
  // color: theme.color.orange
`;

const CopyText = styled.div`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

// default props 작성 위치
Main.defaultProps = {};

export default Main;

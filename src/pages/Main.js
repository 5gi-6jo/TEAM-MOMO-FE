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
  // const planLength = Plans.length;
  // console.log(planLength);

  console.log(Plans);
  console.log(time);
  console.log(user);

  useEffect(() => {
    if (moment(time).format('YYYY-MM') !== checktime) {
      dispatch(getPlans(data));
      setChecktime(moment(time).format('YYYY-MM'));
    }
    return;
  }, [time]);

  const textInput = useRef();
  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand('copy');
  };

  return (
    <React.Fragment>
      <Header />
      <div style={{ padding: '20px' }}></div>
      <Grid is_flex padding="5px 20px">
        <UserNick>
          <Text color="white" size="20px" bold>
            {user.nickname ? user.nickname : 'unknown'}님
          </Text>
        </UserNick>
      </Grid>
      <Grid padding="0px 20px">
        <Text size="20px" bold>
          약속 늦지않게
          <br />
          조심하세요!
          <FaceImg src={face} />
          <SparkleImg src={sparkle} />
        </Text>
      </Grid>
      <Grid padding="0px 20px">
        <Calendar />
      </Grid>
      <Grid padding="0px 20px">
        <Text size="16px">
          {moment(time).format('MM.DD')} ({moment(time).format('dd')})
        </Text>
      </Grid>
      <PlanList>
        {/* {planLength === 0 ? (
          <Grid is_flex center>
            <DinoImg src={dino1} />
            <Text size="16px" color={theme.color.gray3}>
              모임이 없습니다.
              <br />
              모임을 추가해보세요!
            </Text>
          </Grid>
        ) : ( */}
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
                    // 링크 받아서 value에 넣어주기
                    value="test copy success!"
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

// @@@@@@@@@@@@@@@@@@@작업다시하기
const UserNick = styled.div`
  display: flex;
  padding: 3px 5px;
  background-color: ${theme.color.green};
  border-radius: 5px;
  width: auto;
`;

const DinoImg = styled.img`
  object-fit: cover;
`;

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

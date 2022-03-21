import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Calendar from '../components/Calendar';
import Headerbar from '../shared/Headerbar';
import { getPlans } from '../redux/modules/plan';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Input, Text } from '../elements';

// import moment from 'moment';import theme from '../Styles/theme';
import { IoIosAddCircle } from 'react-icons/io';
import theme from '../Styles/theme';

const writeIcon = '/icons/review_write.png';

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
  useEffect(
    () => {
      dispatch(getPlans());
    },
    [dispatch],
    Plans,
  );

  const textInput = useRef();

  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand('copy');
  };
  return (
    <React.Fragment>
      <Grid padding="20px">
        <Headerbar />
        <TextBox>
          <Text color={theme.color.black} size="20px">
            모여라님(icon)
            <br />
            약속 늦지않게
            <br />
            조심하세요!
          </Text>
        </TextBox>

        <Calendar />
        {Plans &&
          Plans.map(plan => (
            <div
              key={`plans=${plan.planId}`}
              onClick={() => {
                navigate(`/plansdetail/${plan.planId}`, { state: plan.planId });
              }}
            >
              {plan.planName}
              <>
                <input type="text" value="url" ref={textInput} readOnly></input>
                <button onClick={copy}>copy</button>
              </>
            </div>
          ))}
        <WriteButton
          onClick={() => {
            navigate('/edit');
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

const WriteButton = styled.div`
  position: absolute;
  bottom: 7vh;
  left: 50%;
  margin-left: 25%;
  width: 60px;
  height: 60px;
  background-image: url(${writeIcon});
  background-size: cover;
  cursor: pointer;
`;

const TextBox = styled.div``;

// default props 작성 위치
Main.defaultProps = {};

export default Main;

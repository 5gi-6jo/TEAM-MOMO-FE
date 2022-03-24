import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Calendar from '../components/Calendar';
import { getPlans } from '../redux/modules/plan';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Input, Text } from '../elements';
import moment from 'moment';

// import moment from 'moment';import theme from '../Styles/theme';
import { IoIosAddCircle } from 'react-icons/io';
import theme from '../Styles/theme';
import ModalInput from '../components/Modal/ModalInput';

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
  console.log(time);
  const [checktime, setChecktime] = useState();
  useEffect(() => {
    if (moment(time).format('YYYY-MM') !== checktime) {
      dispatch(getPlans(data));
      console.log('main::useEffect');

      setChecktime(moment(time).format('YYYY-MM'));
    }
    return console.log('main::return');
  }, [time]);
  console.log(moment(time).format('YYYY-MM'));
  console.log(checktime);
  console.log(checktime === moment(time).format('YYYY-MM'));
  console.log(Plans);
  const data = {
    date: time,
  };
  //-01T00:00:00
  const textInput = useRef();

  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand('copy');
  };

  //modal
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>모달팝업버튼</button>
      <ModalInput
        open={modalOpen}
        close={closeModal}
        title="팝업창제목"
        contents="팝업창내용"
        // _onChange={실행시킬함수}
      ></ModalInput>
      <Grid padding="20px">
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
        <WriteButton>
          <IoIosAddCircle
            className="WriteButton"
            onClick={() => {
              navigate('/edit');
            }}
            size="60"
            color="F84914"
          />
        </WriteButton>
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
  background-size: cover;
  cursor: pointer;
  // size: 50
  // color: theme.color.orange
`;

const TextBox = styled.div``;

// default props 작성 위치
Main.defaultProps = {};

export default Main;

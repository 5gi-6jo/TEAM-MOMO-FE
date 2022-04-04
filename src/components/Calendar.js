import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendarDay } from '../redux/modules/mainsys';
import styled from 'styled-components';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

function MyCalendar(props) {
  const [value, SetValue] = useState(new Date());
  const [mark, setMark] = useState(['2022-04-05', '2022-04-26']);
  const dispatch = useDispatch();
  const SearchTime = moment(value).format().split('+')[0];
  // const Plans = useSelector(state => state.plan.plans);

  useEffect(() => {
    console.log('Calendar:::useEffect');
  }, [SearchTime]);

  // useEffect(() => {
  //   for (let i = 0; i < Plans.length; i++) {
  //     setMark.push(Plans[0].planDate.split('T')[0]);
  //   }
  // }, [Plans]);

  return (
    <React.Fragment>
      <Calendar
        onChange={e => {
          SetValue(e);
          dispatch(setCalendarDay(moment(e).format().split('+')[0]));
        }}
        value={value}
        // 날짜표기형식 01 => 1
        formatDay={(locale, date) => moment(date).format('D')}
        // 다른 달 날짜 표기
        showNeighboringMonth={false}
        // 달력 유형 (일요일시작)
        calendarType={'US'}
        // 연도이동아이콘숨기기
        next2Label={''}
        prev2Label={''}
        // 요일 영어로 표시
        locale={'en'}
        // 특정 날짜에 표시
        tileContent={({ date, view }) => {
          let isDot = [];
          if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            isDot.push(<div className="dot"></div>);
          }
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                {isDot}
              </div>
            </>
          );
        }}
      />
    </React.Fragment>
  );
}

// styled components 작성 위치
// const Test = styled.div`
//   min-height: 200px;
// `;

// default props 작성 위치
MyCalendar.defaultProps = {};

export default MyCalendar;

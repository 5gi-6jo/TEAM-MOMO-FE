import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import { useDispatch } from 'react-redux';
import { setCalendarDay } from '../redux/modules/mainsys';
import useIsMount from '../hooks/useIsMount';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

function MyCalendar(props) {
  const [value, SetValue] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [mark, setMark] = useState(['']);
  const dispatch = useDispatch();
  const SearchTime = moment(value).format().split('+')[0];
  const Plans = props.Plans;
  // useEffect(() => {
  //   console.log('Calendar:::useEffect');
  // }, [SearchTime, Plans]);

  const ismount = useIsMount();
  useEffect(() => {
    // if (Plans) {
    //   for (let i = 0; i < Plans.length; i++) {
    //     mark.push(Plans[i].planDate.split('T')[0]);
    //   }
    // }
    if (ismount.current) {
      if (Plans) {
        Plans.map(plan =>
          setMark(prev => [...prev, plan.planDate.split('T')[0]]),
        );
      }
    }
    return () => {
      //다른페이지 돌아왓을때 버그 해결 용으로 오늘 데이터 넣기
      dispatch(setCalendarDay(moment().format().split('+')[0]));
    };
  }, [ismount, Plans]);

  return (
    <React.Fragment>
      <Calendar
        onChange={e => {
          SetValue(e);
          dispatch(setCalendarDay(moment(e).format().split('+')[0]));
        }}
        value={value}
        //년 월표시 형식
        formatMonthYear={(locale, date) => moment(date).format('YYYY.MM')}
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
          if (mark)
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

// default props 작성 위치
MyCalendar.defaultProps = {};

export default MyCalendar;

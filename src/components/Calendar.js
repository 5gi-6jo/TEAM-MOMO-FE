import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import { useDispatch } from 'react-redux';
import { setCalendarDay } from '../redux/modules/mainsys';
import { Grid, Text } from '../elements';

function MyCalendar(props) {
  const [value, SetValue] = useState(new Date());
  const [mark, setMark] = useState([
    '2022-02-22',
    '2022-03-03',
    '2022-03-10',
    '2022-03-15',
    '2022-03-27',
    '2022-04-26',
    '2022-04-05',
  ]);
  const dispatch = useDispatch();
  const SearchTime = moment(value).format().split('+')[0];

  useEffect(() => {
    console.log('Calendar:::useEffect');
    // console.log(value);
  }, [SearchTime]);
  return (
    <div>
      <Calendar
        onChange={e => {
          SetValue(e);
          console.log(e);
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
          let html = [];
          if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<div className="dot"></div>);
          }
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                {html}
              </div>
            </>
          );
        }}
      />
      <Grid padding="20px 0px 20px 0px">
        <div className="text-gray-500 mt-4">
          {moment(value).format('MM.DD')}
          {moment(value).format('dd')}
        </div>
      </Grid>
    </div>
  );
}

export default MyCalendar;

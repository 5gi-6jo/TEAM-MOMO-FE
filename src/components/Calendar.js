import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { setCalendarDay } from '../redux/modules/mainsys';

function MyCalendar(props) {
  const [value, SetValue] = useState(new Date());
  const [mark, setMark] = useState([]);
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
        formatDay={(locale, date) => moment(date).format('DD')}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          let html = [];
          if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<div className="dot"></div>);
          }
        }}
      />
      <div className="text-gray-500 mt-4">
        {/* 클릭한 날짜 가져오기 */}
        {/* moment타입으로 보내면 시간값 입력가능 */}
        {moment(value).format('YYYY년 MM월 DD일')}
      </div>
    </div>
  );
}

export default MyCalendar;

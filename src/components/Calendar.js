import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarDot.css';
import { useDispatch } from 'react-redux';
import { setCalendarDay } from '../redux/modules/mainsys';

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
        formatDay={(locale, date) => moment(date).format('DD')}
        showNeighboringMonth={false}
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
    </div>
  );
}

export default MyCalendar;

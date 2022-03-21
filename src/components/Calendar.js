// import { isFocusable } from '@testing-library/user-event/dist/utils';
// import moment from 'moment';
// import React from 'react';
// import styled from 'styled-components';
// import { logger } from '../shared/utils';
// // import mixin from '../styles/Mixin';

// /**
//  * @param {*} props
//  * @returns 리턴 설명 적어주기
//  * @역할 무엇을 위한 컴포넌트인지 적어주기
//  * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
//  */

// const Calendar = props => {
//   let today = moment();
//   const daysInMonthFuntion = () => {
//     return today.daysInMonth();
//   };
//   const year = () => {
//     return today.format('Y');
//   };
//   const currentDay = () => {
//     return today.format('D');
//   };
//   const month = () => {
//     return today.format('MM');
//   };
//   const firstDayOfMonth = () => {
//     let dateObject = today;
//     let firstDay = moment(dateObject).startOf('month').format('d'); // Day of week 0...1..5...6
//     return firstDay;
//   };
//   let weekdayshort = moment.weekdaysShort();
//   let weekdayshortname = weekdayshort.map(day => {
//     return <Weekshort key={day}>{day}</Weekshort>;
//   });

//   let daysInMonth = [];
//   let blanks = [];
//   for (let i = 0; i < firstDayOfMonth(); i++) {
//     blanks.push(<td>{''}</td>);
//   }
//   for (let d = 1; d <= daysInMonthFuntion(); d++) {
//     let currentDayd = d == currentDay() ? 'today' : '';
//     daysInMonth.push(
//       <td key={d} style={{ height: '30px' }}>
//         <Daysinmonth onClick={logger(d)}>{d}</Daysinmonth>
//       </td>,W
//     );
//   }
//   //이전달 빈 날짜 + 이번달 날짜
//   let totalSlots = [...blanks, ...daysInMonth];
//   let rows = [];
//   let cells = [];
//   totalSlots.forEach((row, i) => {
//     if (i % 7 !== 0) {
//       cells.push(row);
//     } else {
//       rows.push(cells);
//       cells = [];
//       cells.push(row);
//     }
//     if (i === totalSlots.length - 1) {
//       rows.push(cells);
//     }
//   });
//   //날짜 배치
//   let daysinmonth = rows.map((d, i) => {
//     return <tr>{d}</tr>;
//   });

//   return (
//     <>
//       <div>
//         <DesCheck>OOO님의 모임을 확인해보세요.</DesCheck>
//         <Yearmonth>{year() + '.' + month()}</Yearmonth>
//         <table style={{ textAlign: 'center' }}>
//           <thead>
//             <tr>{weekdayshortname}</tr>
//           </thead>
//           <tbody>{daysinmonth}</tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// // 스타일 컴포넌트 작성 위치
// const StyleComponent = styled.div``;
// const DesCheck = styled.span`
//   font-size: 12px;
//   display: block;
// `;
// const Yearmonth = styled.span`
//   font-size: 32px;
//   font-weight: 600;
// `;
// const Weekshort = styled.td`
//   color: #8c8c8c;
//   width: 30px;
// `;
// const Daysinmonth = styled.span`
//   font-weight: 600;
// `;

// // default props 작성 위치
// // Calendar.defaultProps = {};

// export default Calendar;

import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import theme from '../Styles/theme';

function MyCalendar() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);
  return (
    <div>
      <Calendar
        onChange={onChange}
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

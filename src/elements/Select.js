import React, { useState } from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

const Select = props => {
  const {
    labelText,
    labelBold,
    labelColor,
    placeholder,
    _onChangeTime,
    _onChangeMinute,
    type,
    islabel,
  } = props;
  const time = Array.from({ length: 24 }, (v, i) => i);
  const minute = Array.from({ length: 12 }, (v, i) => i * 5);

  if (islabel) {
    return (
      <Grid>
        <Text bold={labelBold} color={labelColor} margin="0px">
          {labelText}
        </Text>
        <Grid left center margin="2px">
          <ElSelect placeholder={placeholder} onChange={_onChangeTime}>
            {time.map((v, i) => {
              return <option key={`${v}시`}>{('00' + v).slice(-2)}시</option>;
            })}
          </ElSelect>
          <ElSelect placeholder={placeholder} onChange={_onChangeMinute}>
            {minute.map((v, i) => {
              return <option key={`${v}분`}>{('00' + v).slice(-2)}분</option>;
            })}
          </ElSelect>
        </Grid>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid left center>
        <ElSelect placeholder={placeholder} onChange={_onChangeTime}>
          {time.map((v, i) => {
            return <option key={`${v}시`}>{v}시</option>;
          })}
        </ElSelect>
        <ElSelect placeholder={placeholder} onChange={_onChangeMinute}>
          {minute.map((v, i) => {
            return <option key={`${v}분`}>{v}분</option>;
          })}
        </ElSelect>
      </Grid>
    </React.Fragment>
  );
};

Select.defaultProps = {
  islabel: false,
  labelText: '텍스트',
  labelBold: false,
  labelColor: '#000',
  placeholder: '텍스트를 입력해주세요.',
  type: 'text',
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 0px;
  box-sizing: border-box;
`;

const ElSelect = styled.select`
  border: 1px solid #c4c4c4;
  width: auto;
  padding: 12px 12px;
  margin: 14px 11px 14px 0px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #ffffff;

  option {
    background-color: #ffffff;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 15px;
  }
`;

export default Select;

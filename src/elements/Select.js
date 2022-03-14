import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

const Select = props => {
  const {
    labelText,
    labelBold,
    labelColor,
    placeholder,
    _onChange,
    type,
    islabel,
  } = props;
  const time = 24;
  if (islabel) {
    return (
      <Grid>
        <Text bold={labelBold} color={labelColor} margin="0px">
          {labelText}
        </Text>
        <ElSelect type={type} placeholder={placeholder} onChange={_onChange} />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid left center margin="2px">
        <ElSelect placeholder={placeholder} onChange={_onChange}>
          <option>01시</option>
        </ElSelect>
        <ElSelect placeholder={placeholder} onChange={_onChange}>
          <option>00분</option>
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
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElSelect = styled.select`
  border: 1px solid #c4c4c4;
  width: auto;
  padding: 12px 12px;
  margin: 14px 5px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #ffffff;
`;

export default Select;

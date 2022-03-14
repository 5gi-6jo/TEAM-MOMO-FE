import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

const Input = props => {
  const {
    labelText,
    labelBold,
    labelColor,
    placeholder,
    _onChange,
    type,
    islabel,
  } = props;

  if (islabel) {
    return (
      <Grid>
        <Text bold={labelBold} color={labelColor} margin="0px">
          {labelText}
        </Text>
        <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
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

const ElInput = styled.input`
  border: 1px solid #c4c4c4;
  width: 100%;
  padding: 12px 12px;
  margin-top: 14px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #ffffff;
`;

export default Input;

import React from 'react';
import styled from 'styled-components';
import { Grid, Input, Select, Text } from '../elements';
import theme from '../Styles/theme';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const PlansEdit = props => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Grid padding="10px">
          <Input
            islabel
            labelBold
            labelColor={theme.color.gray1}
            labelText="모임 이름*"
            placeholder="모임 이름을 입력해주세요."
          ></Input>
        </Grid>
        <Grid padding="10px">
          <Input
            islabel
            labelBold
            labelColor={theme.color.gray1}
            labelText="장소*"
            placeholder="장소를 입력해주세요."
          ></Input>
        </Grid>
        <Grid padding="10px">
          <Input
            islabel
            labelBold
            labelColor={theme.color.gray1}
            labelText="설명*"
            placeholder="설명을 입력해주세요."
          ></Input>
        </Grid>
        <Grid padding="10px">
          <Text bold color={theme.color.gray1}>
            모임 시간*
          </Text>
          <Select></Select>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

// default props 작성 위치
PlansEdit.defaultProps = {};

export default PlansEdit;

import React from 'react';
import styled from 'styled-components';
import AllimTimerButton from '../components/AllimTimerButton';
import { Button, Grid, Input, Select } from '../elements';
import theme from '../Styles/theme';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const EditPlans = props => {
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
          <Select
            islabel
            labelBold
            labelColor={theme.color.gray1}
            labelText="모임 시간*"
          />
          <AllimTimerButton />
        </Grid>
        <Grid padding="10px">
          <Button>모임 추가하기</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

// default props 작성 위치
EditPlans.defaultProps = {};

export default EditPlans;

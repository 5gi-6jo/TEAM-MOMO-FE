import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Text } from '../elements';
import theme from '../Styles/theme';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 모임 생성/수정 시 보여지는 알림 버튼
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const AllimTimerButton = props => {
  //서버한테 보내줄때 분단위로 정수형으로 보내기
  return (
    <>
      <Grid>
        <Text bold color={theme.color.gray1}>
          모두모여 시간*
        </Text>
        <div style={{ padding: '7px 0px' }}>
          <Text size="10px" color={theme.color.gray2}>
            이 시간부터는 지도가 생성되며 서로의 위치를 공유할 수 있습니다.
          </Text>
        </div>
        <Grid is_flex>
          <Button margin="6px 7px 6px 0px" is_disabled={true}>
            15분 전
          </Button>
          <Button margin="6px 0px 6px 7px ">30분 전</Button>
        </Grid>
        <Grid is_flex>
          <Button margin="6px 7px 6px 0px " is_edit is_disabled={true}>
            1시간 전
          </Button>
          <Button margin="6px 0px 6px 7px " is_edit>
            2시간 전
          </Button>
        </Grid>
        <Grid is_flex>
          <Button margin="6px 7px 6px 0px ">1일 전</Button>
          <Button margin="6px 0px 6px 7px ">2일 전</Button>
        </Grid>
      </Grid>
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;

// default props 작성 위치
AllimTimerButton.defaultProps = {};

export default AllimTimerButton;

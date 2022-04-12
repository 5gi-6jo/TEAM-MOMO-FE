import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Grid, Text, Input, Select } from '../elements';
import { edit, trash_3 } from '../img';

import theme from '../Styles/theme';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePlans, editPlans, setOnePlan } from '../redux/modules/plan';

import { GrClose } from 'react-icons/gr';
/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const EditPlans = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [abled, setabled] = useState('');
  const [name, setName] = useState(props.planName);
  const [contenst, setContenst] = useState('');
  const [time, setTime] = useState('');
  const [minute, setMinute] = useState('');

  const date = props.planDate.split('T')[0];

  let selectTime = moment(
    date + time.split('시')[0] + minute.split('분')[0],
    'YYYY-MM-DD h:mm',
  ).format();
  const timerButton = e => {
    let minutestr = parseInt(e.target.value);
    setabled(minutestr);
  };
  useEffect(() => {
    if (time === '' || minute === '') {
      setTime('00');
      setMinute('00');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Section>
        <div
          onClick={() => {
            props.setshow(false);
          }}
          style={{ height: '14%' }}
        ></div>
        <MainModal>
          <Grid padding="20px">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GrClose
                size="20px"
                color={theme.color.gray2}
                cursor="pointer"
                onClick={() => {
                  props.setshow(false);
                }}
              />

              <div
                style={{
                  width: '60%',
                  justifyContent: 'center',
                  textAlign: 'center  ',
                }}
              ></div>
              <div
                style={{ display: 'flex', width: '40%', justifyContent: 'end' }}
              >
                <Icon src={edit}></Icon>

                <Icon
                  onClick={() => {
                    const data = {
                      id: props.id,
                    };
                    dispatch(deletePlans(data));
                    navigate('/main');
                  }}
                  src={trash_3}
                ></Icon>
              </div>
            </div>
            <Grid padding="10px">
              <Input
                islabel
                labelBold
                labelColor={theme.color.gray1}
                labelText="모임 이름*"
                placeholder="모임 이름을 입력해주세요."
                value={name}
                _onChange={e => {
                  setName(e.target.value);
                }}
              ></Input>
            </Grid>

            <Grid padding="10px">
              <Input
                islabel
                labelBold
                labelColor={theme.color.gray1}
                labelText="설명"
                placeholder="설명을 입력해주세요."
                _onChange={e => {
                  setContenst(e.target.value);
                }}
              ></Input>
            </Grid>
            <Grid padding="10px">
              <Select
                islabel
                labelBold
                labelColor={theme.color.gray1}
                labelText="모임 시간*"
                _onChangeTime={e => {
                  setTime(e.target.value);
                }}
                _onChangeMinute={e => {
                  setMinute(e.target.value);
                }}
              />
              <Grid>
                <Text bold color={theme.color.gray1}>
                  모두모여 시간*
                </Text>
                <div style={{ padding: '7px 0px' }}>
                  <Text size="10px" color={theme.color.gray2}>
                    이 시간부터는 지도가 생성되며 서로의 위치를 공유할 수
                    있습니다.
                  </Text>
                </div>
                <Grid is_flex>
                  <Button
                    margin="6px 7px 6px 0px"
                    abled={abled === 15}
                    _onClick={timerButton}
                    value={15}
                  >
                    15분 전
                  </Button>
                  <Button
                    margin="6px 0px 6px 7px "
                    abled={abled === 30}
                    _onClick={timerButton}
                    value={30}
                  >
                    30분 전
                  </Button>
                </Grid>
                <Grid is_flex>
                  <Button
                    margin="6px 7px 6px 0px "
                    abled={abled === 45}
                    _onClick={timerButton}
                    value={45}
                  >
                    45분 전
                  </Button>
                  <Button
                    margin="6px 0px 6px 7px "
                    abled={abled === 60}
                    _onClick={timerButton}
                    value={60}
                  >
                    1시간 전
                  </Button>
                </Grid>
                <Grid is_flex>
                  <Button
                    margin="6px 7px 6px 0px "
                    abled={abled === 90}
                    _onClick={timerButton}
                    value={90}
                  >
                    1시간 30분 전
                  </Button>
                  <Button
                    margin="6px 0px 6px 7px "
                    abled={abled === 120}
                    _onClick={timerButton}
                    value={120}
                  >
                    2시간 전
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid padding="10px">
              <Button
                abled={
                  name === '' || time === '' || abled === '' ? false : true
                }
                // is_disabled={
                //   nameRef === '' || desRef === '' || timeRef === '' ? true : false
                // }
                _onClick={() => {
                  const noticeTime =
                    -1 *
                    moment().diff(
                      moment(selectTime, 'YYYY-MM-DD HH:mm')
                        .subtract(abled, 'minutes')
                        .format('YYYY-MM-DD HH:mm'),
                      'minutes',
                    );
                  if (noticeTime <= 0) {
                    window.alert('설정한 시간이 현재시간보다 이전시간입니다.');
                    return;
                  }
                  if (
                    name === '' || time === '' || abled === '' ? true : false
                  ) {
                    window.alert('*표시 내용을 모두 입력해주세요');
                    return;
                  }
                  if (props.finished) {
                    window.alert('이미 완료된 모임입니다.');
                    return;
                  }

                  const data = {
                    id: props.id,
                    planName: name,
                    contents: contenst,
                    destination: props.des,
                    lat: props.lat,
                    lng: props.lng,
                    planDate: selectTime.split('+')[0],
                    noticeTime: abled,
                  };
                  props.setshow(false);

                  dispatch(editPlans(data));
                  // dispatch(setOnePlan(data));
                }}
              >
                모임 수정하기
              </Button>
            </Grid>
          </Grid>
        </MainModal>
      </Section>
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

const Section = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
`;

const MainModal = styled.div`
  position: absolute;
  width: 100%;
  height: 86%;
  bottom: 0;
  background-color: white;
  border-radius: 30px 30px 0px 0px;
`;

const Icon = styled.div`
  min-width: 24px;
  min-height: 24px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  margin-right: 20px;
`;

// default props 작성 위치
EditPlans.defaultProps = {};

export default EditPlans;

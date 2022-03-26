import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Grid, Text, Input, Select } from '../elements';
import Headerbar from '../shared/Headerbar';
import theme from '../Styles/theme';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setPlans } from '../redux/modules/plan';
import { setDestination } from '../redux/modules/mainsys';
import PlanSelectMap from './PlanSelectMap';
import { useLocation } from 'react-router';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const AddPlans = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectDate = useLocation();
  console.log(selectDate.state.time.split('T')[0]);

  //서버로 보낼 데이터들
  const [abled, setabled] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [contents, setContents] = useState('');
  const [time, setTime] = useState('');
  const [minute, setMinute] = useState('');
  const [showmap, setShowMap] = useState(false);

  const reduxdes = useSelector(state => state.main.des);
  if (reduxdes) {
    setAddress(reduxdes);
    dispatch(setDestination(''));
  }
  const date = selectDate.state.time.split('T')[0];
  let selectTime = moment(
    date + time.split('시')[0] + minute.split('분')[0],
    'YYYY MM DD hh:mm',
  ).format();
  console.log(selectTime);
  const timerButton = e => {
    let minutestr = parseInt(e.target.value);
    setabled(minutestr);
  };
  useEffect(() => {
    if (time === '' || minute === '') {
      setTime('00');
      setMinute('00');
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Headerbar
          text="모임 추가하기"
          _onClickClose={() => {
            navigate(-1);
          }}
        />
        <Grid padding="16px">
          <Grid padding="10px">
            <Input
              islabel
              labelBold
              labelColor={theme.color.gray1}
              labelText="모임 이름*"
              placeholder="모임 이름을 입력해주세요."
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
              labelText="장소*"
              placeholder="장소를 입력해주세요."
              _onChlick={() => {
                setShowMap(true);
              }}
              value={address}
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
                setContents(e.target.value);
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
                  abled={abled === 60}
                  _onClick={timerButton}
                  value={60}
                >
                  1시간 전
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
              <Grid is_flex>
                <Button
                  margin="6px 7px 6px 0px "
                  abled={abled === 1440}
                  _onClick={timerButton}
                  value={1440}
                >
                  1일 전
                </Button>
                <Button
                  margin="6px 0px 6px 7px "
                  abled={abled === 2880}
                  _onClick={timerButton}
                  value={2880}
                >
                  2일 전
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid padding="10px">
            <Button
              abled={
                name === '' || address === '' || time === '' || abled === ''
                  ? false
                  : true
              }
              // is_disabled={
              //   nameRef === '' || desRef === '' || timeRef === '' ? true : false
              // }
              _onClick={() => {
                const data = {
                  planName: name,
                  destination: address,
                  lat: parseFloat(lat),
                  lng: parseFloat(lng),
                  contents: contents,
                  planDate: selectTime.split('+09:00')[0],
                  noticeTime: abled,
                };
                dispatch(setPlans(data)).then(res => {
                  navigate('/main');
                });
              }}
            >
              모임 추가하기
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <>
        {showmap && (
          <PlanSelectMap
            setShowMap={setShowMap}
            setAddress={setAddress}
            setLat={setLat}
            setLng={setLng}
          />
        )}
      </>
    </React.Fragment>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``; // eslint-disable-line no-unused-vars

// default props 작성 위치
AddPlans.defaultProps = {};

export default AddPlans;

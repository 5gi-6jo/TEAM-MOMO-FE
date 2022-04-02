/* eslint-disable no-undef */

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
import Headerbar from '../shared/Headerbar';
import { Grid, Text } from '../elements';

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../redux/modules/user.js';
//카카오 맵
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useIsMount from '../hooks/useIsMount';
import { setPlans } from '../redux/modules/plan';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const PlanMapInfo = props => {
  const map = props.map;
  const position = props.position;
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  useEffect(() => {
    if (!map) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    const mycallback = function (result, status) {
      if (status === kakao.maps.services.Status.OK && isMount.current) {
        if (result[0].road_address === null) {
          setAddress({
            address_name: result[0].address.address_name,
            building_name: result[0].address.region_3depth_name,
          });
        } else {
          setAddress({
            address_name: result[0].road_address.address_name,
            building_name: result[0].road_address.building_name,
          });
        }
      }
    };
    geocoder.coord2Address(
      parseFloat(position.lng),
      parseFloat(position.lat),
      mycallback,
    );
    return () => {
      setAddress();
    };
  }, [isMount, position]);
  // console.log(address);

  return (
    <>
      {position && (
        <div>
          {address && (
            <Grid padding="20px">
              <Text bold size="18px">
                {address.building_name} , {address.address_name}
              </Text>
              <div>{position.sender === 1 ? '약속장소' : position.sender}</div>
            </Grid>
          )}
        </div>
      )}
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;
const InfoCard = styled.div``;

// default props 작성 위치
PlanMapInfo.defaultProps = {};

export default PlanMapInfo;

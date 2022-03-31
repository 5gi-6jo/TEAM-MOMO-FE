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
import { Button } from '../elements';

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../redux/modules/user.js';
//카카오 맵
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Ellipse32, trash_3 } from '../img';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const PlanMap = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    sendMyLocationfun() {
      console.log('testchild');
      sendMyLocation();
      console.log('location', myLocation);
    },
    setDestpoint(payload) {
      console.log('payload', payload.lat, payload.lng);
      // setPoints(prev => ({
      //   ...prev,
      //   lat: parseFloat(payload.lat),
      //   lng: parseFloat(payload.lng),
      // }));
      const data = points.concat({
        lat: parseFloat(payload.lat),
        lng: parseFloat(payload.lng),
      });
      setPoints(data);
    },
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const planId = props.planId;
  const stompClient = props.client;
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  //소켓관련
  let sock = useRef({});
  const publicMaps = props.publicMaps;

  // const [isChating, setIsChating] = useState(false);
  const isChating = props.isChating;
  const [userData, setUserData] = useState({
    sender: '',
    connected: false,
    content: '',
  });
  console.log(publicMaps);
  useEffect(() => {
    return () => {};
  }, [publicMaps]);

  //지도 관련
  const [map, setMap] = useState();
  const [myLocation, setSetMyLocation] = useState({
    center: {
      lat: 37.5172,
      lng: 127.0473,
    },
    errMsg: null,
    isLoading: true,
  });
  const [points, setPoints] = useState();

  console.log('points', points);
  console.log('publicMaps', publicMaps);
  //위치보내기
  const sendMyLocation = () => {
    console.log('위치보내기!');
    if (stompClient) {
      let chatMessage = {
        sender: props.usernick,
        lat: myLocation.center.lat,
        lng: myLocation.center.lng,
        type: 'MAP',
        planId: planId,
      };
      console.log(' 위치보내기 ==', chatMessage);

      stompClient.send('/maps/map.send', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, lat: '', lng: '' });
    }
  };
  // useInterval(() => {
  //   sendMyLocation();
  // }, 10000);
  const bounds = useMemo(() => {
    const bounds = new window.kakao.maps.LatLngBounds();
    if (points) {
      points.forEach(point => {
        bounds.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
      });
    }
    return bounds;
  }, [points]);
  useEffect(() => {
    //현재 내위치 얻기
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        position => {
          setSetMyLocation(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude.toFixed(5), // 위도
              lng: position.coords.longitude.toFixed(5), // 경도
            },
            isLoading: false,
          }));
        },
        err => {
          setSetMyLocation(prev => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setSetMyLocation(prev => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
    setPoints([myLocation.center]);
    return () => {};
  }, []);

  return (
    <>
      <Headerbar
        is_Edit
        text="모임이름{} 채팅방"
        _onClickClose={() => {
          navigate('/main');
        }}
        _onClickEdit={() => {}}
      ></Headerbar>

      <Button
        _onClick={() => {
          if (map) map.setBounds(bounds);
          console.log('PointerButton');
        }}
      >
        Chating
      </Button>

      <Map // 지도를 표시할 Container
        center={myLocation.center}
        style={{
          // 지도의 크기
          width: '100%',
          height: 'calc(100% - 46px)',
        }}
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
      >
        {!myLocation.isLoading && <MapMarker position={myLocation.center} />}
        {/* <MapMarker position={{ lat: 37.49732678, lng: 127.13505 }}></MapMarker> */}
        {publicMaps &&
          publicMaps.map((chat, index) => (
            // console.log('MAP', chat),
            <>
              {chat.type === 'MAP' && (
                <MapMarker
                  key={'map' + index}
                  position={{ lat: chat.lat, lng: chat.lng }}
                />
              )}
              {chat.type === 'DEST' && (
                <MapMarker
                  key={'DEST' + index}
                  position={{
                    lat: parseFloat(chat.destLat).toFixed(5),
                    lng: parseFloat(chat.destLng).toFixed(5),
                  }}
                  image={{
                    src: Ellipse32,
                    size: { width: 21, height: 21 },
                  }}
                ></MapMarker>
              )}
            </>
          ))}
      </Map>
    </>
  );
});

// 스타일 컴포넌트 작성 위치
const StyleComponent = styled.div``;
const Section = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px 40px 0px 0px;
`;

const MainModal = styled.div`
  position: absolute;
  width: 80%;
  height: 30%;
  background-color: white;
  border-radius: 15px;
`;
const ModalPopup = styled.div`
  height: 100%;
`;
const ModalText = styled.div`
  height: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ModalButton = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const ModalButtonOk = styled.div`
  height: 40px;
  width: 50%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #9e9e9e;
`;
const ModalButtonCencel = styled.div`
  height: 40px;
  width: 50%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #9e9e9e;
`;

// default props 작성 위치
PlanMap.defaultProps = {};

export default PlanMap;

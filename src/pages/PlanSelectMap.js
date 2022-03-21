import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Grid } from '../elements';
import styled from 'styled-components';

import Headerbar from '../shared/Headerbar';

const PlanSelectMap = props => {
  const inputref = useRef(); //인풋데이터
  const [keyword, setKeyword] = useState('이태원 맛집'); //defult값 빼면 에러남..
  const [info, setInfo] = useState(); //클릭시 나올 정보==>하단 바로 빼기
  // const [markers, setMarkers] = useState([]); //마커들
  const [map, setMap] = useState(); //지도 데이터
  const [datas, setDatas] = useState(); //리스트 검색 시 들어오는 데이터
  const [isInput, setIsInput] = useState(false); //인풋 눌럿는지 체크
  const [selectlist, setSelectlist] = useState({
    //리스트 클릭시 들어갈 데이터
    position: {
      lat: 37.5211,
      lng: 126.9889,
    },
    content: '',
  });

  useEffect(() => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // setMarkers(markers);
        setDatas(data);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds);
      }
    });
  }, [map, keyword]);
  const inputdatabutton = event => {
    console.log(inputref.current.value);
    setKeyword(inputref.current.value);
  };

  console.log(datas);
  // console.log(markers);
  console.log(selectlist);

  return (
    <>
      <Section>
        <MainModal>
          <Headerbar
            _onClickClose={() => {
              props.setShowMap(false);
            }}
            text="장소검색"
          ></Headerbar>
          <button
            onClick={() => {
              setIsInput(false);
            }}
          >
            x
          </button>
          <input
            ref={inputref}
            onChange={e => {
              console.log(e.target.value);
              setKeyword(e.target.value);
            }}
            onClick={() => {
              setIsInput(true);
            }}
          ></input>
          <button onClick={inputdatabutton}>test</button>
          {isInput && (
            <Grid padding="12px">
              {datas &&
                datas.map((point, index) => (
                  <div key={'datas' + index}>
                    <Grid
                      _onClick={() => {
                        const markerdata = {
                          position: {
                            lat: point.y,
                            lng: point.x,
                          },
                          content: point.place_name,
                        };
                        setSelectlist(markerdata);
                        setIsInput(false);
                        props.setAddress(point.place_name);
                        props.setLat(point.y);
                        props.setLng(point.x);

                        props.setShowMap(false);
                        // const bounds = new window.kakao.maps.LatLngBounds();
                        // bounds.extend(
                        //   new window.kakao.maps.LatLng(point.y, point.x),
                        // );
                        // map.setBounds(bounds);
                      }}
                    >
                      {point.place_name}
                    </Grid>
                    <p style={{ color: 'green' }}>{point.address_name}</p>
                    <p style={{ color: 'blue' }}>{point.road_address_name}</p>
                  </div>
                ))}
            </Grid>
          )}
          {!isInput && (
            <Map // 로드뷰를 표시할 Container
              center={{
                lat: 37.566826,
                lng: 126.9786567,
              }}
              style={{
                width: '100%',
                height: '545px',
              }}
              level={3}
              onCreate={setMap}
            >
              <MapMarker
                position={selectlist.position}
                onClick={() => setInfo(selectlist)}
              >
                {info && info.content === selectlist.content && (
                  <div style={{ color: '#000' }}>{selectlist.content}</div>
                )}
              </MapMarker>
            </Map>
          )}
        </MainModal>
      </Section>
    </>
  );
};

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
  height: 100%;
  bottom: 0;
  background-color: white;
`;

export default PlanSelectMap;

/*global kakao*/
import React, { useEffect } from 'react';
import { Marker } from './Marker';

const Location = () => {
  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      // 지도 설정 기본값
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 9,
    };
    const map = new kakao.maps.Map(container, options);
    //드래그 활성화
    map.setDraggable(true);
    //줌 활성화
    map.setZoomable(true);

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        // 현재 위치 로그
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">모두모여!!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = '지원하지 않는 브라우저입니다.';

      displayMarker(locPosition, message);
    }
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      let iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

    // 서버에서 받아온 marker리스트를 표시합니다
    Marker.forEach(el => {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
      });
      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: el.title, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow),
      );
      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(infowindow),
      );
    });
    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
    </div>
  );
};

export default Location;
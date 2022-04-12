#  Front-end
## - Websocket을 활용한 실시간 위치 공유 및 스케쥴 관리 서비스



<h3 align="center"><b>모두모여(Momo)</b></h3>

<h4 align="center">📆 2022.03.04(금) ~ 2022.04.09(토)</h4>
<br>
<br>

## 📌 팀원 소개

역할 |이름 | Github | 포지션
-|-|-|-
팀장 | 장윤철 | https://github.com/name8965 | Front-end
팀원 | 정호상 |https://github.com/5aro | Front-end
부팀장 |유진환 | https://github.com/JinhwanU | Back-end
팀원 |김재훈 | https://github.com/HoduUlmu | Back-end
팀원 |이지현 | | Design
팀원 |신소연 |  | Design

<br>

---

<h3><b>🎫 프로젝트 소개 🎫</b></h3>
“약속 시간을 지키지 않는 친구들이 미우신가요?” <br>

이제는 더 이상 어디냐고 묻지 마세요! 

직접 친구들의 실시간 위치를 확인하며 누가 약속 장소로  오고 있는지 확인하세요😎
<br><br> 

<h3><b>🎞 프로젝트 발표영상 🎞</b></h3>

[![Video Label](https://user-images.githubusercontent.com/46017029/162713448-9b32cfa6-5959-4a12-8a79-05eea7ad1303.png)](https://youtu.be/529FAVILOAA)

---

<br>
<h3 align="center"><b>🛠 Tech Stack 🛠</b></h3>
<p align="center">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/Redux_Toolkit-4D148C?style=for-the-badge&logo=Redux_Toolkit&logoColor=white">
<img src="https://img.shields.io/badge/stomp-7AB55C?style=for-the-badge&logo=stomp&logoColor=white">
<img src="https://img.shields.io/badge/kakao_maps-FFCD00?style=for-the-badge&logo=kakao_maps&logoColor=black">
</br>
<br><br>

<h3 align="center"><b>🔥Trouble Shooting🔥</b></h3>





<details>
<summary>무한 리 렌더링 문제</summary>
<div markdown="1">       

* 문제 상황
    *  실시간 위치 공유 페이지로 이동시 무한 렌더링 발생
    *  url path로 모임 ID를 받아오는 API를 호출하는것으로 해당 문제 인지
    *  한 컴포넌트에 400줄이 넘어가는 코드들(해당 페이지에 있는 닉네임설정, 소켓통신, 지도표시, 채팅 들)로 인해 버그가 자주 발생 
     *  당장 다음날이 중간발표로 인해 최소의 시간으로 문제를 해결해야함
* 문제 요소 가설
    1. 로그인 유저라면 유저의 닉네임 아니라면, 모달창으로 받은 게스트 닉네임을 닉네임으로 설정
    2. useParams으로 받아오는 랜덤URL의 주소로 받아온 모임ID값을 소켓전송하는 state인 userData에 넣어주는 과정에서 state변경
    3. 채팅 리시브 / 위치 리시브 받은 데이터를 리덕스에 저장과 동시에 useSelector로 받아오는 과정
    *  위 데이터들을 state저장 과정 중 useEffect의 ㅕupdate로인해 문제가 발생했다고 판단
* 의견 조율
    * 코드 정리가 되지 않고, 해당 페이지가 로드 되기전 부모 컴포넌트로부터 데이터를 받아 오면 리 렌더링과정이 사라질걸로 판단됨
    * 중간 발표까지 시간이 얼마 남지 않은 상황이라 문제 해결을 위해 코드 정리를 하는것은 불안 요소
* 의견 결정
    * 제한된 시간으로 당장은 로그인한 유저는 생각하지 않고 모달창으로 닉네임 설정 후 들어오기로 결정(무한 리렌더링 시점 전이므로)
    * 중간 발표 후 코드 리팩토링하여 기능 단위로 컴포넌트 분할
* 최종 적으로 App.js(로그인 유저 데이터 전달)=>PlanSetName.js(게스트 유저 작성)=>Plansocket.js(소켓 연결 및 리시브)=>PlanMap.js,PlanChating.js(지도 표시 ,채팅) 으로 기능 단위로 컴포넌트를 나누며, 하위로 갈수록 필요한 데이터를 미리 부모에서 받아서 props로 전달함
   

    
</div>
</details>


<details>
<summary> 커스텀 도메인 배포 상황에 style적용 안되는 현상</summary>
<div markdown="1">      
    
* 문제 상황
    * 로컬 환경에서는 문제가 없으나, 배포 환경에서 특정 페이지 로드 후 styled-component가 적용되지 않는 현상 
* 문제 요소 가설
    * deploy 과정에서 문제가 발생 했다고 판단
* 문제 원인 
    * 이미 warning으로 글로벌 스타일에서 @import를 사용하지 말라는 경고가 있었으나 무시하고 진행
```
    createGlobalStyle.js:46 Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app.
```
    
* 문제 해결
    * 폰트를 @import 하는 과정 삭제 후 프로젝트 내 포트파일 추가
</div>
</details>
---


<br>
<h3 align="center"><b>📢 주요 페이지📢</b></h3>
<br>
<h4><b>📰 Home Page 📰</b></h4>

<table width="100%">
    <tr>
        <td width="50%"><img src="https://user-images.githubusercontent.com/46017029/162714742-83306429-4a3d-4514-b236-aadc0377cc6d.png" /></td>
        <td width="50%">
            <h5>메인 페이지</h5>
            <ul>
                <li>반응형으로 모바일/태블릿/데스크탑 환경 제작</li>
            </ul>
        </td>
    </tr>
</table>


---

<br>
<h4><b>📰 Login Page 📰</b></h4>

<table width="100%">
    <tr>
        <td width="50%"><img  width="50%" height="50%" src="https://user-images.githubusercontent.com/46017029/162714739-7760e807-6eaa-4551-9a9b-5df6e906c268.png" /></td>
        <td width="50%">
            <h5>로그인</h5>
            <ul>
                <li>JWT 토큰 방식 자체 로그인 구현</li>
                <li>Kakao OAuth 구현</li>
            </ul>
        </td>
    </tr>
</table>


---
<br>
<h4><b>📰 Main Page 📰</b></h4>

<table width="100%">
    <tr>
        <td width="50%"><img  width="50%" height="50%" src="https://user-images.githubusercontent.com/46017029/162714745-5ac5c9e8-8dc4-42a4-84e3-1818cc1affac.png" /></td>
        <td width="50%">
            <h5>메인 페이지</h5>
            <ul>
                <li>React-Calendar를 활용하여 달력 커스텀</li>
                <li>해당 날짜 클릭 시 모임 일정 표시</li>
                <li>모임 생성 버튼</li>
            </ul>
        </td>
    </tr>
</table>


---


<br>
<h4><b>📰 Add Plan Page 📰</b></h4>

<table width="100%">
    <tr>
        <td width="50%"><img  width="50%" height="50%" src="https://user-images.githubusercontent.com/46017029/162714762-d2587bc8-5896-4617-b9e6-00294f41e807.png" /></td>
        <td width="50%">
            <h5>모임 추가 화면</h5>
            <ul>
                <li>필수 항목 체크 후 비동기 통신</li>
            </ul>
        </td>
    </tr>
</table>


---

<br>
<h4><b>📰 Plan Detail Page 📰</b></h4>
<table width="100%">
    <tr>
        <td width="50%"><img  width="50%" height="50%" src="https://user-images.githubusercontent.com/46017029/162714734-22f10be9-ebf0-4bee-bb5d-c449f807749a.png" /></td>
        <td width="50%">
            <h5>모임 상세 화면</h5>
            <ul>
                <li>모임 제목/ 약속 장소 / 이미지 표시</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td width="50%"><img  width="50%" height="50%" src="https://user-images.githubusercontent.com/46017029/162714747-7d33d081-c6b8-4383-9bff-04883939503e.png" /></td>
        <td width="50%">
            <h5>이미지 상세 화면</h5>
            <ul>
                <li>모임에서 이미지 선택 화면</li>
            </ul>
        </td>
    </tr>
</table>

<br><br>

---
<br>
<h4><b>📰 Socket Page 📰</b></h4>
<table width="100%">
    <tr>
        <td width="50%"><img width="50%" height="50%" src="https://user-images.githubusercontent.com/46017029/162714754-7d494bca-3b15-41ff-9c6a-7b03e1121526.png" /></td>
        <td width="50%">
            <h5>실시간 위치 공유 화면</h5>
            <ul>
                <li>모임 시간 시 공개되는 페이지</li>
                <li>실시간으로 자신의 위치와 접속한 유저들의 위치를 표시함</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td width="50%"><img  width="50%" height="50%" src="https://user-images.githubusercontent.com/46017029/162714758-0f8a3f12-eb65-427b-9515-ce8f5e10fed0.png" /></td>
        <td width="50%">
            <h5>채팅 화면</h5>
            <ul>
                <li>실시간 위치 공유와 동시에 채팅 소켓 연동</li>
            </ul>
        </td>
    </tr>
</table>

<br><br>

---

<br><br>







<h4><b>📰 서비스 소개 📰</b></h4>
<table width="100%">
    <tr>
        <td width="50%"><img src="https://user-images.githubusercontent.com/46017029/162721354-994471ea-ee2b-4d95-9f11-9e03ebfc019e.png" /></td>
        <td width="50%">
            <ul>
                <img src="https://user-images.githubusercontent.com/46017029/162721352-66f34a75-718e-4e09-86a6-2b0ac089db4a.png"/>
            </ul>
        </td>
    </tr>
    <tr>
        <td width="50%"><img src="https://user-images.githubusercontent.com/46017029/162721344-aac344d9-e3ea-4efd-ae15-85e4879717b7.png" /></td>
        <td width="50%">
            <ul>
                <img src="https://user-images.githubusercontent.com/46017029/162721357-542605b4-4d00-45f4-a5b0-bb3f60e9903b.png"/>
            </ul>
        </td>
    </tr>
</table>
<br><br>

---

<br><br>

<h4><b>😎 서비스 아키텍쳐😎</b></h4>

<img src="https://user-images.githubusercontent.com/46017029/162722779-dbdec16e-6c4c-490e-ab16-31398f643421.png"/>





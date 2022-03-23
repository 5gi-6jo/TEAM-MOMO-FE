import { logger } from './shared/utils';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';
import theme from './Styles/theme';

//백그라운드 이미지
import webImg from './img/backImg.png';

import Main from './pages/Main';
import Plans from './pages/Plans';
import AddPlans from './pages/AddPlans';
import Footer from './shared/Footer';
import Mypage from './pages/Mypage';
import PlansDetail from './pages/PlansDetail';
import PlansDetailImage from './pages/PlansDetailImage';
import Home from './pages/Home';
import OAuthHandler from './service/OAuthHandler';

import firebase from 'firebase/compat/app';
import Register from './pages/Register';
import Login from './pages/Login';
import EditPlans from './pages/EditPlans';
import Map from './pages/Map';
import { useDispatch, useSelector } from 'react-redux';
import PlanChating from './pages/PlanChating';
import PlanMap from './pages/PlanMap';
import PlanSelectMap from './pages/PlanSelectMap';
import { useEffect } from 'react';
import { getUserbyToken } from './redux/modules/user';

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDotjET2LCSTEOzuqLMRTbklh4UK3NXyZ8',
    authDomain: 'momo-cbc21.firebaseapp.com',
    projectId: 'momo-cbc21',
    storageBucket: 'momo-cbc21.appspot.com',
    messagingSenderId: '680572525834',
    appId: '1:680572525834:web:27670f661e197779556ef3',
    measurementId: 'G-CXWX95R14M',
  };
  firebase.initializeApp(firebaseConfig);
  const is_footer = useSelector(state => state.main.is_footer);

  // messages
  //   .requestPermission()
  //   .then(function () {
  //     return messages.getToken();
  //   })
  //   .then(function (token) {
  //     console.log(token);
  //   })
  //   .catch(function (err) {
  //     console.log('fcm error : ', err);
  //   });

  // messages.onMessage(function (payload) {
  //   console.log(payload.notification.title);
  //   console.log(payload.notification.body);
  // });
  const istoken = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : false;
  const islogin = useSelector(state => state.user.is_login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(istoken);
  useEffect(() => {
    console.log('app.js::didmount');
    if (istoken && !islogin) {
      dispatch(getUserbyToken(navigate));
    }
    // if (islogin) dispatch(getUserbyToken(navigate));
    return console.log('app.js::Undidmount');
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <WebVer />

        <Wrap>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/oauth2/code/kakao" element={<OAuthHandler />} />
            <Route path="/main" element={<Main />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/Edit" element={<AddPlans />} />
            <Route path="/Edit/:id" element={<EditPlans />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/plansdetail/:id" element={<PlansDetail />} />
            <Route
              path="/plansdetail/:id/images"
              element={<PlansDetailImage />}
            />
            <Route path="/plans" element={<Plans />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/chating" element={<PlanChating />} />
            <Route path="/planmap" element={<PlanMap />} />
          </Routes>
          {is_footer && <Footer />}
        </Wrap>
      </ThemeProvider>
    </>
  );
}

//페이지 웹/모바일 전환
const WebVer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: -100;
  background: #ffe899;
  opacity: 0.18;

  @media ${({ theme }) => theme.device.laptop} {
    opacity: 1;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url(${webImg});
  }
`;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  min-width: 280px;
  min-height: 500px;
  height: 91vh;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }

  //노트북 이상 웹페이지
  @media ${({ theme }) => theme.device.laptop} {
    position: relative;
    margin: 0 0 0 calc(50vw - 1px);
    border: 1px solid #e4e4e4;
    max-width: 422px;
    position: relative;
  }
`;

export default App;

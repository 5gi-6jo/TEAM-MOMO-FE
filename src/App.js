import { Route, Routes, useNavigate } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';
import theme from './Styles/theme';

//백그라운드 이미지
import webImg from './img/backImg2.webp';
import { backImg2, frame } from './img/index';

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
import Plansocket from './pages/Plansocket';
import { useEffect, useState } from 'react';
import { getUserbyToken } from './redux/modules/user';
import FCMtoken from './shared/FCMtoken';
import PlanSetName from './pages/PlanSetName';

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

  const istoken = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : false;
  const islogin = useSelector(state => state.user.is_login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (istoken && !islogin) {
    dispatch(getUserbyToken(navigate));
  }


  const userNick = useSelector(state => state.user.user_info).nickname;

  // console.log(userNick, guestNick, '::::app.js');
  // setGuestNick(userNick);

  useEffect(() => {
    console.log('app.js::didmount');
    // if (istoken && !islogin) {
    //   dispatch(getUserbyToken(navigate));
    // }
    // setGuestNick(userNick);

    // if (islogin) dispatch(getUserbyToken(navigate));
    // return () => {
    //   console.log('app.js::Undidmount');
    // };
  }, []);

  return (
    <>
      <Web>
        <FramePhone src={frame}>
          <div style={{ height: '100%', position: 'relative' }}>
            <View>
              <ThemeProvider theme={theme}>
                <FCMtoken />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/login/oauth2/code/kakao"
                    element={<OAuthHandler />}
                  />
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
                  <Route
                    path="/plan/:url"
                    element={
                      <PlanSetName islogin={islogin} userNick={userNick} />
                    }
                  />
                  {/* <Route
                    path="/planmap/:url"
                    element={
                      <PlanMap
                        // userNick={userNick}
                        guestNick={guestNick}
                        setGuestNick={setGuestNick}
                        isChating={isChating}
                      />
                    }
                  /> */}
                </Routes>
                {is_footer && <Footer />}
              </ThemeProvider>
            </View>
          </div>
        </FramePhone>
      </Web>
    </>
  );
}
const Web = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.color.BackGround};
  @media ${theme.device.laptop} {
    background-position: 50% 50%;
    background-size: cover;
    background-image: url(${backImg2});
    background-repeat: no-repeat;
  }
`;
const FramePhone = styled.div`
  width: 27vw;
  height: 100%;
  min-height: 750px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);

  @media ${theme.device.laptop} {
    background-image: url(${frame});
    background-size: cover;
    background-repeat: no-repeat;
    right: 30%;
    top: 50%;
    transform: translate(0%, -50%);
  }
`;
const View = styled.div`
  position: absolute;
  background-color: ${theme.color.white};
  width: 100vw;
  height: 100vh;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  @media ${theme.device.laptop} {
    border-radius: 40px;
    width: 75%;
    height: 80%;
    right: 42.8%;
    top: 46.5%;
    transform: translate(50%, -50%);
    border-radius: 40px 40px 0px 0px;
  }
`;

//페이지 웹/모바일 전환
const WebVer2 = styled.div`
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
    background-image: url(${backImg2});
    background-repeat: no-repeat;
  }
  width: 577px;
  height: 92%;
  min-height: 924px;
  position: fixed;
  right: 50%;
  top: 53%;
  transform: translate(50%, -50%);
  background: url(${frame}) no-repeat;
  background-size: 100% 100%;
`;

const Wrap2 = styled.div`
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
  @media ${({ theme }) => theme.device.laptop} {
    background-image: url(${frame});
  }
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

//모바일 디바이스
const Mobile2 = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  min-width: 280px;
  overflow: hidden;
  background-color: ${theme.color.white};
`;

//웹 브라우저
const Web2 = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${backImg2});
  background-size: cover;
  background-position: 0% 100%;
  background-repeat: no-repeat;
`;
const Phone2 = styled.div`
  width: 577px;
  height: 92%;
  min-height: 924px;
  position: fixed;
  right: 50%;
  top: 53%;
  transform: translate(50%, -50%);
  background: url(${frame}) no-repeat;
  background-size: 100% 100%;

  @media screen and (min-width: 1120px) {
    right: 24%;
    top: 50%;
    transform: translate(0%, -50%);
  }
`;
const WebViewLayout2 = styled.div`
  max-width: 380px;
  height: calc(100% - 178px);
  position: relative;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  background-color: ${theme.color.white};
  overflow: hidden;
`;

export default App;

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
        <ThemeProvider theme={theme}>
          <FramePhone src={frame}>
            <div
              style={{
                height: '100%',
                width: '100%',
                // maxWidth: '360px',
                position: 'relative',
              }}
            >
              <View>
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
                    path="/plansdetail/images/:id"
                    element={<PlansDetailImage />}
                  />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/Register" element={<Register />} />
                  <Route path="/Login" element={<Login />} />
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
              </View>
              <Footer />
            </div>
          </FramePhone>
        </ThemeProvider>
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
  width: 100vw;
  height: 100vh;
  /* width: 100%;
  height: 100%;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  position: fixed;
  right: 50%;
  top: 50%; */
  @media ${theme.device.laptop} {
    transform: translate(50%, -50%);
    position: fixed;
    width: 35rem;
    height: 100%;
    max-width: 768px;
    min-width: 360px;
    min-height: 500px;
    max-height: 847px;
    /* min-height: 750px; */
    right: 50%;
    top: 50%;
    background: url(${frame}) no-repeat;
    background-size: 100% 100%;
    background-position: 50% 50%;

    right: 30%;
    top: 50%;
    transform: translate(0%, -50%);
  }
  @media ${theme.device.tablet} {
    transform: translate(50%, -50%);
    position: fixed;
    width: 35rem;
    height: 100%;
    max-width: 768px;
    min-width: 360px;
    min-height: 847px;
    max-height: 847px;

    right: 50%;
    top: 50%;
    background: url(${frame}) no-repeat;
    background-size: 100% 100%;
    background-position: 50% 50%;

    right: 20%;
    top: 50%;
    transform: translate(0%, -50%) scale(0.8);
  }
`;
const View = styled.div`
  position: absolute;
  background-color: ${theme.color.white};
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  /* right: 50%;
  top: 50%;
  transform: translate(50%, -50%); */
  @media ${theme.device.laptop} {
    width: 35rem;

    height: 83.5%;

    /* calc(84% - 46px); */

    border-radius: 40px;
    /* right: 42.8%;
    top: 46.5%; */
    max-width: 360px;

    top: 49%;
    right: 50%;
    transform: translate(50%, -50%);
    /* border-radius: 40px 40px 0px 0px; */
    border-radius: 40px;
  }
`;

export default App;

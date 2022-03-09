import { logger } from './shared/utils';
import { Route, Routes } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';
import theme from './Styles/theme';

//백그라운드 이미지
import webImg from './img/backImg.png';

import Main from './pages/Main';
import Plans from './pages/Plans';
import PlansEdit from './pages/PlansEdit';
import Footer from './pages/Footer';
import Mypage from './pages/Mypage';

function App() {
  logger('test');

  return (
    <>
      <ThemeProvider theme={theme}>
        <WebVer />
        <Wrap>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/Edit" element={<PlansEdit />} />
            <Route path="/Edit/:id" element={<PlansEdit />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/plans" element={<Plans />} />
          </Routes>
          <Footer />
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
//tesetasdf
export default App;

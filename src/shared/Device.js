import React from 'react';
import styled from 'styled-components';

import { isMobile } from './DeviceDetector';
// import { web_phone, web_back, web_logo } from '../static/images';
import { backImg2, frame } from '../img/index';
import theme from '../Styles/theme';

const Device = ({ children }) => {
  const [isSupported, setIsSupported] = React.useState(null);
  const [webView, setWebView] = React.useState(true);

  React.useEffect(() => {}, []);

  return (
    <Web>
      <Phone>
        <WebViewLayout>{children}</WebViewLayout>
      </Phone>
    </Web>
  );
};

//모바일 디바이스
const Mobile = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  min-width: 280px;
  overflow: hidden;
  background-color: ${theme.color.orange};
`;

//웹 브라우저
const Web = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${backImg2});
  background-size: 300px 144px, cover;
  background-position: 326px 230px, 0% 100%;
  background-repeat: no-repeat;
`;
const Phone = styled.div`
  width: 426px;
  height: 92%;
  min-height: 750px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  background: url(${frame}) no-repeat;
  background-size: 100% 100%;

  @media screen and (min-width: 1120px) {
    right: 10%;
    top: 50%;
    transform: translate(0%, -50%);
  }
`;
const WebViewLayout = styled.div`
  max-width: 375px;
  height: calc(100% - 43px);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
`;

export default Device;

import { createGlobalStyle } from 'styled-components';
import NotoBold from './font/NotoSansKR-Bold.otf';
import NotoMedium from './font/NotoSansKR-Medium.otf';
import NotoRegular from './font/NotoSansKR-Regular.otf';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;  
    font-weight: 500;
    font-family: 'Noto Sans KR', sans-serif;

  }
  body {
    box-sizing: border-box;
    
  }
  button,img{
    cursor:pointer;
  }
  @font-face {
    font-family:'Noto Sans Kr' ;
    font-weight: 700;
    src: url(${NotoBold});
  }
  @font-face {
    font-family:'Noto Sans Kr' ;
    font-weight: 500;
    src: url(${NotoMedium});
  }
  @font-face {
    font-family:'Noto Sans Kr' ;
    font-weight: 400;
    src: url(${NotoRegular});
  }
`;
export default GlobalStyle;

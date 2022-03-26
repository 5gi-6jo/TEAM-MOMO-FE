import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500;700&display=swap');
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
  
`;
export default GlobalStyle;

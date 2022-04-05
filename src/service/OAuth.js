const REST_API_KEY = '2adbf21838760b4e80d709eeb37a8857';
const REDIRECT_URI = 'http://localhost:3000/login/oauth2/code/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

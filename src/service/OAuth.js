const REST_API_KEY = '2adbf21838760b4e80d709eeb37a8857';
const REDIRECT_URI = 'http://localhost:3000/login/oauth2/code/kakao';
// const REDIRECT_URI = 'https://seoultaste.click/users/kakao/callback';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// kakao auth url -> redirect uri -> 다시 서버랑 연결

// REDIRECT_URI = 'www.seoultaste.click/oauth2/authorization/kakao';

// https://kauth.kakao.com/oauth/authorize
// ?response_type=code
// &client_id=2adbf21838760b4e80d709eeb37a8857
// &scope=profile_nickname
// %20account_email&state=KAIovONUSEY4nqq542-lKN9SgfIlVQE7trkRiWjlRWg
// %3D
// &redirect_uri=http://localhost:8080/login/oauth2/code/kakao

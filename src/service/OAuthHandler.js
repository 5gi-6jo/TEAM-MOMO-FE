import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Spinner from '../elements/Spinner';

const OAuthHandler = props => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  // React.useEffect(async () => {
  //   await dispatch(userActions.kakaoLogin(code));
  // }, []);

  React.useEffect(() => {
    async function fetchData() {
      await dispatch(userActions.KakaoLogin(code));
    }
    fetchData();
  }, []);

  return <Spinner />;
};

export default OAuthHandler;

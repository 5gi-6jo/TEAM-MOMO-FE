import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Spinner from '../elements/Spinner';
import { useNavigate } from 'react-router-dom';

const OAuthHandler = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  // React.useEffect(async () => {
  //   await dispatch(userActions.kakaoLogin(code));
  // }, []);

  React.useEffect(() => {
    function fetchData() {
      dispatch(userActions.KakaoLogin(code)).then(res => {
        navigate('/main');
      });
    }
    fetchData();
  }, []);

  return <Spinner />;
};

export default OAuthHandler;

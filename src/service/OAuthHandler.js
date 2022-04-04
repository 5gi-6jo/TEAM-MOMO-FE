import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Spinner from '../elements/Spinner';
// import { useNavigate } from 'react-router-dom';

const OAuthHandler = props => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  useEffect(() => {
    function fetchData() {
      dispatch(userActions.KakaoLogin(code));
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spinner />;
};

export default OAuthHandler;

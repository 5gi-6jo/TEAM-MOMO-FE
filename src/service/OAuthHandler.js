import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Spinner from '../elements/Spinner';
import { useNavigate } from 'react-router-dom';

const OAuthHandler = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  useEffect(() => {
    dispatch(userActions.KakaoLogin(code));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    navigate('/main');
  }, [code]);

  return <Spinner />;
};

export default OAuthHandler;

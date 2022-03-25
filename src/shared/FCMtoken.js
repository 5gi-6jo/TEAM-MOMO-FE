import React, { useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';
import { useDispatch } from 'react-redux';
import { setFCMTokenAxios } from '../redux/modules/user';
import { useNavigate } from 'react-router-dom';
import { setFCMTokenplan } from '../redux/modules/plan';

const FCMtoken = () => {
  let swRegist = null;
  const [Token, setToken] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const FCMtoken = sessionStorage.getItem('FCMtoken') ? false : true;
  console.log(FCMtoken);
  if (FCMtoken)
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    }).then(token => {
      console.log('token', token);
      setToken(token);
      sessionStorage.setItem('FCMtoken', token);
      swRegist = messaging.swRegistration;
    });

  return (
    <>
      {/* <div>fcm</div> */}
      {/* <div>{Token}</div> */}
    </>
  );
};

export default FCMtoken;

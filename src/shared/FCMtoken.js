import React, { useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';

const FCMtoken = () => {
  let swRegist = null;
  const [Token, setToken] = useState(null);

  getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  }).then(token => {
    console.log('token', token);
    setToken(token);
    swRegist = messaging.swRegistration;
  });
  return (
    <>
      <div>fcm</div>
      <div>{Token}</div>
    </>
  );
};

export default FCMtoken;

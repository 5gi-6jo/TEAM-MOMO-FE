import React, { useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

  function unsubscribe() {
    swRegist.pushManager
      .getSubscription()
      .then(subscription => {
        if (subscription) {
          return subscription // 토글 시 메세지 안날라오게 하는 방법
            .unsubscribe()
            .then(res => {})
            .catch(err => {
              console.log(err);
            });
        }
      })
      .then(() => {})
      .catch(error => {
        console.log('Error unsubscribing', error);
      });
  }
  return (
    <>
      {/* <div>fcm</div> */}
      {/* <div>{Token}</div> */}
    </>
  );
};
export default FCMtoken;

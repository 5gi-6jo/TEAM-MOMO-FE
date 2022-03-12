/* eslint-disable no-restricted-globals */

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
self.addEventListener('push', function (event) {
  const title = event.data.json().notification.title;
  const options = {
    body: event.data.json().notification.body,
    icon: 'favicon.ico',
  };

  event.waitUntil(self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow('https://zzzapp.co.kr'), // 예시로 일단 로컬호스트로 링크 누르면 가지는걸로 해놨다.
  );
});

// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging/sw';
// import { onBackgroundMessage } from 'firebase/messaging/sw';

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: 'AIzaSyDotjET2LCSTEOzuqLMRTbklh4UK3NXyZ8',
//   authDomain: 'momo-cbc21.firebaseapp.com',
//   projectId: 'momo-cbc21',
//   storageBucket: 'momo-cbc21.appspot.com',
//   messagingSenderId: '680572525834',
//   appId: '1:680572525834:web:27670f661e197779556ef3',
//   measurementId: 'G-CXWX95R14M',
// });
// const app = initializeApp(firebaseApp);
// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);
// onBackgroundMessage(messaging, payload => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload,
//   );
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
// export { messaging };

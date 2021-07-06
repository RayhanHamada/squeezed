import firebase from 'firebase/app';

var firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string
);

export const fb = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

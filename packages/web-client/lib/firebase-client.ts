import { firebaseClientConfig } from '@/global';
import firebase from 'firebase/app';

export const fb = !firebase.apps.length
  ? firebase.initializeApp(firebaseClientConfig)
  : firebase.app();

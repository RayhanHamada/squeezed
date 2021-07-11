import { firebaseConfig } from '@/global';
import firebase from 'firebase';

export const fb = !firebase.apps.length
  ? firebase.initializeApp(JSON.parse(firebaseConfig))
  : firebase.app();

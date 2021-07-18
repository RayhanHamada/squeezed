import {
  firebaseAdminClientEmail,
  firebaseAdminPrivateKey,
  firebaseAdminProjectID,
} from '@/global';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: firebaseAdminClientEmail,
      privateKey: firebaseAdminPrivateKey,
      projectId: firebaseAdminProjectID,
    }),
  });
}

export { admin };

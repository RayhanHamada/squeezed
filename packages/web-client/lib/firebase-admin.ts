import admin from 'firebase-admin';
import serviceAccount from './squeezed-admin-sdk.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export { admin };

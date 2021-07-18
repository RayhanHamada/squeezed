export const isDev = process.env.NODE_ENV === 'development';
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? '';

export const firebaseClientConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string
) as Record<string, unknown>;

export const firebaseAdminPrivateKey = (
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY as string
).replace(/\\n/g, '\n');

export const firebaseAdminClientEmail = process.env
  .NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL as string;

export const firebaseAdminProjectID = process.env
  .NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID as string;

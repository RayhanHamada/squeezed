import { baseURL } from '@/global';
import type {
  GenerateAnonUUIDBody,
  GenerateAnonUUIDResponse,
  GenerateAuthenticatedUUIDBody,
  GenerateAuthenticatedUUIDResponse,
  UpdateUsernameBody,
  UpdateUsernameResponse,
} from '@/lib/api-typings';
import axios from 'redaxios';

export const fetchAnonURL = (refURL: string) =>
  axios.post<GenerateAnonUUIDResponse>(`${baseURL}/api/generateAnonUUID`, {
    ref_url: refURL,
  } as GenerateAnonUUIDBody);

export const updateUsername = (username: string, uid: string) =>
  axios.post<UpdateUsernameResponse>(`${baseURL}/api/updateUsername`, {
    username,
    uid,
  } as UpdateUsernameBody);

export const signUp = (username: string, email: string, password: string) =>
  axios.post(`${baseURL}/api/createUser`, {
    username,
    email,
    password,
  });

export const fetchUUID = (
  uid: string,
  enabled: boolean,
  refURL: string,
  title?: string,
  expireAt?: number
) =>
  axios.post<GenerateAuthenticatedUUIDResponse>(
    `${baseURL}/api/generateAuthenticatedUUID`,
    {
      uid,
      enabled,
      ref_url: refURL,
      title: !title || title === '' ? 'No Title' : title,
      expire_at: expireAt,
    } as GenerateAuthenticatedUUIDBody
  );

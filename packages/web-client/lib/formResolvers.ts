// TODO change yup to zod and resolver to zod resolver
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { urlRegex } from './utils';

export type SignUpSchema = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const signUpSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email().required('Email required'),
  password: yup.string().min(8).required('Password required'),
  passwordConfirmation: yup
    .string()
    .min(8)
    .required('Password Confirmation required'),
});

export const signUpResolver = yupResolver(signUpSchema);

export type SignInSchema = {
  email: string;
  password: string;
};

const signInSchema = yup.object().shape({
  email: yup.string().email().required('Email required'),
  password: yup.string().required('Password required'),
});

export const signInResolver = yupResolver(signInSchema);

export type TryItSchema = {
  refURL: string;
};

const tryItSchema = yup.object().shape({
  refURL: yup.string().matches(urlRegex),
});

export const tryItResolver = yupResolver(tryItSchema);

export type CreateLinkSchema = {
  title: string;
  refURL: string;
  expireTime?: number;
  enabled: boolean;
};

const createLinkSchema = yup.object().shape({
  title: yup.string().optional().default('No Title'),
  refURL: yup.string().matches(urlRegex, { message: 'Invalid URL' }).required(),
  expireTime: yup.number().min(1).optional(),
  enabled: yup.bool().default(true),
});

export const createLinkResolver = yupResolver(createLinkSchema);

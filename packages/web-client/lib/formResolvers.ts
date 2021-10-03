import { urlRegex } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export const signUpResolver = zodResolver(signUpSchema);

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export const signInResolver = zodResolver(signInSchema);

const tryItSchema = z.object({
  refURL: z.string().regex(urlRegex),
});

export type TryItSchema = z.infer<typeof tryItSchema>;
export const tryItResolver = zodResolver(tryItSchema);

const createLinkSchema = z.object({
  title: z.string(),
  refURL: z.string().regex(urlRegex, { message: `reference URL seems wrong` }),
  expireTime: z.optional(z.number()),
  enabled: z.boolean(),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;
export const createLinkResolver = zodResolver(createLinkSchema);

const editLinkSchema = z.object({
  title: z.string(),
  refURL: z.string().regex(urlRegex, { message: `reference URL seems wrong` }),
});

export type EditLink = z.infer<typeof editLinkSchema>;
export const editLinkResolver = zodResolver(editLinkSchema);

const userSettingSchema = z.object({
  username: z.string(),
});

export type UserSettingSchema = z.infer<typeof userSettingSchema>;
export const userSettingResolver = zodResolver(userSettingSchema);
